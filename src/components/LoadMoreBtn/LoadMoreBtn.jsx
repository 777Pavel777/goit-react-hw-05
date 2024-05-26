import css from './LoadMoreBtn.module.css';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';

export default function LoadMoreFilms({ next, prev, totalPage, page }) {
  return (
    <div className={css.containerLoadMore}>
      {page > 1 && (
        <button className={css.btnMovies} onClick={prev}>
          <GoArrowLeft className={css.arrow} />
        </button>
      )}
      {totalPage > page && page}
      {totalPage > page && (
        <button className={css.btnMovies} onClick={next}>
          <GoArrowRight className={css.arrow} />
        </button>
      )}
    </div>
  );
}
