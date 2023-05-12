import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { Alert, Snackbar } from '@mui/material';
import './App.scss';
import { useAppDispatch, useAppSelector } from './app/hooks';
import * as weatherActions from './features/weathers';
import { HomePage } from './pages/HomePage';
import { Loader } from './components/Loader';
import { DetailsPage } from './pages/DetailsPage';
import { ErrorText } from './types/ErrorText';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  const { loading, error } = useAppSelector(state => state.weathers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(weatherActions.init());
  }, []);

  return (
    <>
      {loading && <Loader />}
      <section className="app">
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route index element={<HomePage />} />

          <Route path="/:cityId" element={<DetailsPage />} />
        </Routes>
      </section>

      <Snackbar
        open={error !== ErrorText.NONE}
        autoHideDuration={5000}
        onClose={() => dispatch(weatherActions.actions.setError(ErrorText.NONE))}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="error">
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};
