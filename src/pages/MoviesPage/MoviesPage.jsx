import { useEffect, useState } from 'react';
import { fetchSearchFilms } from '../../api-search-film';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
import MovieList from '../../components/MovieList/MovieList';
import { useSearchParams } from 'react-router-dom';
import css from './MoviesPage.module.css';
import LoadMoreFilms from '../../components/LoadMoreBtn/LoadMoreBtn';

export default function MoviesPage() {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const filmQuery = searchParams.get('query') ?? '';

  useEffect(() => {
    if (!filmQuery) {
      return;
    }

    const fetchListFilm = async () => {
      try {
        setLoading(true);
        const dataFilms = await fetchSearchFilms(filmQuery, page);
        setData(dataFilms);
        setFilms(dataFilms.results);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchListFilm();
  }, [filmQuery, page]);

  const handleSearchFilms = e => {
    e.preventDefault();
    setFilms([]);
    setPage(1);
    const form = e.target;
    const qweryFilm = form.elements.search.value;
    setSearchParams({ query: qweryFilm });
    setError(false);
    form.reset();
  };

  const handleNext = () => {
    setPage(prewPage => prewPage + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handlePrev = () => {
    setPage(prewPage => prewPage - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <form onSubmit={handleSearchFilms} className={css.formMovies}>
        <input
          className={css.inputMovies}
          name="search"
          type="text"
          autoComplete="off"
          placeholder="Search films"
        />
        <button className={css.btnMovies} type="submit">
          Search
        </button>
      </form>
      {loading && <Loading />}

      <MovieList films={films} />

      {filmQuery && films.length === 0 && (
        <p className={css.messageEr}>
          Sorry, but we could not find anything for your query. Please try
          again.
        </p>
      )}

      <LoadMoreFilms
        next={handleNext}
        prev={handlePrev}
        totalPage={data.total_pages}
        page={page}
      />

      {error && <Error />}
    </div>
  );
}
