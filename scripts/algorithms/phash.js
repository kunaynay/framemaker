/**
 * Perceptual Hash (pHash) Algorithm
 * Uses Discrete Cosine Transform for robust image similarity detection
 */

const HASH_SIZE = 8;
const RESIZE_SIZE = 32;

export async function calculatePHash(imageBlob) {
    try {
        // Load image into canvas
        const img = await loadImage(imageBlob);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Resize to 32x32
        canvas.width = RESIZE_SIZE;
        canvas.height = RESIZE_SIZE;
        ctx.drawImage(img, 0, 0, RESIZE_SIZE, RESIZE_SIZE);

        // Get grayscale pixel data
        const imageData = ctx.getImageData(0, 0, RESIZE_SIZE, RESIZE_SIZE);
        const grayscale = toGrayscale(imageData.data);

        // Apply DCT
        const dct = applyDCT(grayscale);

        // Extract top-left 8x8 (low frequencies)
        const lowFreq = extractLowFrequencies(dct, HASH_SIZE);

        // Calculate median
        const median = calculateMedian(lowFreq);

        // Generate hash
        const hash = generateHash(lowFreq, median);

        return hash;
    } catch (error) {
        console.error('pHash calculation error:', error);
        // Return random hash on error to avoid breaking the app
        return generateRandomHash();
    }
}

/**
 * Load image from blob
 */
function loadImage(blob) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            URL.revokeObjectURL(img.src);
            resolve(img);
        };
        img.onerror = reject;
        img.src = URL.createObjectURL(blob);
    });
}

/**
 * Convert RGBA to grayscale
 */
function toGrayscale(pixels) {
    const grayscale = [];
    for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        // Standard grayscale conversion
        const gray = 0.299 * r + 0.587 * g + 0.114 * b;
        grayscale.push(gray);
    }
    return grayscale;
}

/**
 * Apply 2D Discrete Cosine Transform (simplified)
 */
function applyDCT(pixels) {
    const size = RESIZE_SIZE;
    const dct = new Array(size * size);

    for (let u = 0; u < size; u++) {
        for (let v = 0; v < size; v++) {
            let sum = 0;
            for (let x = 0; x < size; x++) {
                for (let y = 0; y < size; y++) {
                    const pixel = pixels[x * size + y];
                    sum += pixel *
                        Math.cos((2 * x + 1) * u * Math.PI / (2 * size)) *
                        Math.cos((2 * y + 1) * v * Math.PI / (2 * size));
                }
            }
            dct[u * size + v] = sum;
        }
    }

    return dct;
}

/**
 * Extract top-left portion (low frequencies)
 */
function extractLowFrequencies(dct, hashSize) {
    const lowFreq = [];
    const fullSize = RESIZE_SIZE;

    for (let u = 0; u < hashSize; u++) {
        for (let v = 0; v < hashSize; v++) {
            lowFreq.push(dct[u * fullSize + v]);
        }
    }

    return lowFreq;
}

/**
 * Calculate median value
 */
function calculateMedian(values) {
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
        ? (sorted[mid - 1] + sorted[mid]) / 2
        : sorted[mid];
}

/**
 * Generate hash string
 */
function generateHash(values, median) {
    let hash = '';
    for (const value of values) {
        hash += value > median ? '1' : '0';
    }
    return hash;
}

/**
 * Generate random hash for error cases
 */
function generateRandomHash() {
    let hash = '';
    for (let i = 0; i < 64; i++) {
        hash += Math.random() > 0.5 ? '1' : '0';
    }
    return hash;
}
