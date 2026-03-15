import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";

const PLayerContext = createContext();

export function PlayerProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(new Audio());

  const playTrack = useCallback((track, tracks) => {
    setCurrentTrack(track);
    setPlaylist(tracks);
    setIsPlaying(true);
    setProgress(0);
  }, []);

  const togglePlay = useCallback(() => setIsPlaying((p) => !p), []);

  const nextTrack = useCallback(() => {
    setPlaylist((pl) => {
      setCurrentTrack((curr) => {
        const idx = pl.findIndex((t) => t.id === curr?.id);
        return pl[idx + 1] || curr;
      });
      return pl;
    });
    setProgress(0);
  }, []);

  const prevTrack = useCallback(() => {
    setPlaylist((pl) => {
      setCurrentTrack((curr) => {
        const idx = pl.findIndex((t) => t.id === curr?.id);
        return pl[idx - 1] || curr;
      });
      return pl;
    });
    setProgress(0);
  }, []);

  const seek = useCallback((percent) => {
    const audio = audioRef.current;
    audio.currentTime = (percent / 100) * audio.duration;
    setProgress(percent);
  }, []);

  useEffect(() => {
    if (!currentTrack?.src) return;
    audioRef.current.src = currentTrack.src;
    if (isPlaying) audioRef.current.play();
  }, [currentTrack]);

  useEffect(() => {
    if (isPlaying) audioRef.current.play();
    else audioRef.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    const onTimeUpdate = () =>
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => nextTrack();

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, [nextTrack]);

  return (
    <PLayerContext.Provider
      value={{
        currentTrack, playlist, isPlaying, volume, progress, duration,
        setVolume, playTrack, togglePlay, nextTrack, prevTrack, seek,
      }}
    >
      {children}
    </PLayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PLayerContext);
