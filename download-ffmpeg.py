#!/usr/bin/env python3
"""
Download FFmpeg.wasm files locally to avoid CORS issues
"""

import urllib.request
import os

# Base URL for FFmpeg core files
BASE_URL = "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/umd/"

# Files to download
FILES = [
    "ffmpeg-core.js",
    "ffmpeg-core.wasm",
]

# Create lib directory if it doesn't exist
lib_dir = "lib"
if not os.path.exists(lib_dir):
    os.makedirs(lib_dir)
    print(f"✅ Created {lib_dir} directory")

print("\n📦 Downloading FFmpeg.wasm files...\n")

# Download each file
for filename in FILES:
    url = BASE_URL + filename
    filepath = os.path.join(lib_dir, filename)

    print(f"Downloading {filename}...", end=" ")

    try:
        urllib.request.urlretrieve(url, filepath)
        file_size = os.path.getsize(filepath) / 1024 / 1024  # Size in MB
        print(f"✅ ({file_size:.2f} MB)")
    except Exception as e:
        print(f"❌ Failed: {e}")

print("\n✨ Download complete!")
print(f"\nFiles saved to: {os.path.abspath(lib_dir)}")
print("\nNow update the code to load from ./lib/ instead of CDN\n")
