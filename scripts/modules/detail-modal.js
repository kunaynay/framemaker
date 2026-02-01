/**
 * Detail Modal Module
 * Shows all frames in a selected group with multi-select
 */

import { state, updateState } from '../state.js';
import { downloadSelected } from './export-manager.js';

let currentGroup = null;

export function initDetailModal() {
    const modal = document.getElementById('detailModal');
    const backdrop = modal?.querySelector('.modal-backdrop');
    const closeBtn = document.getElementById('closeModalBtn');
    const selectAllBtn = document.getElementById('selectAllBtn');
    const deselectAllBtn = document.getElementById('deselectAllBtn');
    const downloadBtn = document.getElementById('downloadSelectedBtn');

    // Close modal
    const closeModal = () => {
        modal?.classList.remove('active');
        currentGroup = null;
        updateState({
            ui: {
                ...state.ui,
                selectedGroup: null,
                selectedFrames: new Set()
            }
        });
    };

    backdrop?.addEventListener('click', closeModal);
    closeBtn?.addEventListener('click', closeModal);

    // Select all
    selectAllBtn?.addEventListener('click', () => {
        if (!currentGroup) return;
        const allFrames = new Set(currentGroup.frames.map(f => f.index));
        updateState({
            ui: { ...state.ui, selectedFrames: allFrames }
        });
        renderModalFrames(currentGroup);
    });

    // Deselect all
    deselectAllBtn?.addEventListener('click', () => {
        updateState({
            ui: { ...state.ui, selectedFrames: new Set() }
        });
        renderModalFrames(currentGroup);
    });

    // Download selected
    downloadBtn?.addEventListener('click', () => {
        downloadSelected();
    });

    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal?.classList.contains('active')) {
            closeModal();
        }
    });
}

export function openDetailModal(group) {
    currentGroup = group;
    const modal = document.getElementById('detailModal');

    updateState({
        ui: {
            ...state.ui,
            selectedGroup: group.hash,
            selectedFrames: new Set()
        }
    });

    // Update modal stats
    const modalStats = document.getElementById('modalStats');
    if (modalStats) {
        modalStats.textContent = `${group.count} similar frames in this group`;
    }

    // Render frames
    renderModalFrames(group);

    // Show modal
    modal?.classList.add('active');
}

function renderModalFrames(group) {
    const grid = document.getElementById('modalGrid');
    if (!grid) return;

    grid.innerHTML = '';

    group.frames.forEach((frame, index) => {
        const card = createModalFrameCard(frame, index);
        grid.appendChild(card);
    });

    updateSelectionInfo();
}

function createModalFrameCard(frame, index) {
    const card = document.createElement('div');
    card.className = 'modal-frame-card';
    card.style.setProperty('--index', index);

    const isSelected = state.ui.selectedFrames.has(frame.index);
    if (isSelected) {
        card.classList.add('selected');
    }

    const timestamp = formatTimestamp(frame.timestamp);

    card.innerHTML = `
        <div class="modal-frame-image-container">
            <img src="${frame.url}" alt="Frame ${frame.index}" class="modal-frame-image" loading="lazy">
            <div class="frame-checkbox">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </div>
        </div>
        <div class="modal-frame-info">
            <span class="frame-index">#${frame.index}</span>
            <span>${timestamp}</span>
        </div>
    `;

    // Toggle selection
    card.addEventListener('click', () => {
        toggleFrameSelection(frame.index);
        card.classList.toggle('selected');
        updateSelectionInfo();
    });

    return card;
}

function toggleFrameSelection(frameIndex) {
    const selected = new Set(state.ui.selectedFrames);

    if (selected.has(frameIndex)) {
        selected.delete(frameIndex);
    } else {
        selected.add(frameIndex);
    }

    updateState({
        ui: { ...state.ui, selectedFrames: selected }
    });
}

function updateSelectionInfo() {
    const info = document.getElementById('selectionInfo');
    const count = state.ui.selectedFrames.size;

    if (info) {
        info.textContent = count === 1 ? '1 selected' : `${count} selected`;
    }

    // Enable/disable download button
    const downloadBtn = document.getElementById('downloadSelectedBtn');
    if (downloadBtn) {
        downloadBtn.disabled = count === 0;
    }
}

function formatTimestamp(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 10);
    return `${mins}:${secs.toString().padStart(2, '0')}.${ms}`;
}
