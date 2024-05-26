import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAboutFilms } from '../../api-details-film';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import css from './MovieCast.module.css';

export default function MovieCast() {
  const [filmDetails, setFilmDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { filmId } = useParams();

  useEffect(() => {
    const fetchFilmDetails = async () => {
      try {
        setError(false);
        setLoading(true);
        const details = await fetchAboutFilms(filmId, 'credits');
        setFilmDetails(details.credits.cast);
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

  return (
    <>
      {loading && <Loading />}
      {error && <Error />}
      <h3 className={css.castTitle}>Film Cast</h3>
      {filmDetails && filmDetails.length ? (
        <ul className={css.castContainer}>
          {filmDetails.map(({ profile_path, original_name, character, id }) => (
            <li className={css.actorContainer} key={id}>
              <img
                className={css.actorImg}
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w200${profile_path}`
                    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlcM989vRkQnMY-r6Nd8SgVLt34-tPKMLouQ&s'
                }
                alt="original_name"
              />
              <p className={css.castFilmText}>
                <b className={css.castTextFilm}>Name: </b>
                {original_name}
              </p>
              <p className={css.castFilmText}>
                <b className={css.castTextFilm}>Character: </b>
                {character}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We dont have information about cast for this movie</p>
      )}
    </>
  );
}
