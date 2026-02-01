@echo off
cls
echo ========================================
echo   FRAME MAKER - Local Server
echo ========================================
echo.
echo Current directory: %CD%
echo.
echo Starting server on port 8000...
echo.
echo After server starts, open your browser to:
echo http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

py serve.py

echo.
echo Server stopped.
echo.
pause
