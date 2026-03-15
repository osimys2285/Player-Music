import { usePlayer } from "../context/PLayerContext";

function ProgressBar() {
  const { progress, seek } = usePlayer();

  return (
    <input
      className="progress-bar"
      type="range"
      min={0}
      max={100}
      value={progress}
      onChange={(e) => seek(Number(e.target.value))}
    />
  );
}

export default ProgressBar;
