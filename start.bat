@echo off
echo.
echo ╔══════════════════════════════════════════════╗
echo ║          FRAME MAKER - Quick Start           ║
echo ╚══════════════════════════════════════════════╝
echo.
echo Starting local server...
echo.

REM Try py command first (Windows Python Launcher)
py --version >nul 2>&1
if %errorlevel% == 0 (
    echo Using Python launcher (py)...
    py serve.py
    goto :end
)

REM Try python command
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo Using python command...
    python serve.py
    goto :end
)

REM If nothing works
echo.
echo ❌ Python not found!
echo.
echo Please install Python from: https://www.python.org/downloads/
echo Or use VS Code with Live Server extension
echo.

:end
pause
