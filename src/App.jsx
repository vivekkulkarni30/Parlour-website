import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { useAuth } from './hooks/useAuth.js';

const Home = lazy(() => import('./pages/Home.jsx'));
const Admin = lazy(() => import('./pages/Admin.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

function ProtectedRoute({ children }) {
  const { session, loading } = useAuth();

  if (loading) return <LoadingScreen compact />;
  if (!session) return <Navigate to="/admin/login" replace />;

  return children;
}

export default function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/admin/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4200,
          style: {
            borderRadius: '16px',
            boxShadow: '0 20px 60px rgba(14, 116, 144, 0.18)',
            border: '1px solid rgba(56, 189, 248, 0.22)'
          }
        }}
      />
    </ErrorBoundary>
  );
}
