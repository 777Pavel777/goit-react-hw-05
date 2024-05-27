import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import css from './MovieReviews.module.css';
import { useParams } from 'react-router-dom';
import { fetchAboutFilms } from '../../api-details-film';

export default function MovieReviews() {
  const [filmDetails, setFilmDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { filmId } = useParams();

  useEffect(() => {
    const fetchFilmDetails = async () => {
      try {
        setError(false);
        setLoading(true);
        const details = await fetchAboutFilms(filmId, 'reviews');
        setFilmDetails(details.reviews.results);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchFilmDetails();
  }, [filmId]);

  return (
    <>
      {loading && <Loading />}
      {error && <Error />}
      <h3 className={css.titleReviews}>Reviews</h3>
      {filmDetails && filmDetails.length ? (
        <ul className={css.reviewsMovie}>
          {filmDetails.map(({ id, author_details: { username }, content }) => (
            <li className={css.reviewsContainer} key={id}>
              <p className={css.reviewsFilmText}>
                <b className={css.reviewsText}>Author: </b>
                {username}
              </p>
              <p className={css.reviewsFilmText}>
                <b className={css.reviewsText}>Reviews: </b>
                {content}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We dont have any reviews for this movie</p>
      )}
    </>
  );
}
