import { Typography } from '@mui/material';
import React from 'react';
import { MainSelect } from '../../components/MainSelect';
import { WeathersList } from '../../components/WeathersList';

export const HomePage = () => {
  return (
    <div className="container">
      <Typography variant="h2" align="center" color="primary">
        Weather app
      </Typography>

      <MainSelect />

      <WeathersList />
    </div>
  );
};
