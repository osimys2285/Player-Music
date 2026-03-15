import { useNavigate } from 'react-router-dom'

function PlaylistCard({ playlist }) {
  const navigate = useNavigate()

  return (
    <div className="playlist-card" onClick={() => navigate(`/playlist/${playlist.id}`)}>
      <div className="playlist-card__cover">
        {playlist.cover
          ? <img src={playlist.cover} alt={playlist.title} />
          : <span className="playlist-card__icon">🎵</span>
        }
      </div>
      <span className="playlist-card__title">{playlist.title}</span>
    </div>
  )
}

export default PlaylistCard
