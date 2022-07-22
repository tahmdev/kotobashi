import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { InputWithButton } from "../components/general/inputWithButton";
import { KBField } from "../components/kotobashi/field";
import { KBGuess } from "../components/kotobashi/guess";
import styles from "../styles/Kotobashi.module.css";

const Home: NextPage = () => {
  const [chain, setChain] = useState<string[] | null>();
  const [guesses, setGuesses] = useState<string[]>([]);
  useEffect(() => {
    getChain();
  }, []);

  const getChain = () => {
    fetch("/api/kotobashi/chain/6")
      .then((res) => res.json())
      .then((json) => setChain(json.chain));
    setGuesses([]);
  };

  const addGuess = (guess: string) => {
    setGuesses((prev) => [...prev, guess]);
  };
  return (
    <div className={`container ${styles.kotobashiWrapper} `}>
      <button onClick={getChain}>aaa</button>

      <div className={styles.fieldWrapper}>
        {chain?.map((el, idx) => (
          <KBField
            word={el}
            solved={
              guesses.includes(el) || idx === 0 || idx === chain.length - 1
            }
            key={el}
          />
        ))}
      </div>
      <div className={styles.guesses}>
        {chain &&
          guesses.map((el, idx) => (
            <KBGuess guess={el} key={idx} chain={chain} />
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
