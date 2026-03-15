import { useState, useEffect } from 'react'
import { usePlayer } from '../context/PLayerContext'
import ProgressBar from './ProgressBar'
import '../css/Player.css'

const PLAYLISTS = [
  { id: 1, query: 'the weeknd',     title: 'The Weeknd' },
  { id: 2, query: 'kendrick lamar', title: 'Kendrick Lamar' },
  { id: 3, query: 'lo-fi chill',    title: 'Lo-Fi Chill' },
]

function formatTime(sec) {
  if (!sec || isNaN(sec)) return '0:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

// ——— Вкладка: список плейлистов ———
function PlaylistsTab({ onSelect }) {
  return (
    <div className="tab-playlists">
      {PLAYLISTS.map(p => (
        <div key={p.id} className="playlist-item" onClick={() => onSelect(p)}>
          <div className="playlist-item__cover">🎵</div>
          <span className="playlist-item__title">{p.title}</span>
        </div>
      ))}
    </div>
  )
}

// ——— Вкладка: треки плейлиста ———
function TracksTab({ playlist, onBack }) {
  const [tracks, setTracks] = useState([])
  const [loading, setLoading] = useState(false)
  const { currentTrack, isPlaying, playTrack, togglePlay } = usePlayer()

  useEffect(() => {
    setLoading(true)
    fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(playlist.query)}&entity=song&limit=10`)
      .then(r => r.json())
      .then(data => setTracks(data.results.map(t => ({
        id:       t.trackId,
        title:    t.trackName,
        artist:   t.artistName,
        duration: Math.floor(t.trackTimeMillis / 1000),
        cover:    t.artworkUrl100,
        src:      t.previewUrl,
      }))))
      .finally(() => setLoading(false))
  }, [playlist.query])

  return (
    <div className="tab-tracks">
      <button className="back-btn" onClick={onBack}>← Назад</button>
      <h3>{playlist.title}</h3>
      {loading && <div className="loading">Загрузка...</div>}
      {tracks.map((t, i) => {
        const isActive = currentTrack?.id === t.id
        return (
          <div key={t.id}
            className={`track-item ${isActive ? 'track-item--active' : ''}`}
            onClick={() => isActive ? togglePlay() : playTrack(t, tracks)}>
            <span className="track-item__index">
              {isActive ? (isPlaying ? '▶' : '⏸') : i + 1}
            </span>
            <img className="track-item__cover" src={t.cover} alt="" />
            <div className="track-item__info">
              <span className="track-item__title">{t.title}</span>
              <span className="track-item__artist">{t.artist}</span>
            </div>
            <span className="track-item__duration">{formatTime(t.duration)}</span>
          </div>
        )
      })}
    </div>
  )
}

// ——— Вкладка: плеер ———
function PlayerTab() {
  const {
    currentTrack, isPlaying, togglePlay,
    nextTrack, prevTrack,
    progress, duration, seek,
    volume, setVolume,
    playlist, playTrack,
  } = usePlayer()

  const currentTime = (progress / 100) * duration
  const currentIdx = playlist.findIndex(t => t.id === currentTrack?.id)
  const nextTracks = playlist.slice(currentIdx + 1, currentIdx + 4)

  if (!currentTrack) return (
    <div className="player-empty">Выбери трек из плейлиста</div>
  )

  return (
    <div className="tab-player">
      <div className="tab-player__cover-wrap">
        {currentTrack.cover
          ? <img src={currentTrack.cover} alt="" />
          : <span>🎵</span>
        }
      </div>

      <div className="tab-player__info">
        <span className="tab-player__title">{currentTrack.title}</span>
        <span className="tab-player__artist">{currentTrack.artist}</span>
      </div>

      <div className="tab-player__progress">
        <span>{formatTime(currentTime)}</span>
        <ProgressBar />
        <span>{formatTime(duration)}</span>
      </div>

      <div className="tab-player__controls">
        <button onClick={prevTrack}>⏮</button>
        <button className="tab-player__play" onClick={togglePlay}>
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button onClick={nextTrack}>⏭</button>
      </div>

      <div className="tab-player__volume">
        🔊
        <input type="range" min={0} max={1} step={0.01}
          value={volume} onChange={e => setVolume(Number(e.target.value))} />
      </div>

      {nextTracks.length > 0 && (
        <div className="tab-player__queue">
          <span className="tab-player__queue-label">Далее в плейлисте</span>
          {nextTracks.map(t => (
            <div key={t.id} className="queue-track" onClick={() => playTrack(t, playlist)}>
              <img src={t.cover} alt="" />
              <div>
                <span>{t.title}</span>
                <span>{t.artist}</span>
              </div>
              <span>{formatTime(t.duration)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ——— Главный компонент ———
export default function Player() {
  const [tab, setTab] = useState('playlists')         // 'playlists' | 'tracks' | 'player'
  const [activePlaylist, setActivePlaylist] = useState(null)

  function openPlaylist(p) {
    setActivePlaylist(p)
    setTab('tracks')
  }

  return (
    <div className="card">
      {/* Header */}
      <div className="card__header">
        <span className="card__logo">Music Player</span>
        <div className="card__tabs">
          <button
            className={`card__tab ${tab !== 'player' ? 'card__tab--active' : ''}`}
            onClick={() => setTab(activePlaylist ? 'tracks' : 'playlists')}>
            Плейлисты
          </button>
          <button
            className={`card__tab ${tab === 'player' ? 'card__tab--active' : ''}`}
            onClick={() => setTab('player')}>
            Плеер
          </button>
        </div>
      </div>

      {/* Контент */}
      <div className="card__body">
        {tab === 'playlists' && <PlaylistsTab onSelect={openPlaylist} />}
        {tab === 'tracks'    && <TracksTab playlist={activePlaylist} onBack={() => setTab('playlists')} />}
        {tab === 'player'    && <PlayerTab />}
      </div>
    </div>
  )
}