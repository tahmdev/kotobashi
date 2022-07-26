import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { InputWithButton } from "../components/general/inputWithButton";
import { KBField } from "../components/kotobashi/field";
import { KBGuess } from "../components/kotobashi/guess";
import styles from "../styles/Kotobashi.module.css";
import isOnlyKanji from "../utils/isOnlyKanji";
import useLocalStorage from "../hooks/useLocalStorage";

//Daily/free button text toggle
// Track stats: You solved X easy puzzles. Your average amount of guesses is Y
// Save guesses for current puzzle in local storage
// if localstorage.difficulty === JSON.stringify(chain) {setGuesses()}

const Home: NextPage = () => {
  const [chain, setChain] = useState<string[]>([]);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState("easy");
  const [length, setLength] = useState("4");
  const [free, setFree] = useState(false);
  const [url, setUrl] = useState("/api/kotobashi/daily/easy");
  const [local, setLocal] = useLocalStorage("kotobashi", {
    easy: { chain: [], guesses: [] },
    medium: { chain: [], guesses: [] },
    hard: { chain: [], guesses: [] },
    totalSolved: 0,
    averageGuesses: 0,
  });

  useEffect(() => {
    getChain();
  }, [url]);

  const getChain = () => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => setChain(json.chain));
    setGuesses([]);
  };

  useEffect(() => {
    if (!free && chain.length) {
      if (!chain.every((el) => local[difficulty].chain.includes(el))) {
        setLocal({ ...local, [difficulty]: { chain, guesses: [] } });
        setGuesses([]);
      } else {
        setGuesses(local[difficulty].guesses);
      }
    }
  }, [chain]);

  const addGuess = (guess: string) => {
    if (isOnlyKanji(guess) && guess.length === 2) {
      setGuesses((prev) => [...prev, guess]);
      setLocal({
        ...local,
        [difficulty]: {
          chain: local[difficulty].chain,
          guesses: [...guesses, guess],
        },
      });
    }
  };

  useEffect(() => {
    if (!free) {
      setUrl(`/api/kotobashi/daily/${difficulty}`);
    } else {
      setUrl(`/api/kotobashi/free/${difficulty}/${length}`);
    }
  }, [length, difficulty, free]);

  return (
    <div className={`container ${styles.kotobashiWrapper} `}>
      <div>
        {["Easy", "Medium", "Hard"].map((el) => (
          <button
            key={el}
            onClick={() => setDifficulty(el.toLocaleLowerCase())}
          >
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
        <InputWithButton formClass={styles.inputForm} onSend={addGuess}>
          Guess
        </InputWithButton>
      </div>
    </div>
  );
};

export default Home;
