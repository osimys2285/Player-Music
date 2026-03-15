import PlaylistCard from '../components/PlayListCard'

const PLAYLISTS = [
  { id: 1, query: 'the weeknd',     title: 'The Weeknd',     cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/7e/0e/3e/7e0e3e3e-3e3e-3e3e-3e3e-3e3e3e3e3e3e/source/100x100bb.jpg' },
  { id: 2, query: 'kendrick lamar', title: 'Kendrick Lamar', cover: '' },
  { id: 3, query: 'lo-fi chill',    title: 'Lo-Fi Chill',    cover: '' },
]

export { PLAYLISTS }

function Home() {
  return (
    <div className="home">
      <h1>Плейлисты</h1>
      <div className="playlists-grid">
        {PLAYLISTS.map(p => (
          <PlaylistCard key={p.id} playlist={p} />
        ))}
      </div>
    </div>
  )
}

export default Home
