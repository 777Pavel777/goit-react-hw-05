import { useEffect, useState } from 'react';
import { fetchTrailerFilms } from '../../api-trailer-film';
import Player from '../Player/Player';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import { useParams } from 'react-router-dom';

export default function Trailer() {
  const [trailer, setTrailer] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { filmId } = useParams();

  useEffect(() => {
    const trailerFilm = async () => {
      try {
        setError(false);
        setLoading(true);
        const data = await fetchTrailerFilms(filmId);
        setTrailer(data.results[0].key);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    trailerFilm();
  }, [filmId]);

  return (
    <div>
      {loading && <Loading />}
      {error && <Error />}
      <Player trailer={trailer} />
    </div>
  );
}
