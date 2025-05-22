#!/bin/bash

# launch.sh - Script to build and run the TyroneTime Next.js application
# for macOS and Linux.

# Exit immediately if a command exits with a non-zero status.
set -e

echo "TyroneTime Launcher for macOS/Linux"
echo "--------------------------------------"

# Navigate to the script's directory to ensure commands run in the project root
cd "$(dirname "$0")"

# Step 1: Install production dependencies
echo ""
echo "Step 1: Installing production dependencies..."
npm install --omit=dev
# If you have an older version of npm (before v7), you might need:
# npm install --production

# Step 2: Build the Next.js application
echo ""
echo "Step 2: Building the application (if necessary)..."
npm run build

# Step 3: Start the production server
echo ""
echo "Step 3: Starting the production server on port 9002..."
echo "You can access the application at http://localhost:9002"
echo "Press Ctrl+C to stop the server."
npm run start

echo ""
echo "TyroneTime server has been stopped."
