import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';

import Layout from '../Layout/Layout';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() =>
  import('../../pages/MovieDetailsPage/MovieDetailsPage')
);
const MovieCast = lazy(() => import('../MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../MovieReviews/MovieReviews'));
import Trailer from '../Trailer/Trailer';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:filmId" element={<MovieDetailsPage />}>
          <Route path="review" element={<MovieReviews />} />
          <Route path="cast" element={<MovieCast />} />
          <Route path="trailer" element={<Trailer />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}
