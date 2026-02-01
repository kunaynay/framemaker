/**
 * Hamming Distance Calculator
 * Compares two binary strings and counts differing bits
 */

export function hammingDistance(hash1, hash2) {
    if (hash1.length !== hash2.length) {
        throw new Error('Hashes must be same length');
    }

    let distance = 0;
    for (let i = 0; i < hash1.length; i++) {
        if (hash1[i] !== hash2[i]) {
            distance++;
        }
    }

    return distance;
}

/**
 * Check if two hashes are similar within threshold
 */
export function areSimilar(hash1, hash2, threshold = 5) {
    return hammingDistance(hash1, hash2) <= threshold;
}
