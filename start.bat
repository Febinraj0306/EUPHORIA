@echo off
title EUPHORIA Music Player Launcher
echo =======================================================
echo               EUPHORIA Music Player Startup
echo =======================================================
echo.

:: Check for Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not in PATH. Please install Python.
    pause
    exit /b
)

:: Check for Node
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH. Please install Node.js.
    pause
    exit /b
)

:: 1. Setup Python Virtual Environment
if not exist ".venv" (
    echo [INFO] Creating Python virtual environment...
    python -m venv .venv
)

echo [INFO] Activating virtual environment and installing dependencies...
call .venv\Scripts\activate.bat
pip install yt-dlp --upgrade --no-deps
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install Python dependencies.
    pause
    exit /b
)

:: 2. Setup React Frontend
if not exist "frontend\node_modules" (
    echo [INFO] Installing frontend dependencies...
    cd frontend
    call npm install
    cd ..
)

:: 3. Start Python Backend on port 5000 (in background)
echo [INFO] Starting Python backend server on port 5000...
start "EUPHORIA Backend" cmd /c "call .venv\Scripts\activate.bat && python main.py"

:: Give backend a moment to start
timeout /t 2 /nobreak >nul

:: 4. Start Vite Dev Server on port 5173 (in background)
echo [INFO] Starting Vite frontend dev server on port 5173...
start "EUPHORIA Frontend" cmd /c "cd frontend && npm run dev"

:: Give frontend a moment to start
timeout /t 3 /nobreak >nul

echo.
echo =======================================================
echo  Both servers are running!
echo  - Frontend (Vite):  http://localhost:5173
echo  - Backend (Python): http://localhost:5000
echo.
echo  Open http://localhost:5173 in your browser.
echo  Vite automatically proxies /api/* to the backend.
echo =======================================================
echo.

:: Open the browser
start http://localhost:5173

echo Press any key to stop both servers...
pause >nul

:: Kill the server windows
taskkill /FI "WINDOWTITLE eq EUPHORIA Backend" >nul 2>&1
taskkill /FI "WINDOWTITLE eq EUPHORIA Frontend" >nul 2>&1
echo Servers stopped.
