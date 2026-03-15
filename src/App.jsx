import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PlayerProvider } from './context/PLayerContext'
import Player from './components/PLayer'
import NotFound from './pages/NotFound'
import './App.css'

export default function App() {
  return (
    <PlayerProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"              element={<Player />} />
          <Route path="/player"        element={<Player />} />
          <Route path="/playlist/:id"  element={<Player />} />
          <Route path="*"              element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </PlayerProvider>
  )
}