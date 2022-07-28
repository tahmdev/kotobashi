import React from "react";
import styles from "../../styles/Kotobashi.module.css";

interface Props {
  guess: string;
  chain: string[];
}
export const KBGuess: React.FC<Props> = ({ guess, chain }) => {
  const hiddenChain = chain.filter(
    (_, idx) => idx !== 0 && idx !== chain.length - 1
  );
  if (hiddenChain.includes(guess))
    return (
      <div className={styles.guess}>
        <span className={styles.correctGuess}> {guess} </span>
      </div>
    );
  return (
    <div className={styles.guess}>
      {guess.split("").map((kanji, idx) => {
        return (
          <span
            className={
              hiddenChain.some((el) => el.includes(kanji))
                ? styles.goodGuess
                : ""
            }
            key={idx}
          >
            {kanji}
          </span>
        );
      })}
    </div>
  );
};
