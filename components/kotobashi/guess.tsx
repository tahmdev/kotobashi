import React from "react";
import styles from "../../styles/Kotobashi.module.css";

interface Props {
  guess: string;
  chain: string[];
}
export const KBGuess: React.FC<Props> = ({ guess, chain }) => {
  if (chain.includes(guess))
    return (
      <div className={styles.guess}>
        <span className={styles.correctGuess}> {guess} </span>
      </div>
    );
  return (
    <div className={styles.guess}>
      {guess.split("").map((el) => {
        if (chain.some((chainEl) => chainEl.includes(el)))
          return <span className={styles.goodGuess}> {el} </span>;
        return <span> {el} </span>;
      })}
    </div>
  );
};
