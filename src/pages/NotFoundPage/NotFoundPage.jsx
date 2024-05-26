import css from './NotFoundPage.module.css';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className={css.container}>
      <h1 className={css.text}>
        Ooops! We lost this page
        <br />
        <span className={css.texDecor}>404</span>
      </h1>
      <div className={css.containerImg}>
        <img
          src="https://static.vecteezy.com/system/resources/previews/026/987/683/original/single-continuous-line-drawing-woman-hiker-standing-near-direction-sign-or-pointer-girl-with-backpacks-searching-for-location-gets-lost-on-nature-one-line-draw-graphic-design-illustration-png.png"
          width={700}
          alt="Not found"
        />
        <Link className={css.btnHome} to="/">
          Home page
        </Link>
      </div>
    </div>
  );
}
