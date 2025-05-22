@echo off
rem launch.bat - Script to build and run the TyroneTime Next.js application
rem for Windows.

echo TyroneTime Launcher for Windows
echo --------------------------------------

rem Navigate to the script's directory to ensure commands run in the project root
cd /d "%~dp0"

echo.
echo Step 1: Installing production dependencies...
call npm install --omit=dev
rem If you have an older version of npm (before v7), you might need:
rem call npm install --production

echo.
echo Step 2: Building the application (if necessary)...
call npm run build

echo.
echo Step 3: Starting the production server on port 9002...
echo You can access the application at http://localhost:9002
echo Press Ctrl+C to stop the server.
call npm run start

echo.
echo TyroneTime server has been stopped.
