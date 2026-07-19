import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="not-found">
      <p className="eyebrow">404</p>
      <h1>This page has stepped out for a touch-up.</h1>
      <p>The page you are looking for does not exist or has moved.</p>
      <Link className="button button--primary" to="/">
        Return home
      </Link>
    </main>
  );
}
