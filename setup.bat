@echo off
echo.
echo ========================================
echo   Web Scraper Playground - Setup
echo ========================================
echo.
echo This will install everything you need!
echo.
pause

echo.
echo [1/3] Checking if Node.js is installed...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Node.js is not installed!
    echo.
    echo Please download and install Node.js from:
    echo https://nodejs.org
    echo.
    echo Pick the LTS version and try again.
    pause
    exit /b 1
)

node --version
echo Node.js is installed!

echo.
echo [2/3] Installing project dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Failed to install dependencies!
    pause
    exit /b 1
)

echo.
echo [3/3] Installing Playwright browsers...
call npx playwright install chromium
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Failed to install browsers!
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo You're ready to start scraping!
echo.
echo Try running:  npm run scrape
echo Or open:      npm run guide
echo.
pause
