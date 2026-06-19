import { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import './App.css';// Custom SVG Album Art Covers
const ZosoCover = () => (
  <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', display: 'block', background: '#ff2a3b' }}>
    <g stroke="#ffffff" strokeWidth="4.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 36 L58 36 L28 70 L64 70" strokeWidth="5.5" />
      <circle cx="45" cy="51" r="9" />
      <path d="M45 42 L45 60" />
      <path d="M58 48 C58 40 72 40 72 50 C72 60 58 60 58 70 C58 80 72 80 72 74" />
      <circle cx="80" cy="70" r="5" />
    </g>
  </svg>
);

const BonhamCover = () => (
  <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', display: 'block', background: '#111111' }}>
    <g stroke="#ffffff" strokeWidth="4" fill="none">
      <circle cx="50" cy="38" r="19" />
      <circle cx="36" cy="62" r="19" />
      <circle cx="64" cy="62" r="19" />
    </g>
  </svg>
);

const PlantCover = () => (
  <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', display: 'block', background: '#ebe5d8' }}>
    <g stroke="#3a2b20" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="50" cy="50" r="36" strokeWidth="3" />
      <path d="M32 68 L68 32" strokeWidth="4.5" />
      <path d="M38 58 Q31 52 38 48 M43 53 Q36 47 43 43 M49 47 Q42 41 49 37 M54 42 Q47 36 54 32" strokeWidth="2" />
      <path d="M44 50 Q51 54 48 61 M50 44 Q57 48 54 55 M56 38 Q63 42 60 49 M62 32 Q69 36 66 43" strokeWidth="2" />
    </g>
  </svg>
);

const JonesCover = () => (
  <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', display: 'block', background: '#1c1d21' }}>
    <g stroke="#ffffff" strokeWidth="3.5" fill="none">
      <circle cx="50" cy="50" r="36" />
      <path d="M50 16 C34 38 34 62 50 84 C66 62 66 38 50 16 Z" />
      <path d="M21 67 C47 67 67 55 79 33 C53 33 33 45 21 67 Z" />
      <path d="M79 67 C53 67 33 55 21 33 C47 33 67 45 79 67 Z" />
    </g>
  </svg>
);

// Wrapper component to render either SVG or image
const TrackCover = ({ track, className }) => {
  if (track.svgKey === 'zoso') return <div className={className}><ZosoCover /></div>;
  if (track.svgKey === 'bonham') return <div className={className}><BonhamCover /></div>;
  if (track.svgKey === 'plant') return <div className={className}><PlantCover /></div>;
  if (track.svgKey === 'jones') return <div className={className}><JonesCover /></div>;
  return <img src={track.thumbnail} alt={track.title} className={className} />;
};

// Custom vector icons for UI elements
const LoopIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block' }}>
    <polyline points="23 4 23 10 17 10" />
    <polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.8" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block' }}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);


const HeartIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block' }}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const HeartFilledIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="#ff3344" style={{ display: 'inline-block' }}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const ShuffleIcon = ({ active }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke={active ? "#ff3344" : "currentColor"} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block' }}>
    <polyline points="16 3 21 3 21 8" />
    <line x1="4" y1="20" x2="21" y2="3" />
    <polyline points="21 16 21 21 16 21" />
    <line x1="15" y1="15" x2="21" y2="21" />
    <line x1="4" y1="4" x2="9" y2="9" />
  </svg>
);

const ReplayIcon = ({ active }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke={active ? "#ff3344" : "currentColor"} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block' }}>
    <polyline points="1 4 1 10 7 10" />
    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
  </svg>
);

const AddToPlaylistIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block' }}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const PrevIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <polygon points="19 20 9 12 19 4 19 20" />
    <line x1="5" y1="19" x2="5" y2="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const NextIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <polygon points="5 4 15 12 5 20 5 4" />
    <line x1="19" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const VolumeIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>
);

const VolumeMuteIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <line x1="23" y1="9" x2="17" y2="15" />
    <line x1="17" y1="9" x2="23" y2="15" />
  </svg>
);

// Default Led Zeppelin tracks from the reference image
const DEFAULT_PLAYLIST = [
  {
    id: "h58X580Vpqg",
    title: "Good Times Bad Times",
    duration: "2:46",
    duration_secs: 166,
    uploader: "Led Zeppelin",
    svgKey: "zoso",
    thumbnail: "https://img.youtube.com/vi/h58X580Vpqg/hqdefault.jpg",
    description: "Good Times Bad Times is the opening track of Led Zeppelin's 1969 self-titled debut album. The song features a revolutionary bass drum technique that established John Bonham's legendary drumming style."
  },
  {
    id: "732o6bJj-8M",
    title: "Dazed & Confused",
    duration: "6:28",
    duration_secs: 388,
    uploader: "Led Zeppelin",
    svgKey: "bonham",
    thumbnail: "https://img.youtube.com/vi/732o6bJj-8M/hqdefault.jpg",
    description: "Dazed and Confused is a blues-rock epic written by Jake Holmes and re-worked by Jimmy Page. It features Page playing his Fender Telecaster with a violin bow, creating an eerie, atmospheric wall of sound."
  },
  {
    id: "yBtG_d0b90w",
    title: "Black Dog",
    duration: "4:56",
    duration_secs: 296,
    uploader: "Led Zeppelin",
    svgKey: "plant",
    thumbnail: "https://img.youtube.com/vi/yBtG_d0b90w/hqdefault.jpg",
    description: "Black Dog is the famous opening track from Led Zeppelin IV, released in 1971. Known for its complex, winding riff in 9/8 time and acapella vocal call-and-response sections, it remains one of rock's most recognizable anthems."
  },
  {
    id: "g4LpEsE-g0o",
    title: "All Of My Love",
    duration: "5:53",
    duration_secs: 353,
    uploader: "Led Zeppelin",
    svgKey: "jones",
    thumbnail: "https://img.youtube.com/vi/g4LpEsE-g0o/hqdefault.jpg",
    description: "All My Love is a synth-driven power ballad from Led Zeppelin's 1979 album 'In Through the Out Door'. Written by Robert Plant and John Paul Jones, it was a deeply personal tribute to Plant's late son, Karac."
  }
];

const INITIAL_RANDOM_PLAYLIST = [...DEFAULT_PLAYLIST].sort(() => Math.random() - 0.5);

export default function App() {
  const [playlist, setPlaylist] = useState(INITIAL_RANDOM_PLAYLIST);
  const [activeTrack, setActiveTrack] = useState(INITIAL_RANDOM_PLAYLIST[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(INITIAL_RANDOM_PLAYLIST[0].duration_secs);
  const [isMuted, setIsMuted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [showArtworkModal, setShowArtworkModal] = useState(false);

  const [likedSongs, setLikedSongs] = useState([]);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isReplay, setIsReplay] = useState(false);
  const [currentView, setCurrentView] = useState('playlists'); // 'playlists', 'liked', 'search'
  const [volume, setVolume] = useState(0.8);

  // Audio references
  const audioRef = useRef(null);

  // In production (Vercel), use the Railway backend URL directly.
  // In development, use empty string so Vite proxy handles it.
  const API_BASE = import.meta.env.VITE_API_BASE || 'https://dynamic-analysis-production-cfe8.up.railway.app';

  // Resolved audio stream URL (resolved client-side via Piped API)
  

  // Play/Pause toggle
  const togglePlay = () => {
    if (!activeTrack) return;
    setIsPlaying(!isPlaying);
  };

  // Select a track to play
  const selectTrack = (track) => {
    setActiveTrack(track);
    setIsPlaying(true);
    setCurrentTime(0);
    setDuration(track.duration_secs || 180);
  };

  // Seek audio helper
  const seekTo = (ratio) => {
    if (audioRef.current && duration) {
      const newTime = ratio * duration;
      audioRef.current.seekTo(newTime, 'seconds');
      setCurrentTime(newTime);
    }
  };

  // Handle visualizer/seek bar click for Spotify seek
  const handleSeekClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, x / rect.width));
    seekTo(ratio);
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (newVol > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  // Mute toggle
  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };


  // Search YouTube
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    fetch(`${API_BASE}/api/search?q=${encodeURIComponent(searchQuery)}`)
      .then(res => res.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          setPlaylist(data.results);
          setSearchActive(true);
          setCurrentView('search');
          // Auto select first result
          selectTrack(data.results[0]);
        } else {
          alert("No search results found.");
        }
      })
      .catch(err => {
        console.error("Search error:", err);
        alert("Failed to search. Is the Python backend running?");
      })
      .finally(() => {
        setIsSearching(false);
      });
  };

  // Clear search and return to default Zeppelin playlist without stopping playback
  const clearSearch = () => {
    setPlaylist(INITIAL_RANDOM_PLAYLIST);
    setSearchQuery("");
    setSearchActive(false);
    setCurrentView('playlists');
  };

  const playNext = () => {
    if (playlist.length === 0) return;
    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * playlist.length);
      selectTrack(playlist[randomIndex]);
    } else {
      const index = playlist.findIndex(t => t.id === activeTrack?.id);
      if (index !== -1 && index < playlist.length - 1) {
        selectTrack(playlist[index + 1]);
      } else {
        selectTrack(playlist[0]); // Loop back to start
      }
    }
  };

  const playPrev = () => {
    if (playlist.length === 0) return;
    const index = playlist.findIndex(t => t.id === activeTrack?.id);
    if (index > 0) {
      selectTrack(playlist[index - 1]);
    } else {
      selectTrack(playlist[playlist.length - 1]); // Loop to end
    }
  };

  // Handle audio element updates
  const onEnded = () => {
    if (isReplay) {
      if (audioRef.current) {
        audioRef.current.seekTo(0, 'seconds');
      }
    } else {
      playNext();
    }
  };


  // Format seconds to MM:SS
  const formatTime = (secs) => {
    if (isNaN(secs)) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Find index of current song to render '01', '02' prefix
  const getTrackIndexStr = (index) => {
    return (index + 1) < 10 ? `0${index + 1}` : `${index + 1}`;
  };

  return (
    <div className="app-container">
      {/* Underlying Audio Tag */}
      <ReactPlayer
        ref={audioRef}
        url={activeTrack ? `https://www.youtube.com/watch?v=${activeTrack.id}` : null}
        playing={isPlaying}
        controls={false}
        volume={isMuted ? 0 : volume}
        onProgress={(state) => {
          if (isPlaying) setCurrentTime(state.playedSeconds);
        }}
        onDuration={(dur) => setDuration(dur)}
        onEnded={onEnded}
        onError={(e) => console.error('ReactPlayer error:', e)}
        onReady={() => { if (isPlaying && audioRef.current) audioRef.current.seekTo(0); }}
        width="1px"
        height="1px"
        style={{
          position: 'fixed',
          bottom: '-10px',
          left: '-10px',
          opacity: 0,
          pointerEvents: 'none',
        }}
        config={{
          youtube: {
            playerVars: {
              autoplay: 1,
              playsinline: 1,
              controls: 0,
              disablekb: 1,
              fs: 0,
              modestbranding: 1,
            }
          }
        }}
      />

      {/* LEFT PANEL: Playlist & Profile (Dark Slate) */}
      <div className="left-panel">
        <div className="brand-section">
          <button className="brand-logo-btn" title="EUPHORIA" style={{ background: 'transparent', border: 'none', padding: 0 }}>
            <img src="/logo.png" alt="Logo" style={{ height: '55px', width: 'auto', mixBlendMode: 'multiply' }} />
          </button>
          
          {searchActive && (
            <button 
              className="btn-artwork" 
              style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', marginLeft: '20px' }}
              onClick={clearSearch}
            >
              ← Back to Collection
            </button>
          )}
        </div>

        <div className="nav-links" style={{ marginBottom: '50px' }}>
          <span className={`nav-link ${currentView === 'playlists' ? 'active' : ''}`} onClick={() => setCurrentView('playlists')}>Playlists</span>
          <span className={`nav-link ${currentView === 'liked' ? 'active' : ''}`} onClick={() => { setCurrentView('liked'); setPlaylist(likedSongs); }}>Liked Songs</span>
        </div>

        <div className="playlist-header">
          <h1 className="playlist-title">
            {currentView === 'playlists' ? 'Playlists' : currentView === 'liked' ? 'Liked Songs' : currentView === 'search' ? 'Search Results' : 'Playlists'}
          </h1>
          <button className="repeat-btn" title="Loop playlist"><LoopIcon /></button>
        </div>

        <div className="track-list">
          {playlist.map((track, index) => {
            const isActive = activeTrack && activeTrack.id === track.id;
            return (
              <div 
                key={track.id} 
                className={`track-item ${isActive ? 'active' : ''}`}
                onClick={() => selectTrack(track)}
              >
                <span className="track-num">
                  {getTrackIndexStr(index)}
                </span>
                
                {isActive && (
                  <span className="track-play-indicator">▶</span>
                )}

                <div className="track-cover-container">
                  <TrackCover track={track} className="track-cover" />
                </div>

                <div className="track-details">
                  <span className="track-title">{track.title}</span>
                  <span className="track-subtitle">{track.uploader}</span>
                </div>

                <span className="track-duration">{track.duration}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* CENTER COMPONENT: Spinning Vinyl & Tonearm */}
      <div className="center-player-section">
        <div className="vinyl-assembly">
          {/* Subtle drop shadow backing the rotating record */}
          <div className="vinyl-shadow"></div>

          {/* Concentric grooved record */}
          <div className={`vinyl-disc ${isPlaying ? 'playing' : 'paused'}`}>
            <div className="vinyl-label">
              <div className="vinyl-label-black-background">
                {activeTrack?.svgKey === 'zoso' ? (
                  <svg viewBox="0 0 100 100" className="vinyl-label-icon">
                    <g stroke="rgba(255,255,255,0.4)" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 36 L58 36 L28 70 L64 70" strokeWidth="5" />
                      <circle cx="45" cy="51" r="9" />
                      <path d="M45 42 L45 60" />
                      <path d="M58 48 C58 40 72 40 72 50 C72 60 58 60 58 70 C58 80 72 80 72 74" />
                      <circle cx="80" cy="70" r="5" />
                    </g>
                  </svg>
                ) : activeTrack?.svgKey === 'bonham' ? (
                  <svg viewBox="0 0 100 100" className="vinyl-label-icon">
                    <g stroke="rgba(255,255,255,0.4)" strokeWidth="4" fill="none">
                      <circle cx="50" cy="38" r="19" />
                      <circle cx="36" cy="62" r="19" />
                      <circle cx="64" cy="62" r="19" />
                    </g>
                  </svg>
                ) : activeTrack?.svgKey === 'plant' ? (
                  <svg viewBox="0 0 100 100" className="vinyl-label-icon">
                    <g stroke="rgba(255,255,255,0.4)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="50" cy="50" r="36" />
                      <path d="M32 68 L68 32" strokeWidth="4.5" />
                      <path d="M38 58 Q31 52 38 48 M43 53 Q36 47 43 43 M49 47 Q42 41 49 37 M54 42 Q47 36 54 32" strokeWidth="2" />
                      <path d="M44 50 Q51 54 48 61 M50 44 Q57 48 54 55 M56 38 Q63 42 60 49 M62 32 Q69 36 66 43" strokeWidth="2" />
                    </g>
                  </svg>
                ) : activeTrack?.svgKey === 'jones' ? (
                  <svg viewBox="0 0 100 100" className="vinyl-label-icon">
                    <g stroke="rgba(255,255,255,0.4)" strokeWidth="3.5" fill="none">
                      <circle cx="50" cy="50" r="36" />
                      <path d="M50 16 C34 38 34 62 50 84 C66 62 66 38 50 16 Z" />
                      <path d="M21 67 C47 67 67 55 79 33 C53 33 33 45 21 67 Z" />
                      <path d="M79 67 C53 67 33 55 21 33 C47 33 67 45 79 67 Z" />
                    </g>
                  </svg>
                ) : (
                  <svg viewBox="0 0 100 100" className="vinyl-label-icon">
                    <g stroke="rgba(255,255,255,0.3)" strokeWidth="4" fill="none">
                      <circle cx="50" cy="50" r="24" />
                      <circle cx="50" cy="50" r="10" />
                    </g>
                  </svg>
                )}
              </div>
              <div className="vinyl-label-center-hole"></div>
            </div>
          </div>

          {/* Tonearm overlay rotating based on active play status */}
          <div className={`tonearm-container ${isPlaying ? 'active' : 'inactive'}`}>
            <svg className="tonearm-svg" viewBox="0 0 120 250" fill="none">
              {/* Arm Pivot Base */}
              <circle cx="95" cy="35" r="18" fill="#2c2d30" stroke="#4a4c50" strokeWidth="2" />
              <circle cx="95" cy="35" r="8" fill="#131416" />
              
              {/* Counterweight */}
              <rect x="88" y="5" width="14" height="15" rx="2" fill="#555" />
              
              {/* Metal Tone Arm Stem */}
              <path 
                d="M95 35 Q90 100 65 140 T45 200" 
                stroke="url(#metallic-gradient)" 
                strokeWidth="6" 
                strokeLinecap="round" 
                fill="none" 
              />
              
              {/* Small bend attachment */}
              <path 
                d="M45 200 L32 215" 
                stroke="#333" 
                strokeWidth="4" 
                fill="none" 
              />

              {/* Headshell & Cartridge Needle */}
              <rect x="23" y="210" width="12" height="20" rx="1" transform="rotate(-15 23 210)" fill="#111" />
              <polygon points="20,225 24,227 22,232" fill="#888" />

              {/* Metallic Silver Gradient Definition */}
              <defs>
                <linearGradient id="metallic-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="30%" stopColor="#b5b8bd" />
                  <stop offset="70%" stopColor="#686b70" />
                  <stop offset="100%" stopColor="#a3a7ad" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: Search, Info & Album Artwork (Cream/Beige) */}
      <div className="right-panel">
        <div className="right-header">
          <div className="header-actions">
            {/* Search Box */}
            <form onSubmit={handleSearchSubmit} className="search-container">
              <div className="search-input-wrapper">
                <SearchIcon />
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder={isSearching ? "Searching..." : "Search YouTube..."} 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  disabled={isSearching}
                />
              </div>
            </form>
            



          </div>
        </div>

        {/* Album Artwork & Description Card */}
        <div className="album-details-container">
          <div className="album-artwork-row">
            <div className="album-cover-card" onClick={() => setShowArtworkModal(true)} style={{ cursor: 'pointer' }} title="View full artwork">
              <TrackCover track={activeTrack} />
            </div>
            {/* Mock next cover card for aesthetic overlap in the UI */}
            <div className="album-cover-card-next">
              {playlist.length > 0 && (
                <TrackCover 
                  track={playlist[(playlist.findIndex(t => t.id === activeTrack.id) + 1) % playlist.length]} 
                />
              )}
            </div>
          </div>

          <span className="artist-name">
            {activeTrack ? activeTrack.uploader : "Led Zeppelin"}
          </span>
          
          <div className="album-meta-row">
            <div className="album-name-wrapper">
              <h2 className="album-title">
                Album: {activeTrack ? activeTrack.title : "Mothership"}
              </h2>
            </div>
          </div>

          <span className="album-year">2007</span>

          <div className="info-section">
            <h3 className="info-title">Info</h3>
            <p className="info-text">
              {activeTrack ? activeTrack.description : "No description available for this track."}
            </p>
          </div>

          {/* Action buttons below info */}
          <div className="track-action-row">
            <button 
              className="like-btn" 
              title="Like song"
              onClick={() => {
                if (!activeTrack) return;
                if (likedSongs.some(t => t.id === activeTrack.id)) {
                  setLikedSongs(likedSongs.filter(t => t.id !== activeTrack.id));
                } else {
                  setLikedSongs([...likedSongs, activeTrack]);
                }
              }}
            >
              {activeTrack && likedSongs.some(t => t.id === activeTrack.id) ? <HeartFilledIcon /> : <HeartIcon />}
            </button>
            <button 
              className="add-to-playlist-btn" 
              title="Add to Playlist"
              onClick={() => {
                if (!activeTrack) return;
                if (!playlist.some(t => t.id === activeTrack.id)) {
                  setPlaylist([...playlist, activeTrack]);
                }
              }}
            >
              <AddToPlaylistIcon /> <span className="add-playlist-text">Add to Playlist</span>
            </button>
          </div>
        </div>
      </div>

      {/* SPOTIFY-STYLE FLOATING PLAYBACK CONTROLS BAR */}
      <div className="spotify-playback-bar">
        
        {/* Left: Now Playing Info */}
        <div className="spotify-now-playing">
          {activeTrack && (
            <>
              <img src={activeTrack.thumbnail} alt="Track Art" className="spotify-track-art" />
              <div className="spotify-track-info">
                <span className="spotify-track-title">{activeTrack.title}</span>
                <span className="spotify-track-artist">{activeTrack.uploader}</span>
              </div>
              <button 
                className="spotify-like-btn" 
                title="Like song"
                onClick={() => {
                  if (likedSongs.some(t => t.id === activeTrack.id)) {
                    setLikedSongs(likedSongs.filter(t => t.id !== activeTrack.id));
                  } else {
                    setLikedSongs([...likedSongs, activeTrack]);
                  }
                }}
              >
                {likedSongs.some(t => t.id === activeTrack.id) ? <HeartFilledIcon /> : <HeartIcon />}
              </button>
            </>
          )}
        </div>

        {/* Center: Playback Controls & Progress */}
        <div className="spotify-player-center">
          <div className="spotify-player-controls">
            <button 
              className={`spotify-control-btn ${isShuffle ? 'active' : ''}`}
              onClick={() => setIsShuffle(!isShuffle)}
              title="Shuffle"
            >
              <ShuffleIcon active={isShuffle} />
            </button>
            
            <button className="spotify-control-btn" title="Previous" onClick={playPrev}>
              <PrevIcon />
            </button>
            
            <button className="spotify-play-btn" onClick={togglePlay}>
              {isPlaying ? (
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" style={{ marginLeft: '4px' }}>
                  <path d="M7 4v16l13-8z" />
                </svg>
              )}
            </button>

            <button className="spotify-control-btn" title="Next" onClick={playNext}>
              <NextIcon />
            </button>
            
            <button 
              className={`spotify-control-btn ${isReplay ? 'active' : ''}`}
              onClick={() => setIsReplay(!isReplay)}
              title="Replay"
            >
              <ReplayIcon active={isReplay} />
            </button>
          </div>

          <div className="spotify-progress-container">
            <span className="spotify-time">{formatTime(currentTime)}</span>
            <div className="spotify-progress-bar-bg" onClick={handleSeekClick}>
              <div 
                className="spotify-progress-bar-fill" 
                style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
              >
                <div className="spotify-progress-knob"></div>
              </div>
            </div>
            <span className="spotify-time">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right: Volume & Extra Controls */}
        <div className="spotify-extra-controls">
          <button
            onClick={toggleMute}
            className="spotify-control-btn"
            title={isMuted ? 'Unmute' : 'Mute'}
            style={{ padding: '4px', display: 'flex', alignItems: 'center' }}
          >
            {isMuted ? <VolumeMuteIcon /> : <VolumeIcon />}
          </button>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={isMuted ? 0 : volume} 
            onChange={handleVolumeChange} 
            className="spotify-volume-slider"
          />
        </div>
      </div>

      {/* ARTWORK HIGH-RES PREVIEW MODAL */}
      {showArtworkModal && (
        <div className="artwork-modal-overlay" onClick={() => setShowArtworkModal(false)}>
          <div className="artwork-modal-content" onClick={e => e.stopPropagation()}>
            <button className="artwork-modal-close" onClick={() => setShowArtworkModal(false)}>×</button>
            <img 
              src={activeTrack ? activeTrack.thumbnail.replace("hqdefault", "maxresdefault") : ""} 
              alt="High Resolution Artwork" 
              className="artwork-modal-img"
              onError={(e) => {
                // Fallback if maxresdefault doesn't exist
                e.target.src = activeTrack.thumbnail;
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
