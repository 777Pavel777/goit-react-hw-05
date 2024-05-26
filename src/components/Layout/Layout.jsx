import { Suspense } from 'react';
import Navigation from '../Navigation/Navigation';
import Loading from '../Loading/Loading';

export default function Layout({ children }) {
  return (
    <div>
      <Navigation />
      <Suspense
        fallback={
          <div>
            <Loading />
          </div>
        }
      >
        {children}
      </Suspense>
    </div>
  );
}
