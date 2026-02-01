# Frame Maker

A cinematic video frame extraction and deduplication tool built with vanilla JavaScript.

## Features

- **Extract All Frames**: Precise frame-by-frame extraction using FFmpeg.wasm
- **Perceptual Similarity Detection**: Groups identical and similar frames using pHash algorithm
- **Interactive Grid View**: Browse unique frames with duplicate count badges
- **Multi-Select Export**: Click on groups to view all similar frames and selectively download
- **Adjustable Threshold**: Fine-tune similarity detection with a threshold slider
- **Client-Side Processing**: Everything runs in your browser - your videos never leave your device

## How to Use

### 1. Start a Local Server

Since this app uses ES6 modules, you need to serve it from a web server (not just open index.html directly).

**Option A: Using Python**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Option B: Using Node.js**
```bash
npx http-server -p 8000
```

**Option C: Using VS Code**
- Install "Live Server" extension
- Right-click index.html and select "Open with Live Server"

### 2. Open in Browser

Navigate to `http://localhost:8000` in your browser (Chrome, Firefox, or Edge recommended).

### 3. Upload a Video

- Drag and drop a video file onto the upload area, or click to browse
- Supported formats: MP4, MOV, AVI, WebM
- Maximum size: 100MB
- Maximum duration: ~5 minutes

### 4. Wait for Processing

The app will:
1. Load FFmpeg (first time only, ~25MB)
2. Extract frames from your video
3. Calculate perceptual hashes
4. Group similar frames

### 5. Browse Results

- View unique frame groups in a grid
- Frames with duplicates show a count badge (e.g., "3×")
- Adjust the similarity threshold slider to regroup frames
- Click "Download All Unique" to export one frame from each group

### 6. Select Specific Frames

- Click on any frame group to see all similar frames
- Use checkboxes to multi-select frames you want
- Click "Download Selected" to export as a ZIP file

## Similarity Threshold

The threshold slider (0-15) controls how similar frames need to be to group together:

- **0-5**: Very similar (recommended) - groups nearly identical frames
- **6-10**: Moderately similar - groups frames with minor differences
- **11-15**: Loosely similar - may group different scenes

## Technical Details

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Video Processing**: FFmpeg.wasm (WebAssembly)
- **Similarity Detection**: Perceptual Hash (pHash) with DCT
- **Comparison**: Hamming distance on 64-bit hashes
- **Export**: JSZip for creating downloadable archives

## Browser Compatibility

Requires a modern browser with support for:
- Canvas API
- Web Workers
- WebAssembly
- ES6 Modules
- IndexedDB

**Tested on:**
- Chrome 90+
- Firefox 88+
- Edge 90+
- Safari 14+ (may have limitations)

## Performance

- **FFmpeg Loading**: ~5 seconds (cached after first load)
- **Frame Extraction**: ~30 frames/second
- **Hash Calculation**: ~50 frames/second
- **Memory Usage**: <500MB for 5-minute videos

## Privacy

All processing happens in your browser. Videos are never uploaded to any server. Frame data is stored temporarily in browser memory and IndexedDB, and is cleared when you close the tab or start a new video.

## Troubleshooting

**"Failed to load FFmpeg"**
- Check your internet connection (FFmpeg loads from CDN on first run)
- Try refreshing the page

**"File too large"**
- Videos must be under 100MB
- Try compressing your video first

**Slow processing**
- Longer videos take more time to process
- Close other browser tabs to free up memory
- For best performance, use videos under 2 minutes

**Frames not grouping correctly**
- Adjust the similarity threshold slider
- Lower values = stricter matching
- Higher values = looser matching

## Project Structure

```
frame-maker/
├── index.html                      # Main entry point
├── styles/
│   ├── main.css                    # Core styles and theme
│   ├── upload.css                  # Upload section
│   ├── grid-view.css              # Grid and processing views
│   └── detail-view.css            # Modal view
├── scripts/
│   ├── app.js                      # Main application
│   ├── state.js                    # State management
│   ├── modules/
│   │   ├── upload-handler.js       # File upload
│   │   ├── video-processor.js      # Frame extraction
│   │   ├── frame-grouper.js        # Similarity grouping
│   │   ├── grid-renderer.js        # Grid rendering
│   │   ├── detail-modal.js         # Detail modal
│   │   └── export-manager.js       # ZIP export
│   ├── algorithms/
│   │   ├── phash.js               # Perceptual hashing
│   │   └── hamming.js             # Hamming distance
│   └── utils/
│       └── toast.js               # Toast notifications
└── README.md
```

## Credits

Built with:
- [FFmpeg.wasm](https://github.com/ffmpegwasm/ffmpeg.wasm) - Video processing
- [JSZip](https://stukjs.github.io/jszip/) - ZIP file creation

## License

Free to use for personal and commercial projects.
