# ChronoStream: Real-time Adaptive Streaming (Local Network Tool)

ChronoStream is a Next.js application designed to display a real-time millisecond-precision clock and a simulated RTSP client connection count. It's intended for use as an offline, local network tool for testing and monitoring systems. All configuration is handled locally via a `config.json` file.

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

### Installation & Running

1.  **Clone the Repository:**
    Open your terminal or command prompt and clone the repository from GitHub:
    ```bash
    git clone https://github.com/<YourGitHubUsername>/<YourRepositoryName>.git
    ```
    (Replace `<YourGitHubUsername>/<YourRepositoryName>.git` with the actual URL of your GitHub repository if you've hosted it there.)

2.  **Navigate to the Project Directory:**
    Change into the newly cloned project folder:
    ```bash
    cd chronostream-app 
    ```
    (Or whatever you named the repository folder.)

3.  **Install Dependencies:**
    Install all the necessary project dependencies using npm:
    ```bash
    npm install
    ```
    (Alternatively, if you prefer Yarn: `yarn install`)

4.  **Run the Development Server:**
    Start the Next.js development server:
    ```bash
    npm run dev
    ```
    (Alternatively, if you prefer Yarn: `yarn dev`)

5.  **Open in Your Browser:**
    Once the server is running (it will typically say something like "ready on http://localhost:9002"), open your web browser and navigate to:
    [http://localhost:9002](http://localhost:9002)

    You should see the ChronoStream application.

## Configuration

ChronoStream stores its server configuration settings in a `config.json` file located in the root of the project. You can modify this file directly to change settings, or use the "Configure" page within the application UI, which will then update `config.json`.

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

This project was prototyped with Firebase Studio.
