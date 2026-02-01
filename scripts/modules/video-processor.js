/**
 * Video Processor Module
 * Orchestrates frame extraction, hashing, and grouping
 */

import { state, updateState } from '../state.js';
import { calculatePHash } from '../algorithms/phash.js';
import { groupFrames } from './frame-grouper.js';

const BATCH_SIZE = 30; // Process frames in batches

// Cancellation flag
let isCancelled = false;

/**
 * Cancel the current video processing
 */
export function cancelProcessing() {
    isCancelled = true;
}

/**
 * Reset cancellation flag
 */
function resetCancellation() {
    isCancelled = false;
}

export async function processVideo(file, metadata) {
    console.log('🎬 Starting video processing...', { file: file.name, metadata });

    // Reset cancellation flag at the start
    resetCancellation();

    updateState({
        processing: {
            ...state.processing,
            status: 'extracting',
            progress: 0,
            startTime: Date.now()
        }
    });

    try {
        // Check for cancellation
        if (isCancelled) throw new Error('Processing cancelled by user');

        // Extract frames using canvas
        console.log('Extracting frames...');
        const frames = await extractFrames(file, metadata);
        console.log(`✅ Extracted ${frames.length} frames`);

        // Check for cancellation
        if (isCancelled) throw new Error('Processing cancelled by user');

        updateState({
            processing: {
                ...state.processing,
                status: 'hashing',
                progress: 50
            }
        });

        // Calculate perceptual hashes
        console.log('Calculating hashes...');
        const hashedFrames = await calculateHashes(frames);
        console.log('✅ Hashes calculated');

        // Check for cancellation
        if (isCancelled) throw new Error('Processing cancelled by user');

        updateState({
            processing: {
                ...state.processing,
                status: 'grouping',
                progress: 80
            }
        });

        // Group by similarity
        console.log('Grouping frames...');
        const groups = groupFrames(hashedFrames, state.ui.similarityThreshold);
        console.log(`✅ Created ${groups.size} groups`);

        // Check for cancellation
        if (isCancelled) throw new Error('Processing cancelled by user');

        // Update state
        updateState({
            allFrames: hashedFrames,
            frameGroups: groups,
            processing: {
                ...state.processing,
                status: 'complete',
                progress: 100
            }
        });

    } catch (error) {
        // Check if it's a cancellation error
        const isCancellationError = error.message === 'Processing cancelled by user';

        if (!isCancellationError) {
            console.error('❌ PROCESSING ERROR:', error);
            console.error('Error name:', error.name);
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);

            alert(`Error: ${error.message || error.toString()}\n\nCheck the browser console (F12) for details.`);

            updateState({
                processing: {
                    ...state.processing,
                    status: 'error',
                    errors: [...state.processing.errors, error.message || error.toString()]
                }
            });
        } else {
            console.log('Processing cancelled by user');
            updateState({
                processing: {
                    ...state.processing,
                    status: 'idle'
                }
            });
        }

        throw error;
    }
}

/**
 * Extract frames using HTML5 Canvas
 */
async function extractFrames(file, metadata) {
    console.log('Using canvas-based extraction...');
    const frames = [];

    // Create video element
    const video = document.createElement('video');
    video.src = URL.createObjectURL(file);
    video.muted = true;

    // Wait for video to load
    await new Promise((resolve, reject) => {
        video.onloadedmetadata = resolve;
        video.onerror = reject;
    });

    // Create canvas for frame capture
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');

    // Extract ALL frames at source framerate
    const fps = metadata.fps || 30; // Use source FPS
    const totalFrames = Math.floor(video.duration * fps);
    console.log(`Extracting ${totalFrames} frames at ${fps} fps...`);

    for (let i = 0; i < totalFrames; i++) {
        const timestamp = i / fps;

        // Seek to timestamp
        video.currentTime = timestamp;
        await new Promise(resolve => {
            video.onseeked = resolve;
        });

        // Draw frame to canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert to blob
        const blob = await new Promise(resolve => {
            canvas.toBlob(resolve, 'image/jpeg', 0.95);
        });

        frames.push({
            index: i,
            timestamp: timestamp,
            blob: blob,
            url: URL.createObjectURL(blob)
        });

        // Update progress
        const progress = 10 + (i / totalFrames) * 40;
        updateState({
            processing: {
                ...state.processing,
                progress,
                currentFrame: i + 1
            }
        });
    }

    // Cleanup
    URL.revokeObjectURL(video.src);

    console.log(`✅ Extracted ${frames.length} frames`);
    return frames;
}

/**
 * Calculate perceptual hash for all frames
 */
async function calculateHashes(frames) {
    const hashedFrames = [];

    for (let i = 0; i < frames.length; i++) {
        const frame = frames[i];

        // Calculate hash
        const hash = await calculatePHash(frame.blob);

        hashedFrames.push({
            ...frame,
            hash
        });

        // Update progress
        const progress = 50 + (i / frames.length) * 30;
        updateState({
            processing: {
                ...state.processing,
                progress,
                currentFrame: i + 1
            }
        });
    }

    return hashedFrames;
}

