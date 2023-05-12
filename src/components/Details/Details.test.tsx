import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { Details } from './Details';
import { WeatherType } from '../../types/WeatherType';
import { store } from '../../app/store';

describe('Details component', () => {
  const mockWeather: WeatherType = {
    coord: { lon: 0, lat: 0 },
    weather: [{
      id: 2, main: 'Clear', description: 'clear sky', icon: '01d',
    }],
    main: {
      temp: 20,
      feels_like: 20,
      temp_min: 20,
      temp_max: 20,
      pressure: 1013,
      humidity: 50,
      sea_level: 1013,
      grnd_level: 1013,
    },
    visibility: 10000,
    wind: { speed: 3, deg: 5 },
    rain: { '1h': 0.5, '3h': 0.5 },
    clouds: { all: 0 },
    dt: 1620842476,
    sys: {
      id: 7, message: 'text', type: 4, country: 'US', sunrise: 1620807864, sunset: 1620859764,
    },
    id: 0,
    name: 'Test City',
    base: '',
    timezone: 0,
    cod: 0,
  };

  it('renders the city name and country', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Details currentWeather={mockWeather} />
      </Provider>,
    );

    expect(getByText('Test City')).toBeInTheDocument();
    expect(getByText('US')).toBeInTheDocument();
  });

  it('renders the weather information', () => {
    const { getByText, getByTitle } = render(
      <Provider store={store}>
        <Details currentWeather={mockWeather} />
      </Provider>,
    );

    expect(getByText('Clear')).toBeInTheDocument();
    expect(getByText('clear sky')).toBeInTheDocument();
    expect(getByText('20°C')).toBeInTheDocument();
    expect(getByTitle('Humidity')).toBeInTheDocument();
    expect(getByTitle('Rain volume')).toBeInTheDocument();
    expect(getByTitle('Pressure')).toBeInTheDocument();
    expect(getByTitle('Wind')).toBeInTheDocument();
    expect(getByTitle('Cloudiness')).toBeInTheDocument();
    expect(getByTitle('Visibility')).toBeInTheDocument();
    expect(getByTitle('Sea level')).toBeInTheDocument();
    expect(getByTitle('Ground level')).toBeInTheDocument();
    expect(getByTitle('Sunrise')).toBeInTheDocument();
    expect(getByTitle('Sunset')).toBeInTheDocument();
  });
});
