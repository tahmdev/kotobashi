import React from "react";

interface Props {
  length: string;
  chain: string[];
  free: boolean;
  setFree: React.Dispatch<React.SetStateAction<boolean>>;
  setGuesses: React.Dispatch<React.SetStateAction<string[]>>;
  setDifficulty: React.Dispatch<React.SetStateAction<string>>;
  setLength: React.Dispatch<React.SetStateAction<string>>;
  getChain: () => void;
}
export const KBControls: React.FC<Props> = ({
  length,
  chain,
  free,
  setFree,
  setGuesses,
  setDifficulty,
  setLength,
  getChain,
}) => {
  return (
    <div>
      {["Easy", "Medium", "Hard"].map((el) => (
        <button key={el} onClick={() => setDifficulty(el.toLowerCase())}>
          {el}
        </button>
      ))}
      <button onClick={() => setFree(!free)}>Free</button>
      {free && (
        <div>
          <button onClick={() => setGuesses(chain)}>solve</button>
          <button onClick={getChain}>new</button>
          <input
            type="range"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            min={4}
            max={50}
          />
        </div>
      )}
    </div>
  );
};
