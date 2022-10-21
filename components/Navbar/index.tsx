import { useState } from "react";
import styles from "../../styles/Navbar.module.css";
import { navbarItems } from "./navbar";
import { Submenu } from "./SubMenu";

export type MenuItem = {
  title: string;
  submenus: [];
};

export const Navbar = () => {
  const [submenu, setSubmenu] = useState(false);

  function renderSubmenu(index, menuItem) {
    return (
      <li
        key={index}
        onMouseEnter={() => setSubmenu(true)}
        onMouseLeave={() => setSubmenu(false)}
      >
        <a href="#">{menuItem.title}</a>
        {submenu && <Submenu submenuItemns={menuItem.submenus} />}
      </li>
    );
  }
  return (
    <ul className={styles.navBarContainer}>
      {navbarItems.map((menuItem: MenuItem, index: number) => {
        if (menuItem.title === "About") {
          // renderSubmenu(index, menuItem);
          return (
            <li
              key={index}
              onMouseEnter={() => setSubmenu(true)}
              onMouseLeave={() => setSubmenu(false)}
              onKeyUp={(e) => {
                if (e.key === "Tab") {
                  setSubmenu(true);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Tab") {
                  setSubmenu(false);
                }
              }}
            >
              <a href="#">{menuItem.title}</a>
              {submenu && <Submenu submenuItemns={menuItem.submenus} />}
            </li>
          );
        }
        return (
          <li key={index}>
            <a href="#">{menuItem.title}</a>
          </li>
        );
      })}
    </ul>
  );
};
