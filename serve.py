#!/usr/bin/env python3
"""
Simple HTTP server to run Frame Maker locally
Run with: python serve.py
"""

import http.server
import socketserver
import webbrowser
from pathlib import Path

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        super().end_headers()

    def log_message(self, format, *args):
        # Enhanced logging to show exactly what's being requested
        if args[1] == '404':
            print(f"[404 ERROR] File not found: {args[0]}")
        else:
            print(f"[{args[1]}] {args[0]}")
        super().log_message(format, *args)

def main():
    Handler = MyHTTPRequestHandler

    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"""
╔══════════════════════════════════════════════╗
║          FRAME MAKER - Local Server          ║
╚══════════════════════════════════════════════╝

🚀 Server running at: http://localhost:{PORT}

📂 Serving from: {Path.cwd()}

🌐 Opening browser automatically...

Press Ctrl+C to stop the server
        """)

        # Open browser automatically
        webbrowser.open(f'http://localhost:{PORT}')

        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n👋 Server stopped. Goodbye!")

if __name__ == "__main__":
    main()
