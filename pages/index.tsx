import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { InputWithButton } from "../components/general/inputWithButton";
import { KBField } from "../components/kotobashi/field";
import { KBGuess } from "../components/kotobashi/guess";
import { KBControls } from "../components/kotobashi/controls";
import styles from "../styles/Kotobashi.module.css";
import isOnlyKanji from "../utils/isOnlyKanji";
import useLocalStorage from "../hooks/useLocalStorage";
import { KBStats } from "../components/kotobashi/stats";

//Daily/free button text toggle
// Track stats: You solved X easy puzzles. Your average amount of guesses is Y
// Don't allow double guesses
// LABEL RANGE

const Home: NextPage = () => {
  const [chain, setChain] = useState<string[]>([]);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState("easy");
  const [length, setLength] = useState("4");
  const [free, setFree] = useState(false);
  const [url, setUrl] = useState("/api/kotobashi/daily/easy");
  const [local, setLocal] = useLocalStorage("kotobashi", initLocal);
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    getChain();
  }, [url]);

  const getChain = () => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => setChain(json.chain));
  };

  useEffect(() => {
    if (!free && chain.length) {
      if (!chain.every((el) => local[difficulty].chain.includes(el))) {
        setLocal({
          ...local,
          [difficulty]: { chain, guesses: [], solved: false },
        });
        setGuesses([]);
      } else {
        setGuesses(local[difficulty].guesses);
      }
    } else {
      setGuesses([]);
    }
  }, [chain]);

  useEffect(() => {
    if (!free) {
      setUrl(`/api/kotobashi/daily/${difficulty}`);
    } else {
      setUrl(`/api/kotobashi/free/${difficulty}/${length}`);
    }
  }, [length, difficulty, free]);

  const addGuess = (guess: string) => {
    if (isOnlyKanji(guess) && guess.length === 2) {
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

  useEffect(() => {
    if (chain.length && isSolved()) {
      if (!free) {
        if (!local[difficulty].solved) {
          let newLocal = { ...local };
          newLocal.stats[difficulty].totalGuesses += guesses.length;
          newLocal.stats[difficulty].totalSolved++;
          newLocal[difficulty].solved = true;
          setLocal(newLocal);
        }
      }
      setSolved(true);
    } else {
      setSolved(false);
    }
  }, [guesses]);

  const isSolved = () => {
    const hiddenChain = chain.filter(
      (_, idx) => idx !== 0 && idx !== chain.length - 1
    );
    return hiddenChain.every((el) => guesses.includes(el));
  };

  return (
    <div className={`container ${styles.kotobashiWrapper} `}>
      <KBControls
        length={length}
        chain={chain}
        free={free}
        getChain={getChain}
        setDifficulty={setDifficulty}
        setFree={setFree}
        setGuesses={setGuesses}
        setLength={setLength}
      />

      <div className={styles.fieldWrapper}>
        {chain?.map((el, idx) => (
          <KBField
            word={el}
            solved={
              guesses.includes(el) || idx === 0 || idx === chain.length - 1
            }
            key={idx}
          />
        ))}
      </div>
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

      <div>
        {local && solved && (
          <KBStats
            difficulty={difficulty}
            stats={local.stats}
            free={free}
            guesses={guesses}
          />
        )}
      </div>
    </div>
  );
};

export default Home;

const initLocal = {
  easy: { chain: [], guesses: [], solved: false },
  medium: { chain: [], guesses: [], solved: false },
  hard: { chain: [], guesses: [], solved: false },
  stats: {
    easy: {
      totalSolved: 0,
      totalGuesses: 0,
    },
    medium: {
      totalSolved: 0,
      totalGuesses: 0,
    },
    hard: {
      totalSolved: 0,
      totalGuesses: 0,
    },
  },
};
