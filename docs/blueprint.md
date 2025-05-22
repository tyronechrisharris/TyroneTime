# **App Name**: ChronoStream

## Core Features:

- Clock Display: Display a real-time clock with millisecond precision on a black background.
- Connection Count: Display the number of currently connected RTSP clients.
- RTSP Streaming: Stream the dynamically generated video via RTSP.
- Parameter Configuration: Allows a user to specify their username, password, IP Address, Port number, Video Codec, Video Resolution, FPS, and H264 I-Frame Interval.
- Adaptive Streaming: LLM tool selects optimal streaming parameters (codec, resolution, FPS) based on the current number of connected clients and server load.

## Style Guidelines:

- Primary color: White (#FFFFFF) for maximum contrast against the black background, ensuring clear visibility of the clock and connection count.
- Background color: Black (#080809) provides a stark, simple backdrop that highlights the textual information.
- Accent color: Light Gray (#A9A9A9) to provide a subtle differentiation and additional readability on the UI
- Use a monospaced font (e.g., Courier New) for the clock and connection count to ensure consistent character width and readability.
- Display the clock prominently at the top of the video frame and the connection count below or next to it.
- Implement a smooth, non-flickering update of the millisecond counter for a professional look.