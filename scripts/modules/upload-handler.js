/**
 * Upload Handler Module
 * Handles file upload via drag-and-drop and file picker
 */

import { showToast } from '../utils/toast.js';

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
const ACCEPTED_TYPES = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm'];

let isProcessing = false;

export function initUploadHandler(onUpload) {
    const uploadArea = document.getElementById('uploadArea');
    const videoInput = document.getElementById('videoInput');

    if (!uploadArea || !videoInput) {
        console.error('Upload elements not found');
        return;
    }

    // Click to browse
    uploadArea.addEventListener('click', () => {
        if (isProcessing) return;
        videoInput.click();
    });

    // File input change
    videoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFile(file, onUpload);
        }
    });

    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (isProcessing) return;
        uploadArea.classList.add('drag-over');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('drag-over');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');

        if (isProcessing) return;

        const file = e.dataTransfer.files[0];
        if (file) {
            handleFile(file, onUpload);
        }
    });

    // Initialize compact upload handler
    initCompactUpload(onUpload);
}

/**
 * Initialize compact upload button (shown during/after processing)
 */
function initCompactUpload(onUpload) {
    const compactUpload = document.getElementById('compactUpload');
    const compactVideoInput = document.getElementById('compactVideoInput');

    if (!compactUpload || !compactVideoInput) return;

    // Click to browse
    compactUpload.addEventListener('click', () => {
        if (isProcessing) return;
        compactVideoInput.click();
    });

    // File input change
    compactVideoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFile(file, onUpload, true);
        }
    });

    // Drag and drop
    compactUpload.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (isProcessing) return;
        compactUpload.classList.add('drag-over');
    });

    compactUpload.addEventListener('dragleave', () => {
        compactUpload.classList.remove('drag-over');
    });

    compactUpload.addEventListener('drop', (e) => {
        e.preventDefault();
        compactUpload.classList.remove('drag-over');

        if (isProcessing) return;

        const file = e.dataTransfer.files[0];
        if (file) {
            handleFile(file, onUpload, true);
        }
    });
}

function handleFile(file, onUpload, isCompact = false) {
    // Validate file type
    if (!ACCEPTED_TYPES.includes(file.type)) {
        showToast('Please upload a valid video file (MP4, MOV, AVI, WebM)', 'error');
        return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
        showToast(`File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB`, 'error');
        return;
    }

    // Set loading state
    setUploadLoading(true, isCompact);

    // Call upload callback
    onUpload(file);
}

/**
 * Set upload loading state
 */
export function setUploadLoading(loading, isCompact = false) {
    isProcessing = loading;

    const uploadSection = document.getElementById('uploadSection');
    const compactUpload = document.getElementById('compactUpload');
    const compactWrapper = document.getElementById('compactUploadWrapper');

    if (loading) {
        // Hide the main upload section when loading starts
        uploadSection?.classList.add('hidden');
        compactUpload?.classList.add('loading');

        // Show compact upload during processing
        if (!isCompact) {
            compactWrapper?.classList.add('active');
        }
    } else {
        compactUpload?.classList.remove('loading');
    }
}

/**
 * Show compact upload button (after processing complete)
 */
export function showCompactUpload(show = true) {
    const compactWrapper = document.getElementById('compactUploadWrapper');
    if (show) {
        compactWrapper?.classList.add('active');
    } else {
        compactWrapper?.classList.remove('active');
    }
}
