import React from "react";
import styles from "../../styles/Kotobashi.module.css";

interface Props {
  word: string;
  solved: boolean;
}
export const KBField: React.FC<Props> = ({ word, solved }) => {
  if (solved)
    return <div className={`${styles.field} ${styles.solved} `}> {word} </div>;

  return <div className={`${styles.field} unselectable `}>罠罠</div>;
};
