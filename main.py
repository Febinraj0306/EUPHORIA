import os
import sys
import json
import urllib.request
import urllib.parse
from http.server import HTTPServer, BaseHTTPRequestHandler
import yt_dlp

def get_stream_url(video_id: str):
    ydl_opts = {
        'format': 'bestaudio/best',
        'quiet': True,
        'no_warnings': True,
        'nocheckcertificate': True,
        'ignoreerrors': True,
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        try:
            info = ydl.extract_info(f"https://www.youtube.com/watch?v={video_id}", download=False)
            if not info:
                return None
            
            if 'url' in info:
                return info['url']
            
            formats = info.get('formats', [])
            for f in formats:
                if f.get('acodec') != 'none' and f.get('vcodec') == 'none':
                    return f.get('url')
            
            if formats:
                return formats[0].get('url')
        except Exception as e:
            print(f"Error extracting stream URL for {video_id}: {e}")
            return None

def search_youtube(query: str, max_results: int = 50):
    ydl_opts = {
        'format': 'bestaudio/best',
        'quiet': True,
        'no_warnings': True,
        'extract_flat': True,
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        try:
            search_query = f"ytsearch{max_results}:{query}"
            info = ydl.extract_info(search_query, download=False)
            results = []
            if 'entries' in info:
                for entry in info['entries']:
                    if not entry:
                        continue
                    dur_secs = entry.get('duration')
                    duration_str = "0:00"
                    if dur_secs:
                        mins = int(dur_secs // 60)
                        secs = int(dur_secs % 60)
                        duration_str = f"{mins}:{secs:02d}"
                        
                    results.append({
                        'id': entry.get('id'),
                        'title': entry.get('title'),
                        'duration': duration_str,
                        'duration_secs': dur_secs or 0,
                        'uploader': entry.get('uploader') or entry.get('channel') or "Unknown Artist",
                        'thumbnail': f"https://img.youtube.com/vi/{entry.get('id')}/hqdefault.jpg",
                        'description': entry.get('description') or f"Audio stream from YouTube for track {entry.get('title')}"
                    })
            return results
        except Exception as e:
            print(f"Error searching YouTube for '{query}': {e}")
            return []

class AudioPlayerHandler(BaseHTTPRequestHandler):
    def end_headers(self):
        # Enable CORS headers for all responses to allow client-side audio analysis
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Range')
        self.send_header('Access-Control-Expose-Headers', 'Content-Range, Content-Length, Accept-Ranges')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        parsed_url = urllib.parse.urlparse(self.path)
        path = parsed_url.path
        query_params = urllib.parse.parse_qs(parsed_url.query)
        
        # 1. API: Search Endpoint
        if path == '/api/search':
            q = query_params.get('q', [''])[0]
            if not q.strip():
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(b'{"error": "Query parameter \'q\' is required"}')
                return
                
            results = search_youtube(q)
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"results": results}).encode('utf-8'))
            return
            
        # 2. API: Audio Stream — redirect browser directly to YouTube URL
        # This avoids proxying large audio files through the server (prevents timeouts).
        elif path.startswith('/api/stream-audio/'):
            video_id = path.split('/')[-1]
            stream_url = get_stream_url(video_id)
            if not stream_url:
                self.send_response(404)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(b'{"error": "Audio stream not found"}')
                return

            # 302 redirect — browser fetches audio directly from YouTube
            self.send_response(302)
            self.send_header('Location', stream_url)
            self.end_headers()
            return
            
        # 3. Serve Frontend Static Build Files
        else:
            # Map path to frontend/dist/
            local_path = path.lstrip('/')
            if not local_path:
                local_path = 'index.html'
                
            file_path = os.path.join('frontend', 'dist', local_path)
            
            # Directory traversal protection
            abs_file_path = os.path.abspath(file_path)
            abs_dist_path = os.path.abspath(os.path.join('frontend', 'dist'))
            if not abs_file_path.startswith(abs_dist_path):
                self.send_response(403)
                self.end_headers()
                return
                
            if os.path.exists(file_path) and os.path.isfile(file_path):
                self.send_response(200)
                
                # Deduce Mime-type
                if file_path.endswith('.html'):
                    self.send_header('Content-Type', 'text/html; charset=utf-8')
                elif file_path.endswith('.js'):
                    self.send_header('Content-Type', 'application/javascript; charset=utf-8')
                elif file_path.endswith('.css'):
                    self.send_header('Content-Type', 'text/css; charset=utf-8')
                elif file_path.endswith('.svg'):
                    self.send_header('Content-Type', 'image/svg+xml')
                elif file_path.endswith('.png'):
                    self.send_header('Content-Type', 'image/png')
                elif file_path.endswith('.jpg') or file_path.endswith('.jpeg'):
                    self.send_header('Content-Type', 'image/jpeg')
                else:
                    self.send_header('Content-Type', 'application/octet-stream')
                    
                self.send_header('Content-Length', str(os.path.getsize(file_path)))
                self.end_headers()
                
                # Write file bytes
                with open(file_path, 'rb') as f:
                    self.wfile.write(f.read())
            else:
                # SPA Routing fallback: serve index.html for virtual routes
                index_path = os.path.join(abs_dist_path, 'index.html')
                if os.path.exists(index_path):
                    self.send_response(200)
                    self.send_header('Content-Type', 'text/html; charset=utf-8')
                    self.send_header('Content-Length', str(os.path.getsize(index_path)))
                    self.end_headers()
                    with open(index_path, 'rb') as f:
                        self.wfile.write(f.read())
                else:
                    self.send_response(404)
                    self.end_headers()
                    self.wfile.write(b'Not Found')

def main():
    port = int(os.environ.get('PORT', 5000))
    server_address = ('0.0.0.0', port)
    httpd = HTTPServer(server_address, AudioPlayerHandler)
    print(f"EUPHORIA Server running at http://0.0.0.0:{port}/")
    print("Close this window or press Ctrl+C to terminate.")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server...")
        httpd.server_close()

if __name__ == '__main__':
    main()
