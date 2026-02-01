/**
 * Main Application Entry Point
 */

import { state, updateState, subscribe } from './state.js';
import { initUploadHandler } from './modules/upload-handler.js';
import { processVideo } from './modules/video-processor.js';
import { renderGrid } from './modules/grid-renderer.js';
import { initDetailModal } from './modules/detail-modal.js';
import { showToast } from './utils/toast.js';

// Track if we've shown the completion toast
let completionToastShown = false;

/**
 * Initialize the application
 */
async function init() {
    console.log('🎬 Frame Maker initializing...');

    // Check browser compatibility
    if (!checkBrowserSupport()) {
        showToast('Your browser is not supported. Please use a modern browser like Chrome, Firefox, or Edge.', 'error');
        return;
    }

    // Initialize modules
    initUploadHandler(handleVideoUpload);
    initDetailModal();
    initUIControls();

    // Subscribe to state changes
    subscribe(handleStateChange);

    // Pre-load FFmpeg in background
    preloadFFmpeg();

    console.log('✅ Frame Maker ready');
}

/**
 * Check browser support for required APIs
 */
function checkBrowserSupport() {
    const required = {
        canvas: !!document.createElement('canvas').getContext,
        workers: typeof Worker !== 'undefined',
        wasm: typeof WebAssembly !== 'undefined',
        blob: typeof Blob !== 'undefined'
    };

    const missing = Object.entries(required)
        .filter(([_, supported]) => !supported)
        .map(([feature]) => feature);

    if (missing.length > 0) {
        console.error('Missing browser features:', missing);
        return false;
    }

    return true;
}

/**
 * Pre-load FFmpeg for faster processing
 */
async function preloadFFmpeg() {
    try {
        console.log('Loading FFmpeg from local files...');
        const { FFmpeg } = FFmpegWASM;
        const ffmpeg = new FFmpeg();

        // Load FFmpeg core files (paths relative to ffmpeg.js location in lib/)
        await ffmpeg.load({
            coreURL: './ffmpeg-core.js',
            wasmURL: './ffmpeg-core.wasm'
        });

        updateState({ ffmpeg });
        console.log('✅ FFmpeg loaded');
    } catch (error) {
        console.error('Failed to load FFmpeg:', error);
    }
}

/**
 * Handle video upload
 */
async function handleVideoUpload(file) {
    console.log('📹 Video uploaded:', file.name);

    // Reset completion flag for new upload
    completionToastShown = false;

    try {
        // Extract video metadata
        const metadata = await extractVideoMetadata(file);
        console.log('Video metadata:', metadata);

        updateState({
            video: {
                file,
                fileName: file.name,
                ...metadata
            }
        });

        // Start processing
        switchView('processing');
        await processVideo(file, metadata);

    } catch (error) {
        console.error('Error processing video:', error);
        showToast(`Error: ${error.message}`, 'error');
        switchView('upload');
    }
}

/**
 * Extract video metadata using video element
 */
function extractVideoMetadata(file) {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        video.preload = 'metadata';

        video.onloadedmetadata = () => {
            const duration = video.duration;
            const width = video.videoWidth;
            const height = video.videoHeight;

            // Estimate FPS (default to 30 if not available)
            const fps = 30; // We'll get more accurate FPS from FFmpeg

            resolve({
                duration,
                fps,
                width,
                height,
                totalFrames: Math.floor(duration * fps)
            });

            URL.revokeObjectURL(video.src);
        };

        video.onerror = () => {
            reject(new Error('Failed to load video metadata'));
            URL.revokeObjectURL(video.src);
        };

        video.src = URL.createObjectURL(file);
    });
}

/**
 * Initialize UI controls
 */
function initUIControls() {
    // View mode toggle
    const viewModeToggle = document.getElementById('viewModeToggle');
    viewModeToggle?.addEventListener('change', (e) => {
        updateState({
            ui: { ...state.ui, showAllFrames: e.target.checked }
        });
        renderGrid();
    });

    // Threshold slider
    const thresholdSlider = document.getElementById('thresholdSlider');
    const thresholdValue = document.getElementById('thresholdValue');

    thresholdSlider?.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        thresholdValue.textContent = value;
        updateState({
            ui: { ...state.ui, similarityThreshold: value }
        });
        // Re-group frames with new threshold
        regroupFrames(value);
    });

    // Download all button
    document.getElementById('downloadAllBtn')?.addEventListener('click', async () => {
        const { downloadAllUnique } = await import('./modules/export-manager.js');
        downloadAllUnique();
    });

    // New video button
    document.getElementById('newVideoBtn')?.addEventListener('click', () => {
        if (confirm('Start over with a new video? Current progress will be lost.')) {
            location.reload();
        }
    });
}

/**
 * Re-group frames with new threshold
 */
async function regroupFrames(threshold) {
    if (state.allFrames.length === 0) return;

    const { groupFrames } = await import('./modules/frame-grouper.js');
    const newGroups = groupFrames(state.allFrames, threshold);

    updateState({ frameGroups: newGroups });
    renderGrid();
}

/**
 * Switch between views
 */
function switchView(view) {
    // Hide all sections
    document.getElementById('uploadSection')?.classList.remove('active');
    document.getElementById('processingSection')?.classList.remove('active');
    document.getElementById('gridSection')?.classList.remove('active');

    // Show selected section
    const sectionMap = {
        'upload': 'uploadSection',
        'processing': 'processingSection',
        'grid': 'gridSection'
    };

    const sectionId = sectionMap[view];
    if (sectionId) {
        document.getElementById(sectionId)?.classList.add('active');
    }

    updateState({
        ui: { ...state.ui, currentView: view }
    });
}

/**
 * Handle state changes
 */
function handleStateChange(newState) {
    // Update processing UI
    if (newState.processing.status !== 'idle') {
        updateProcessingUI(newState.processing);
    }

    // Update video info in header
    if (newState.video.fileName) {
        const videoInfo = document.getElementById('videoInfo');
        if (videoInfo) {
            const duration = formatDuration(newState.video.duration);
            const resolution = `${newState.video.width}x${newState.video.height}`;
            videoInfo.textContent = `${newState.video.fileName} • ${duration} • ${resolution}`;
        }
    }

    // Update grid stats
    if (newState.frameGroups.size > 0) {
        const totalFrames = newState.allFrames.length;
        const uniqueGroups = newState.frameGroups.size;
        const duplicates = totalFrames - uniqueGroups;

        const gridStats = document.getElementById('gridStats');
        if (gridStats) {
            gridStats.textContent = `${uniqueGroups} unique groups • ${totalFrames} total frames • ${duplicates} similar frames grouped`;
        }
    }
}

/**
 * Update processing UI
 */
function updateProcessingUI(processing) {
    const progressFill = document.getElementById('progressFill');
    const progressPercent = document.getElementById('progressPercent');
    const progressDetail = document.getElementById('progressDetail');
    const processingTitle = document.getElementById('processingTitle');
    const processingStats = document.getElementById('processingStats');

    if (progressFill) {
        progressFill.style.width = `${processing.progress}%`;
    }

    if (progressPercent) {
        progressPercent.textContent = `${Math.round(processing.progress)}%`;
    }

    // Update stage indicators
    const stages = document.querySelectorAll('.stage');
    stages.forEach(stage => {
        stage.classList.remove('active', 'complete');
    });

    const stageMap = {
        'loading-ffmpeg': 0,
        'extracting': 1,
        'hashing': 2,
        'grouping': 3
    };

    const currentStageIndex = stageMap[processing.status];
    if (currentStageIndex !== undefined) {
        stages.forEach((stage, index) => {
            if (index < currentStageIndex) {
                stage.classList.add('complete');
            } else if (index === currentStageIndex) {
                stage.classList.add('active');
            }
        });
    }

    // Update title and details based on status
    const statusMessages = {
        'loading-ffmpeg': 'Loading FFmpeg...',
        'extracting': 'Extracting Frames',
        'hashing': 'Analyzing Similarity',
        'grouping': 'Grouping Duplicates',
        'complete': 'Processing Complete'
    };

    if (processingTitle && statusMessages[processing.status]) {
        processingTitle.textContent = statusMessages[processing.status];
    }

    if (progressDetail) {
        if (processing.currentFrame > 0) {
            progressDetail.textContent = `Frame ${processing.currentFrame} of ${state.video.totalFrames}`;
        } else {
            progressDetail.textContent = '';
        }
    }

    if (processingStats && processing.startTime) {
        const elapsed = ((Date.now() - processing.startTime) / 1000).toFixed(1);
        processingStats.textContent = `Elapsed: ${elapsed}s`;
    }

    // Switch to grid view when complete (only once)
    if (processing.status === 'complete' && !completionToastShown) {
        completionToastShown = true;
        setTimeout(() => {
            switchView('grid');
            renderGrid();
            showToast('Processing complete!', 'success');
        }, 500);
    }
}

/**
 * Format duration in seconds to readable format
 */
function formatDuration(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Export for global access
window.switchView = switchView;
