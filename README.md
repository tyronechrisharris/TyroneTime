# TyroneTime: Real-time Clock & Connection Monitor (Local Network Tool)

TyroneTime is a Next.js application designed to display a real-time millisecond-precision clock and a simulated RTSP client connection count. It's intended for use as an offline, local network tool for testing and monitoring systems. All configuration is handled locally via a `config.json` file.

## Core Features:

*   **Real-time Clock Display:** Shows the current time with millisecond precision.
*   **Connection Count:** Displays a simulated number of currently connected RTSP clients.
*   **Local Configuration:** All settings are managed via a `config.json` file in the project root.
*   **Offline First:** Designed to run entirely on a local network without requiring internet access for its core features.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   **Node.js:** You'll need Node.js installed on your system. Version 18.x or later is recommended. You can download it from [nodejs.org](https://nodejs.org/). npm (Node Package Manager) is included with Node.js.
*   **Git:** Required to clone the repository. You can download it from [git-scm.com](https://git-scm.com/).

### Installation

1.  **Clone the Repository:**
    Open your terminal or command prompt and clone the repository from GitHub:
    ```bash
    git clone https://github.com/tyronechrisharris/studio.git
    ```

2.  **Navigate to the Project Directory:**
    Change into the newly cloned project folder:
    ```bash
    cd tyronetime-app 
    ```
    (Or whatever you named the repository folder.)

3.  **Install Dependencies:**
    Install all the necessary project dependencies using npm:
    ```bash
    npm install
    ```
    (Alternatively, if you prefer Yarn: `yarn install`)


## Running the Application

You have two main ways to run TyroneTime:

### 1. Development Mode

This mode is suitable for making changes to the code and seeing them live.

*   Run the development server:
    ```bash
    npm run dev
    ```
    (Alternatively, if you prefer Yarn: `yarn dev`)
*   Open your web browser and navigate to: [http://localhost:9002](http://localhost:9002)

### 2. Production Mode (using Launch Scripts)

This mode runs the optimized, built version of the application. Launch scripts are provided for convenience.

**For macOS and Linux:**

1.  Make the launch script executable (you only need to do this once):
    ```bash
    chmod +x launch.sh
    ```
2.  Run the launch script:
    ```bash
    ./launch.sh
    ```

**For Windows:**

1.  Run the launch batch file:
    ```bash
    .\launch.bat
    ```
    (Or double-click `launch.bat` in File Explorer)

The launch scripts will:
1.  Install necessary production dependencies.
2.  Build the application (if not already built).
3.  Start the production server on [http://localhost:9002](http://localhost:9002).

Press `Ctrl+C` in the terminal to stop the server.

## Configuration

TyroneTime stores its server configuration settings in a `config.json` file located in the root of the project. You can modify this file directly to change settings, or use the "Configure" page within the application UI, which will then update `config.json`.

The default `config.json` includes settings for:
*   Viewer Username & Password
*   Server IP Address & Port
*   Video Codec & Resolution
*   Frames Per Second (FPS)
*   H.264 I-Frame Interval (if H.264 is selected)

## Available Pages

*   **Dashboard (`/`):** Displays the real-time clock and connection counter.
*   **Configure (`/configure`):** Allows you to modify the server settings which are saved to `config.json`.

---
