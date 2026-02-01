/**
 * Export Manager Module
 * Handles downloading frames as ZIP archives
 */

import { state } from '../state.js';
import { showToast } from '../utils/toast.js';

export async function downloadAllUnique() {
    try {
        showToast('Preparing download...', 'success');

        const frames = [];

        // Collect one representative from each group
        for (const group of state.frameGroups.values()) {
            frames.push(group.representativeFrame);
        }

        const zipName = getZipName('unique-frames');
        await createAndDownloadZip(frames, zipName);

        showToast(`Downloaded ${frames.length} unique frames`, 'success');
    } catch (error) {
        console.error('Download error:', error);
        showToast('Failed to create download', 'error');
    }
}

export async function downloadMultiSelected() {
    try {
        // Collect all selected frame indices from all groups
        const allSelectedIndices = new Set();

        state.groupSelections.forEach(selectedSet => {
            selectedSet.forEach(index => allSelectedIndices.add(index));
        });

        if (allSelectedIndices.size === 0) {
            showToast('No frames selected', 'warning');
            return;
        }

        showToast('Preparing download...', 'success');

        // Find all selected frames
        const frames = state.allFrames.filter(f => allSelectedIndices.has(f.index));

        const zipName = getZipName('selected-frames');
        await createAndDownloadZip(frames, zipName);

        showToast(`Downloaded ${frames.length} frames`, 'success');
    } catch (error) {
        console.error('Download error:', error);
        showToast('Failed to create download', 'error');
    }
}

export async function downloadSelected() {
    try {
        const selectedIndices = state.ui.selectedFrames;

        if (selectedIndices.size === 0) {
            showToast('No frames selected', 'warning');
            return;
        }

        showToast('Preparing download...', 'success');

        // Find selected frames
        const frames = state.allFrames.filter(f => selectedIndices.has(f.index));

        const zipName = getZipName('selected-frames');
        await createAndDownloadZip(frames, zipName);

        showToast(`Downloaded ${frames.length} frames`, 'success');
    } catch (error) {
        console.error('Download error:', error);
        showToast('Failed to create download', 'error');
    }
}

/**
 * Generate ZIP filename based on video name and suffix
 */
function getZipName(suffix) {
    const videoFileName = state.video.fileName || 'video';
    // Remove file extension from video name
    const baseName = videoFileName.replace(/\.[^/.]+$/, '');
    return `${baseName}-${suffix}`;
}

async function createAndDownloadZip(frames, zipName) {
    const zip = new JSZip();

    // Add frames to ZIP
    for (let i = 0; i < frames.length; i++) {
        const frame = frames[i];
        const fileName = `frame_${String(i + 1).padStart(4, '0')}.jpg`;

        // Get blob data
        const response = await fetch(frame.url);
        const blob = await response.blob();

        zip.file(fileName, blob);
    }

    // Generate ZIP
    const zipBlob = await zip.generateAsync({
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 6 }
    });

    // Trigger download
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${zipName}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
