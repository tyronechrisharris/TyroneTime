@echo off

REM launch.bat - Script to build and run the ChronoStream Next.js application
REM for Windows.

echo ChronoStream Launcher for Windows
echo ---------------------------------

REM Navigate to the script's directory to ensure commands run in the project root
cd /d "%~dp0"

echo.
echo Step 1: Installing production dependencies...
npm install --omit=dev
REM If you have an older version of npm (before v7), you might need:
REM npm install --production

IF %ERRORLEVEL% NEQ 0 (
    echo Failed to install dependencies. Exiting.
    exit /b %ERRORLEVEL%
)

echo.
echo Step 2: Building the application (if necessary)...
npm run build

IF %ERRORLEVEL% NEQ 0 (
    echo Failed to build the application. Exiting.
    exit /b %ERRORLEVEL%
)

echo.
echo Step 3: Starting the production server on port 9002...
echo You can access the application at http://localhost:9002
echo Press Ctrl+C to stop the server.
npm run start

echo.
echo ChronoStream server has been stopped.
