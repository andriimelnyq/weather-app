import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';
import { Box, Typography } from '@mui/material';
import { getForecast } from '../../api';
import { ErrorText } from '../../types/ErrorText';
import { useAppDispatch } from '../../app/hooks';
import { actions } from '../../features/weathers';
import { Loader } from '../Loader';
import { ForecastType } from '../../types/ForecastType';

type Props = {
  cityId: number,
};

export const Forecast: React.FC<Props> = ({ cityId }) => {
  const dispatch = useAppDispatch();
  const [temperaturesByHour, setTemperatureByHour] = useState<number[]>();
  const [dates, setDates] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  const todayTomorrowForecast = (forecast: ForecastType) => {
    return forecast.list
      .filter((entry: { dt_txt: string | string[]; }) => {
        const today = new Date();
        const tomorrow = new Date();

        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowDateStr = tomorrow.toISOString().slice(0, 10);
        const todayDateStr = today.toISOString().slice(0, 10);

        return (
          entry.dt_txt.includes(tomorrowDateStr) || entry.dt_txt.includes(todayDateStr)
        );
      });
  };

  const loadForecast = async () => {
    try {
      setIsLoading(true);
      const loadedForecast = await getForecast(`${cityId}`);

      setTemperatureByHour(todayTomorrowForecast(loadedForecast)
        .map((item: { main: { temp: number; }; }) => item.main.temp));

      setDates(loadedForecast.list.map((item: { dt: number }) => new Date(item.dt * 1000)
        .toLocaleString('en-US', dateOptions)));
    } catch {
      dispatch(actions.setError(ErrorText.LOAD_FORECAST));
    } finally {
      setIsLoading(false);
    }
  };

  const data = {
    labels: Array.from(Array(temperaturesByHour?.length), (_, i) => dates[i]),
    datasets: [
      {
        label: 'Temperature,°C',
        data: temperaturesByHour,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    loadForecast();
  }, []);

  return (
    <Box position="relative">
      {isLoading && <Loader card />}
      <Typography
        variant="h5"
        width="100%"
        align="center"
      >
        Forecast for today and tomorrow
      </Typography>
      <Bar data={data} options={options as ChartOptions} />
    </Box>
  );
};
