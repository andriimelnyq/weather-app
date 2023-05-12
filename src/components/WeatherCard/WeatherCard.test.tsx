import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router';
import { WeatherCard } from './WeatherCard';
import { WeatherType } from '../../types/WeatherType';
import * as weatherActions from '../../features/weathers';
import { useAppDispatch } from '../../app/hooks';

const mockWeatherData: WeatherType = {
  coord: { lon: -118.2437, lat: 34.0522 },
  weather: [
    {
      main: 'Clear', icon: '01d', id: 12313, description: 'some string',
    },
  ],
  base: 'stations',
  main: {
    temp: 123.55,
    temp_min: 123.55,
    temp_max: 123.55,
    pressure: 423,
    humidity: 565,
    feels_like: 234,
  },
  visibility: 1123,
  wind: { speed: 1.26, deg: 90 },
  rain: { '1h': 2, '3h': 3 },
  clouds: { all: 1 },
  dt: 1633039200,
  sys: {
    country: 'US', id: 123, type: 123, sunrise: 123, sunset: 123, message: 'ddd',
  },
  timezone: -25200,
  id: 1,
  name: 'Lviv',
  cod: 200,
};

jest.mock('../../app/hooks', () => ({
  useAppDispatch: jest.fn(),
}));

const mockStore = configureStore({
  reducer: {
    weathers: () => ({
      weatherList: [mockWeatherData],
      error: null,
    }),
  },
});

describe('WeatherCard', () => {
  test('renders the weather card correctly', () => {
    const dispatch = jest.fn();

    (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <WeatherCard weather={mockWeatherData} />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText(`${mockWeatherData.name}, ${mockWeatherData.sys.country}`)).toBeInTheDocument();
    expect(screen.getByText(`Max: ${mockWeatherData.main.temp_max}°C`)).toBeInTheDocument();
    expect(screen.getByText(`Min: ${mockWeatherData.main.temp_min}°C`)).toBeInTheDocument();
    expect(screen.getByText(`${mockWeatherData.main.temp}°C`)).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByText(new Date(mockWeatherData.dt * 1000).toUTCString())).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /delete/i }));
    expect(dispatch).toHaveBeenCalledWith(weatherActions.actions.delete(mockWeatherData.id));

    fireEvent.click(screen.getByRole('button', { name: /update/i }));
    expect(dispatch).toHaveBeenCalled();
  });
});
