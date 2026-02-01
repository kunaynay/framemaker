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

        await createAndDownloadZip(frames, 'unique-frames');

        showToast(`Downloaded ${frames.length} unique frames`, 'success');
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

        await createAndDownloadZip(frames, 'selected-frames');

        showToast(`Downloaded ${frames.length} frames`, 'success');
    } catch (error) {
        console.error('Download error:', error);
        showToast('Failed to create download', 'error');
    }
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
