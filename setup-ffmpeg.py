#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Download all FFmpeg.wasm files locally
"""

import urllib.request
import os
import json
import sys

# Force UTF-8 encoding for Windows
if sys.platform == 'win32':
    import codecs
    sys.stdout = codecs.getwriter('utf-8')(sys.stdout.buffer, 'strict')
    sys.stderr = codecs.getwriter('utf-8')(sys.stderr.buffer, 'strict')

print("\nSetting up FFmpeg.wasm locally...\n")

# Create lib directory
os.makedirs("lib", exist_ok=True)

# Base URLs
FFMPEG_BASE = "https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.12.6/dist/umd/"
CORE_BASE = "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/umd/"

# FFmpeg library files (main package)
FFMPEG_FILES = [
    "ffmpeg.js",
    "814.ffmpeg.js",  # Worker chunk
]

# FFmpeg core files
CORE_FILES = [
    "ffmpeg-core.js",
    "ffmpeg-core.wasm",
]

def download_file(url, filepath):
    """Download a file with error handling"""
    try:
        print(f"Downloading {os.path.basename(filepath)}...", end=" ")
        urllib.request.urlretrieve(url, filepath)
        size = os.path.getsize(filepath) / 1024 / 1024
        print(f"OK ({size:.2f} MB)")
        return True
    except Exception as e:
        print(f"SKIP (not found)")
        return False

# Download FFmpeg library files
print("FFmpeg Library Files:")
for filename in FFMPEG_FILES:
    url = FFMPEG_BASE + filename
    filepath = os.path.join("lib", filename)
    download_file(url, filepath)

print("\nFFmpeg Core Files:")
for filename in CORE_FILES:
    url = CORE_BASE + filename
    filepath = os.path.join("lib", filename)
    download_file(url, filepath)

# Try to get the file list from jsdelivr API to find all chunks
print("\nChecking for additional chunk files...")
try:
    api_url = "https://data.jsdelivr.com/v1/package/npm/@ffmpeg/ffmpeg@0.12.6/flat"
    response = urllib.request.urlopen(api_url)
    data = json.loads(response.read())

    umd_files = [f['name'] for f in data['files'] if '/dist/umd/' in f['name'] and f['name'].endswith('.js')]

    for file_path in umd_files:
        filename = os.path.basename(file_path)
        if filename not in FFMPEG_FILES and filename not in ['ffmpeg.js']:
            if '.ffmpeg.js' in filename or 'worker' in filename.lower():
                url = f"https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.12.6{file_path}"
                filepath = os.path.join("lib", filename)
                download_file(url, filepath)
except Exception as e:
    print(f"Could not auto-detect chunks: {e}")

print("\nSetup complete!")
print(f"Files saved to: {os.path.abspath('lib')}")
print("\nNow updating HTML to use local files...\n")
