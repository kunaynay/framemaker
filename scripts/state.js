/**
 * Application State Management
 * Central store for all application state
 */

export const state = {
    // Video metadata
    video: {
        file: null,
        fileName: '',
        duration: 0,
        fps: 0,
        totalFrames: 0,
        width: 0,
        height: 0
    },

    // Processing state
    processing: {
        status: 'idle', // 'idle' | 'loading-ffmpeg' | 'extracting' | 'hashing' | 'grouping' | 'complete' | 'error'
        progress: 0,
        currentFrame: 0,
        errors: [],
        startTime: null
    },

    // Frame groups (Map: hash -> group data)
    frameGroups: new Map(),

    // All extracted frames for reference
    allFrames: [],

    // UI state
    ui: {
        currentView: 'upload', // 'upload' | 'processing' | 'grid'
        selectedGroup: null,
        similarityThreshold: 5,
        selectedFrames: new Set(),
        showAllFrames: false
    },

    // FFmpeg instance
    ffmpeg: null
};

/**
 * State update with subscribers
 */
const subscribers = new Set();

export function subscribe(callback) {
    subscribers.add(callback);
    return () => subscribers.delete(callback);
}

export function updateState(updates) {
    // Deep merge updates into state
    Object.keys(updates).forEach(key => {
        // Special handling for Maps
        if (updates[key] instanceof Map) {
            state[key] = updates[key];
        }
        // Handle objects (but not arrays, Maps, or null)
        else if (typeof updates[key] === 'object' && !Array.isArray(updates[key]) && updates[key] !== null) {
            state[key] = { ...state[key], ...updates[key] };
        }
        // Everything else
        else {
            state[key] = updates[key];
        }
    });

    // Notify subscribers
    subscribers.forEach(callback => callback(state));
}

export function resetState() {
    state.video = {
        file: null,
        fileName: '',
        duration: 0,
        fps: 0,
        totalFrames: 0,
        width: 0,
        height: 0
    };

    state.processing = {
        status: 'idle',
        progress: 0,
        currentFrame: 0,
        errors: [],
        startTime: null
    };

    state.frameGroups.clear();
    state.allFrames = [];

    state.ui = {
        currentView: 'upload',
        selectedGroup: null,
        similarityThreshold: 5,
        selectedFrames: new Set()
    };
}
