/**
 * Grid Renderer Module
 * Renders the grid of unique frame groups
 */

import { state } from '../state.js';
import { openDetailModal } from './detail-modal.js';

export function renderGrid() {
    const gridContainer = document.getElementById('framesGrid');
    if (!gridContainer) return;

    gridContainer.innerHTML = '';

    // Check if showing all frames or just unique groups
    if (state.ui.showAllFrames) {
        // Show all frames
        if (state.allFrames.length === 0) {
            gridContainer.innerHTML = '<div class="empty-state"><p>No frames to display</p></div>';
            return;
        }

        state.allFrames.forEach((frame, index) => {
            const card = createSimpleFrameCard(frame, index);
            gridContainer.appendChild(card);
        });
    } else {
        // Show unique groups
        if (state.frameGroups.size === 0) {
            gridContainer.innerHTML = `
                <div class="empty-state">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                    <p>No frames to display</p>
                </div>
            `;
            return;
        }

        const groupsArray = Array.from(state.frameGroups.values());
        groupsArray.forEach((group, index) => {
            const card = createFrameCard(group, index);
            gridContainer.appendChild(card);
        });
    }
}

function createFrameCard(group, index) {
    const card = document.createElement('div');
    card.className = 'frame-card';
    card.style.setProperty('--index', index);

    const frame = group.representativeFrame;
    const timestamp = formatTimestamp(frame.timestamp);

    // Check if this group has selections
    const groupSelections = state.groupSelections.get(group.hash);
    const hasSelections = groupSelections && groupSelections.size > 0;
    const selectionCount = hasSelections ? groupSelections.size : 0;

    card.innerHTML = `
        <div class="frame-image-container">
            <img src="${frame.url}" alt="Frame ${frame.index}" class="frame-image" loading="lazy">
            ${group.count > 1 ? `<div class="frame-badge">${group.count}×</div>` : ''}
            ${hasSelections ? `<div class="frame-selection-badge">${selectionCount} selected</div>` : ''}
        </div>
        <div class="frame-info">
            <div class="frame-meta">
                Frame #${frame.index}
            </div>
            <div class="frame-timestamp">${timestamp}</div>
        </div>
    `;

    // Click to open detail modal
    card.addEventListener('click', () => {
        openDetailModal(group);
    });

    return card;
}

function createSimpleFrameCard(frame, index) {
    const card = document.createElement('div');
    card.className = 'frame-card';
    card.style.setProperty('--index', index);

    const timestamp = formatTimestamp(frame.timestamp);

    card.innerHTML = `
        <div class="frame-image-container">
            <img src="${frame.url}" alt="Frame ${frame.index}" class="frame-image" loading="lazy">
        </div>
        <div class="frame-info">
            <div class="frame-meta">
                Frame #${frame.index}
            </div>
            <div class="frame-timestamp">${timestamp}</div>
        </div>
    `;

    return card;
}

function formatTimestamp(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 10);
    return `${mins}:${secs.toString().padStart(2, '0')}.${ms}`;
}
