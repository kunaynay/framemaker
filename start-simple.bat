@echo off
title Frame Maker Server

echo.
echo ======================================
echo   FRAME MAKER - Starting Server
echo ======================================
echo.

cd /d "%~dp0"

echo Trying to start Python server with CORS support...
echo.
echo Server will run at: http://localhost:8000
echo Opening browser in 3 seconds...
echo.

start /B timeout /T 3 /NOBREAK >nul && start http://localhost:8000

py serve.py

if %errorlevel% neq 0 (
    echo.
    echo Server stopped or failed to start.
    echo.
)

echo.
echo Press any key to close this window...
pause >nul
