import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

export default function MovieList({ films }) {
  const location = useLocation();

  return (
    <ul className={css.filmContainer}>
      {films.map(film => (
        <li className={css.filmContainerItem} key={film.id}>
          <Link
            className={css.filmLink}
            to={`/movies/${film.id}`}
            state={location}
          >
            <img
              className={css.filmImg}
              src={
                film.poster_path
                  ? `https://image.tmdb.org/t/p/w200${film.poster_path}`
                  : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/640px-No-Image-Placeholder.svg.png'
              }
              alt={film.original_title}
            />
            <p className={css.filmTitle}>{film.original_title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
