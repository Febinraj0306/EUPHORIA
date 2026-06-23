# pyrefly: ignore [missing-import]
from pytubefix import YouTube
import json

def get_stream(video_id):
    try:
        yt = YouTube(f"https://www.youtube.com/watch?v={video_id}")
        # Get the highest quality audio stream
        stream = yt.streams.get_audio_only()
        if stream:
            return {"url": stream.url, "title": yt.title, "duration": yt.length}
        else:
            return {"error": "No audio stream found"}
    except Exception as e:
        return {"error": str(e)}

print(json.dumps(get_stream("YQHsXMglC9A")))
