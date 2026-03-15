import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import TrackCard from '../components/TrackCard'

const PLAYLISTS = [
  { id: 1, query: 'the weeknd',     title: 'The Weeknd' },
  { id: 2, query: 'kendrick lamar', title: 'Kendrick Lamar' },
  { id: 3, query: 'lo-fi chill',    title: 'Lo-Fi Chill' },
]

function Playlist() {
  const { id } = useParams()
  const navigate = useNavigate()
  const genre = PLAYLISTS.find(g => g.id === Number(id))
  const [tracks, setTracks] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!genre) return
    setLoading(true)
    fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(genre.query)}&entity=song&limit=10`)
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
  }, [genre?.query])

  if (loading) return <div className="loading">Загрузка...</div>

  return (
    <div className="playlist-page">
      <button className="back-btn" onClick={() => navigate('/')}>← Назад</button>
      <h2>{genre?.title}</h2>
      <div className="track-list">
        {tracks.map((track, i) => (
          <TrackCard key={track.id} track={track} playlist={tracks} index={i + 1} />
        ))}
      </div>
    </div>
  )
}

export default Playlist
