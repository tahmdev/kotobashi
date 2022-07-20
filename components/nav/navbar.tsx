import React from "react";
import styles from "../../styles/Navbar.module.css";
import { Navlink } from "./Navlink";

interface Props {}
export const Navbar: React.FC<Props> = () => {
  return (
    <nav className={styles.nav}>
      <h1>
        <Navlink href="/" label="Kotobashi" />
      </h1>
      <ul>
        <li>
          <Navlink href="/aaa" label="Link 1" />
        </li>
        <li>
          <Navlink href="/b" label="Link 2" />
        </li>
      </ul>
    </nav>
  );
};
