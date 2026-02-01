@echo off
cls
echo ========================================
echo   FRAME MAKER - Local Server
echo ========================================
echo.
echo Current directory: %CD%
echo.

set SERVER_SCRIPT=serve.py

:: Attempt 1: Try 'py' (standard Windows launcher)
where py >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Found 'py' launcher. Attempting to start server...
    py %SERVER_SCRIPT%
    if %ERRORLEVEL% EQU 0 goto :success
    echo 'py' execution failed. Trying next...
    echo.
)

:: Attempt 2: Try 'python'
where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Found 'python' command. Attempting to start server...
    python %SERVER_SCRIPT%
    if %ERRORLEVEL% EQU 0 goto :success
    echo 'python' execution failed. Trying next...
    echo.
)

:: Attempt 3: Try 'python3'
where python3 >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Found 'python3' command. Attempting to start server...
    python3 %SERVER_SCRIPT%
    if %ERRORLEVEL% EQU 0 goto :success
    echo 'python3' execution failed.
    echo.
)

echo.
echo ========================================
echo ERROR: Could not start the server.
echo ========================================
echo No valid Python environment found to run %SERVER_SCRIPT%.
echo Checked: py, python, python3
echo.
echo Please ensure Python is installed and added to your PATH.
echo Download at: https://python.org
echo.
goto :end

:success
echo.
echo Server stopped successfully.

:end
pause
