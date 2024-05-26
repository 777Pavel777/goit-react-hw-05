import { clsx } from 'clsx';
import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';

const changeActivePage = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
  return (
    <nav className={css.nav}>
      <ul className={css.navList}>
        <li className={css.navLink}>
          <NavLink className={changeActivePage} to="/">
            Home
          </NavLink>
        </li>
        <li className={css.navLink}>
          <NavLink className={changeActivePage} to="/movies">
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
