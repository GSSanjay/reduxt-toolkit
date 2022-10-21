import Link from "next/link";
import styles from "../../styles/Submenu.module.css";

import { MenuItem } from ".";

export const Submenu = ({ submenuItemns }) => {
  return (
    submenuItemns && (
      <ul className={styles.submenu}>
        {submenuItemns &&
          submenuItemns.map((submenuItem: MenuItem, index: number) => {
            return (
              <li key={index}>
                <Link href="#">{submenuItem.title}</Link>
              </li>
            );
          })}
      </ul>
    )
  );
};
