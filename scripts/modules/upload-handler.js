/**
 * Upload Handler Module
 * Handles file upload via drag-and-drop and file picker
 */

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
const ACCEPTED_TYPES = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm'];

export function initUploadHandler(onUpload) {
    const uploadArea = document.getElementById('uploadArea');
    const videoInput = document.getElementById('videoInput');

    if (!uploadArea || !videoInput) {
        console.error('Upload elements not found');
        return;
    }

    // Click to browse
    uploadArea.addEventListener('click', () => {
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
        uploadArea.classList.add('drag-over');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('drag-over');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');

        const file = e.dataTransfer.files[0];
        if (file) {
            handleFile(file, onUpload);
        }
    });
}

function handleFile(file, onUpload) {
    // Validate file type
    if (!ACCEPTED_TYPES.includes(file.type)) {
        alert('Please upload a valid video file (MP4, MOV, AVI, WebM)');
        return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
        alert(`File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB`);
        return;
    }

    // Call upload callback
    onUpload(file);
}
