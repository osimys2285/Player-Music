import { memo, useCallback } from "react";
import { usePlayer } from "../context/PLayerContext";

function formatTime(sec) {
  if (!sec || isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function TrackCard({ track, playlist, index }) {
  const { currentTrack, isPlaying, playTrack, togglePlay } = usePlayer();
  const isActive = currentTrack?.id === track.id;

  const handleClick = useCallback(() => {
    isActive ? togglePlay() : playTrack(track, playlist);
  }, [isActive, track, playlist, togglePlay, playTrack]);

  return (
    <div
      className={`track-card ${isActive ? "track-card--active" : ""}`}
      onClick={handleClick}
    >
      <span className="track-card__index">
        {isActive ? (isPlaying ? "▶" : "⏸") : index}
      </span>
      <img className="track-card__cover" src={track.cover} alt="" />
      <div className="track-card__info">
        <span className="track-card__title">{track.title}</span>
        <span className="track-card__artist">{track.artist}</span>
      </div>
      <span className="track-card__duration">{formatTime(track.duration)}</span>
    </div>
  );
}

export default memo(TrackCard);
