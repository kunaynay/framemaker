/**
 * Frame Grouper Module
 * Groups frames by perceptual hash similarity
 */

import { hammingDistance } from '../algorithms/hamming.js';

export function groupFrames(frames, threshold = 5) {
    const groups = new Map();

    for (const frame of frames) {
        let addedToGroup = false;

        // Try to find existing similar group
        for (const [groupHash, group] of groups) {
            if (hammingDistance(frame.hash, groupHash) <= threshold) {
                group.frames.push(frame);
                group.count = group.frames.length;
                addedToGroup = true;
                break;
            }
        }

        // Create new group if no match
        if (!addedToGroup) {
            groups.set(frame.hash, {
                hash: frame.hash,
                representativeFrame: frame,
                frames: [frame],
                count: 1
            });
        }
    }

    return groups;
}
