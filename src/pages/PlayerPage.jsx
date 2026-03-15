import { usePlayer } from '../context/PLayerContext'
import '../css/PlayerPage.css'

function formatTime(sec) {
  if (!sec || isNaN(sec)) return '0:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

function PlayerPage() {
  const {
    currentTrack, isPlaying, togglePlay,
    nextTrack, prevTrack,
    progress, seek,
    volume, setVolume,
    duration,
  } = usePlayer()

  const currentTime = (progress / 100) * duration

  if (!currentTrack) return <div className="player-page__empty">Ничего не играет</div>

  return (
    <div className="player-page">
      <img className="player-page__cover" src={currentTrack.cover} alt="" />
      <h2 className="player-page__title">{currentTrack.title}</h2>
      <p className="player-page__artist">{currentTrack.artist}</p>

      <input
        className="player-page__seek"
        type="range" min={0} max={100}
        value={progress}
        onChange={e => seek(Number(e.target.value))}
      />
      <div className="time">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <div className="player-page__controls">
        <button onClick={prevTrack}>⏮</button>
        <button className="player-page__play" onClick={togglePlay}>
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button onClick={nextTrack}>⏭</button>
      </div>

      <div className="player-page__volume">
        🔊
        <input
          type="range" min={0} max={1} step={0.01}
          value={volume}
          onChange={e => setVolume(Number(e.target.value))}
        />
      </div>
    </div>
  )
}

export default PlayerPage
