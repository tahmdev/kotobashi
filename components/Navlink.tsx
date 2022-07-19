import Link from "next/link";
import React from "react";
import styles from "../styles/Navbar.module.css";
import { useRouter } from "next/router";

interface Props {
  href: string;
  label: string;
}
export const Navlink: React.FC<Props> = ({ href, label }) => {
  const router = useRouter();
  return (
    <Link href={href} passHref>
      <a className={router.pathname === href ? styles.active : ""}> {label} </a>
    </Link>
  );
};
