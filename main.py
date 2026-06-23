"""
EUPHORIA — Spotify-like Music Player
Starlette backend (no pydantic/FastAPI) — works on any Python version

Startup:
    pip install -r requirements.txt
    uvicorn main:app --reload --port 8000
    Open: http://localhost:8000
"""

import json
import os
import re

from starlette.applications import Starlette
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware
from starlette.requests import Request
from starlette.responses import JSONResponse, Response
from starlette.routing import Mount, Route
from starlette.staticfiles import StaticFiles

import yt_dlp

# ── Helpers ───────────────────────────────────────────────────────────────────

def _fmt(seconds) -> str:
    """Convert seconds to MM:SS."""
    try:
        s = int(seconds or 0)
        return f"{s // 60}:{s % 60:02d}"
    except Exception:
        return "0:00"


def _ydl_opts(extra: dict | None = None) -> dict:
    opts = {
        "quiet": True,
        "no_warnings": True,
        "nocheckcertificate": True,
        "http_headers": {
            "User-Agent": (
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/124.0.0.0 Safari/537.36"
            )
        },
    }
    if extra:
        opts.update(extra)
    return opts


def _err(msg: str, status: int = 500) -> JSONResponse:
    return JSONResponse({"detail": msg}, status_code=status)


# ── Route handlers ────────────────────────────────────────────────────────────

async def suggestions(request: Request) -> JSONResponse:
    data = [
        "lofi hip hop",
        "top hits 2024",
        "jazz classics",
        "pop music mix",
        "chill vibes",
        "workout music",
    ]
    return JSONResponse(data)


async def search(request: Request) -> JSONResponse:
    q = request.query_params.get("q", "").strip()
    if not q:
        return _err("Query parameter 'q' is required.", 400)

    opts = _ydl_opts({"extract_flat": True, "skip_download": True})
    try:
        with yt_dlp.YoutubeDL(opts) as ydl:
            info = ydl.extract_info(f"ytsearch50:{q}", download=False)

        results = []
        for entry in (info or {}).get("entries", []):
            if not entry:
                continue
            vid = entry.get("id") or entry.get("url", "")
            thumb = entry.get("thumbnail") or (
                f"https://i.ytimg.com/vi/{vid}/mqdefault.jpg" if vid else ""
            )
            results.append({
                "id":        vid,
                "title":     entry.get("title", "Unknown Title"),
                "artist":    entry.get("uploader") or entry.get("channel") or "Unknown Artist",
                "duration":  _fmt(entry.get("duration")),
                "thumbnail": thumb,
            })
        return JSONResponse(results)

    except Exception as exc:
        return _err(f"Search failed: {exc}")


async def stream(request: Request) -> JSONResponse:
    video_id = request.path_params["video_id"]
    if not re.match(r"^[A-Za-z0-9_\-]{5,20}$", video_id):
        return _err("Invalid video ID.", 400)

    opts = _ydl_opts({
        "format": "bestaudio/best",
        "extract_flat": False,
        "skip_download": True,
    })
    try:
        url = f"https://www.youtube.com/watch?v={video_id}"
        with yt_dlp.YoutubeDL(opts) as ydl:
            info = ydl.extract_info(url, download=False)

        if not info:
            return _err("Video not found.", 404)

        stream_url = info.get("url") or ""
        if not stream_url:
            for fmt in info.get("formats", []):
                if fmt.get("url"):
                    stream_url = fmt["url"]
                    break

        if not stream_url:
            return _err("Could not extract stream URL.")

        thumb = info.get("thumbnail") or f"https://i.ytimg.com/vi/{video_id}/mqdefault.jpg"

        return JSONResponse({
            "stream_url": stream_url,
            "title":      info.get("title", "Unknown Title"),
            "artist":     info.get("uploader") or info.get("channel") or "Unknown Artist",
            "thumbnail":  thumb,
            "duration":   _fmt(info.get("duration")),
        })

    except Exception as exc:
        return _err(f"Stream extraction failed: {exc}")


# ── App assembly ──────────────────────────────────────────────────────────────

static_dir = os.path.join(os.path.dirname(__file__), "static")
os.makedirs(static_dir, exist_ok=True)

routes = [
    Route("/api/suggestions",          suggestions),
    Route("/api/search",               search),
    Route("/api/stream/{video_id}",    stream),
    Mount("/", StaticFiles(directory=static_dir, html=True)),
]

middleware = [
    Middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_methods=["*"],
        allow_headers=["*"],
    )
]

app = Starlette(routes=routes, middleware=middleware)
