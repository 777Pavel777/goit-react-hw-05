import css from './Loading.module.css';
import { FadeLoader } from 'react-spinners';
export default function Loading() {
  return (
    <div className={css.loader}>
      <FadeLoader color="green" aria-label="loading" />
    </div>
  );
}
