import React, { useEffect, useState } from "react";
import styles from "../../styles/Kotobashi.module.css";

interface Props {
  chain: string[];
  free: boolean;
  difficulty: string;
  setFree: React.Dispatch<React.SetStateAction<boolean>>;
  setGuesses: React.Dispatch<React.SetStateAction<string[]>>;
  setDifficulty: React.Dispatch<React.SetStateAction<string>>;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  getChain: () => void;
}
export const KBControls: React.FC<Props> = ({
  chain,
  free,
  difficulty,
  setFree,
  setGuesses,
  setDifficulty,
  getChain,
  setUrl,
}) => {
  const [length, setLength] = useState("4");

  useEffect(() => {
    if (!free) {
      setUrl(`/api/kotobashi/daily/${difficulty}`);
    } else {
      setUrl(`/api/kotobashi/free/${difficulty}/${length || 4}`);
    }
  }, [length, difficulty, free]);

  const solve = () => {
    const hiddenChain = chain.filter(
      (_, idx) => idx !== 0 && idx !== chain.length - 1
    );
    setGuesses(hiddenChain);
  };
  return (
    <div className={styles.controlsWrapper}>
      <div className={styles.buttonWrapper}>
        {["Easy", "Medium", "Hard"].map((el) => (
          <button
            className={
              difficulty === el.toLocaleLowerCase()
                ? styles.activeDifficulty
                : ""
            }
            key={el}
            onClick={() => setDifficulty(el.toLowerCase())}
          >
            {el}
          </button>
        ))}
        <button onClick={() => setFree(!free)}>
          {free ? "Daily" : "Free"}
        </button>
      </div>

      {free && (
        <div className={styles.freeControls}>
          <div>
            <button onClick={getChain}>New</button>
            <button onClick={solve}>Solve</button>
          </div>
          <label>
            <span> Length: </span>
            <input
              type="number"
              max={50}
              min={4}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
          </label>
        </div>
      )}
    </div>
  );
};
