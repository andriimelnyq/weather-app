import React from 'react';
import { Typography } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { WeatherCard } from '../WeatherCard';
import './WeathersList.scss';

export const WeathersList = () => {
  const { weathers } = useAppSelector(state => state.weathers);

  return (
    <div className="weathers-list">
      {weathers.length > 0
        ? weathers.map(weather => (
          <WeatherCard
            key={weather.name}
            weather={weather}
          />
        ))
        : (
          <Typography
            variant="h5"
            color="primary"
            className="weathers-list__not-found"
          >
            Please, add cities
          </Typography>
        )}
    </div>
  );
};
