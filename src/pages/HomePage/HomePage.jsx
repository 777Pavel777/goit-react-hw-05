import { useEffect, useState } from 'react';
import { fetchTrendingFilms } from '../../api-trending-film';

import MovieList from '../../components/MovieList/MovieList';
import css from './HomePage.module.css';
import Error from '../../components/Error/Error';
import Loading from '../../components/Loading/Loading';

export default function HomePage() {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [top, setTop] = useState('day');

  useEffect(() => {
    const fetchListFilm = async () => {
      try {
        setError(false);
        setLoading(true);
        const dataFilms = await fetchTrendingFilms(top);
        setFilms(dataFilms);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchListFilm();
  }, [top]);

  return (
    <>
      <ul className={css.btnContainer}>
        {/* <li>
          <button className={css.btnItem} onChange={() => setTop('day')}>
            Top Day
          </button>
        </li> */}
        <li>
          <button className={css.btnItem} onChange={() => setTop('months')}>
            Top Week
          </button>
        </li>
      </ul>
      {loading && <Loading />}
      {films.length > 0 && <MovieList films={films} />}
      {error && <Error />}
    </>
  );
}
