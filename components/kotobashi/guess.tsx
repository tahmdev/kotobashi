import React from "react";
import styles from "../../styles/Kotobashi.module.css";

interface Props {
  guess: string;
  chain: string[];
}
export const KBGuess: React.FC<Props> = ({ guess, chain }) => {
  const hiddenChain = chain.filter(
    (el, idx) => idx !== 0 && idx !== chain.length - 1
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
        if (hiddenChain.some((el) => el.includes(kanji)))
          return (
            <span className={styles.goodGuess} key={idx}>
              {kanji}
            </span>
          );
        return <span key={idx}> {kanji} </span>;
      })}
    </div>
  );
};
