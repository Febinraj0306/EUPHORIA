@echo off
title EUPHORIA - Music Player
echo ===================================================
echo   EUPHORIA - Music Player Local Server (Windows)
echo ===================================================
echo.
echo [1/2] Checking & Installing Python Dependencies...
pip install -r requirements.txt
if %ERRORLEVEL% neq 0 (
    echo.
    echo WARNING: Failed to install requirements automatically.
    echo Please make sure Python is installed and added to your PATH.
    echo.
)
echo.
echo [2/2] Starting local Starlette server on http://localhost:8000...
echo (You can close this window to stop the server)
echo.
python -m uvicorn main:app --reload --port 8000
pause
