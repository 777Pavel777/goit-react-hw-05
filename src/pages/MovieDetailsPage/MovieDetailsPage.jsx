import { Suspense, useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { fetchAboutFilms } from '../../api-details-film';
import css from './MovieDetailsPage.module.css';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
import { FaStar } from 'react-icons/fa';
import { GoArrowLeft } from 'react-icons/go';

export default function MovieDetailsPage() {
  const [filmDetails, setFilmDetails] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { filmId } = useParams();
  const location = useLocation();
  const backLinkHref = useRef(location.state ?? '/movies');

  useEffect(() => {
    const fetchFilmDetails = async () => {
      try {
        setError(false);
        setLoading(true);
        const details = await fetchAboutFilms(filmId);
        setFilmDetails(details);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchFilmDetails();
  }, [filmId]);

  if (!filmDetails) {
    return;
  }

  const { title, overview, genres, poster_path, release_date, vote_average } =
    filmDetails;

  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w300/${poster_path}`
    : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/640px-No-Image-Placeholder.svg.png';

  return (
    <div className={css.container}>
      {loading && <Loading />}

      <Link className={css.backBtn} to={backLinkHref.current}>
        <GoArrowLeft className={css.goBack} />
      </Link>
      {filmDetails && (
        <>
          <div className={css.detailsContainer}>
            <img className={css.poster} src={posterUrl} alt={title} />
            <div className={css.detailsFilm}>
              <ul>
                <li>
                  <h2 className={css.filmTitle}>
                    {title} ({release_date})
                  </h2>
                </li>
                <li>
                  <p className={css.filmText}>
                    <b className={css.textFilm}>User Score: </b>

                    {vote_average.toFixed(1)}
                    <FaStar className={css.iconStar} />
                  </p>
                </li>
                <li>
                  <p className={css.filmText}>
                    <b className={css.textFilm}>Overview: </b>
                    {overview}
                  </p>
                </li>
                <li>
                  <p className={css.filmText}>
                    <b className={css.textFilm}>Genres: </b>
                    {genres.map(genre => (
                      <span key={genre.id}>{genre.name}, </span>
                    ))}
                  </p>
                </li>
              </ul>
              <ul className={css.moreDetailsFilm}>
                <Link className={css.filmInfo} to="cast">
                  Cast
                </Link>
                <Link className={css.filmInfo} to="review">
                  Reviews
                </Link>
                <Link className={css.filmInfo} to="trailer">
                  Trailer
                </Link>
              </ul>
            </div>
          </div>
          <div>
            <Suspense
              fallback={
                <div>
                  <Loading />
                </div>
              }
            >
              <Outlet />
            </Suspense>
          </div>
        </>
      )}
      {error && <Error />}
    </div>
  );
}
