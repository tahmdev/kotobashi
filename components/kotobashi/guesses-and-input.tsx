import React, { useEffect } from "react";
import { InputWithButton } from "../../components/general/inputWithButton";
import { KBGuess } from "../../components/kotobashi/guess";
import styles from "../../styles/Kotobashi.module.css";
import arraysEqual from "../../utils/arraysEqual";
import isOnlyKanji from "../../utils/isOnlyKanji";

interface Props {
  chain: string[];
  guesses: string[];
  difficulty: string;
  local: any;
  solved: boolean;
  free: boolean;
  setLocal: React.Dispatch<React.SetStateAction<any>>;
  setGuesses: React.Dispatch<React.SetStateAction<string[]>>;
}
export const KBGuessesAndInput: React.FC<Props> = ({
  chain,
  guesses,
  difficulty,
  local,
  solved,
  free,
  setLocal,
  setGuesses,
}) => {
  useEffect(() => {
    if (!chain.length) return;
    if (free || isNewDay()) {
      setGuesses([]);
    }
    if (isNewDay()) {
      setLocal({
        ...local,
        [difficulty]: { chain, guesses: [], solved: false },
      });
    } else {
      setGuesses(local[difficulty].guesses);
    }
  }, [chain]);

  const isNewDay = () => {
    return !arraysEqual(chain, local[difficulty].chain);
  };

  const addGuess = (guess: string) => {
    if (isOnlyKanji(guess) && guess.length === 2 && !guesses.includes(guess)) {
      if (!free) {
        let newLocal = { ...local };
        newLocal[difficulty] = {
          chain: local[difficulty].chain,
          guesses: [...guesses, guess],
          solved,
        };
        setLocal(newLocal);
      }
      setGuesses((prev) => [...prev, guess]);
    }
  };
  return (
    <div>
      <div className={styles.guesses}>
        {chain &&
          guesses.map((el, idx) => (
            <KBGuess guess={el} chain={chain} key={idx} />
          ))}
      </div>

      <div>
        <InputWithButton
          disabled={solved}
          formClass={styles.inputForm}
          onSend={addGuess}
        >
          Guess
        </InputWithButton>
      </div>
    </div>
  );
};
