import { useEffect, useState } from "react";
import { KBField } from "../../components/kotobashi/field";
import { KBControls } from "../../components/kotobashi/controls";
import styles from "../../styles/Kotobashi.module.css";
import useLocalStorage from "../../hooks/useLocalStorage";
import { KBStats } from "../../components/kotobashi/stats";
import { KBGuessesAndInput } from "./guesses-and-input";

// CHANGE TOP LEFT LINK TO JUST TEXT

const KBMain: React.FC = () => {
  const [chain, setChain] = useState<string[]>([]);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState("easy");
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
      <button onClick={() => setChain(["何何", "何何", "何何", "何何"])}>
        aaaa
      </button>
      <KBControls
        chain={chain}
        free={free}
        difficulty={difficulty}
        getChain={getChain}
        setDifficulty={setDifficulty}
        setFree={setFree}
        setGuesses={setGuesses}
        setUrl={setUrl}
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

      <KBGuessesAndInput
        free={free}
        guesses={guesses}
        local={local}
        setGuesses={setGuesses}
        setLocal={setLocal}
        solved={solved}
        chain={chain}
        difficulty={difficulty}
      />

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

export default KBMain;

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
