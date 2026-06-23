# EUPHORIA 🎵

Euphoria is a Spotify-inspired, fully functional music player web application that allows you to search and stream songs instantly. The application is built with a beautifully designed, responsive frontend using Vanilla JS/CSS and a lightweight Starlette backend powered by `yt-dlp`.

## 🌟 Live Preview
[https://bright-biscuit-c1a394.netlify.app/](https://bright-biscuit-c1a394.netlify.app/)

## ✨ Features
- **Instant Streaming**: Search for any song or artist and start listening immediately without downloading.
- **Beautiful UI**: A highly polished, dark-themed user interface inspired by modern streaming platforms.
- **Playback Controls**: Full audio controls including play/pause, seek, volume, shuffle, and repeat modes.
- **Lightweight Backend**: Runs on an async Starlette backend without heavy frameworks.
- **Responsive Design**: Adapts beautifully to mobile, tablet, and desktop screens.

## 🚀 Getting Started

### Prerequisites
- Python 3.10+
- `pip` or `uv` package manager
- `ffmpeg` (recommended for optimal audio extraction via `yt-dlp`)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Febinraj0306/EUPHORIA.git
   cd EUPHORIA
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the development server:**
   - **On Windows:**
     Simply double-click the `run.bat` file in the root folder.
   - **On macOS/Linux:**
     ```bash
     uvicorn main:app --reload --port 8000
     ```

4. **Open in browser:**
   Navigate to `http://localhost:8000` to start listening!

## 🛠️ Tech Stack
- **Frontend**: HTML5, Vanilla CSS3 (Custom Variables, Flexbox/Grid), Vanilla JavaScript (ES6+).
- **Backend**: Python, [Starlette](https://www.starlette.io/) (ASGI framework).
- **Audio Engine**: [yt-dlp](https://github.com/yt-dlp/yt-dlp) for fast YouTube audio stream extraction.

## 📝 License
This project is open-sourced and available under the [MIT License](LICENSE).
