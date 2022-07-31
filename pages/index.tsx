import type { NextPage } from "next";
import styles from "../styles/Kotobashi.module.css";
import KBMain from "../components/kotobashi/main";

// CHANGE TOP LEFT LINK TO JUST TEXT

const Home: NextPage = () => {
  return (
    <div className={`container ${styles.kotobashiWrapper} `}>
      <KBMain />
    </div>
  );
};

export default Home;
