import React from 'react';
import { Typography } from '@mui/material';
import AirIcon from '@mui/icons-material/Air';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import WavesOutlinedIcon from '@mui/icons-material/WavesOutlined';
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';
import CompressIcon from '@mui/icons-material/Compress';
import LandscapeOutlinedIcon from '@mui/icons-material/LandscapeOutlined';
import BeachAccessOutlinedIcon from '@mui/icons-material/BeachAccessOutlined';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import Brightness4OutlinedIcon from '@mui/icons-material/Brightness4Outlined';
import './Details.scss';
import { WeatherType } from '../../types/WeatherType';

import { Forecast } from '../Forecast';

type Props = {
  currentWeather: WeatherType,
};

export const Details: React.FC<Props> = ({ currentWeather }) => {
  const {
    coord: { lon, lat },
    weather: [{ main, description, icon }],
    main: {
      temp,
      feels_like,
      temp_min,
      temp_max,
      pressure,
      humidity,
      sea_level,
      grnd_level,
    },
    visibility,
    wind: { speed },
    rain: { '1h': rain1h } = {},
    clouds: { all },
    dt,
    sys: { country, sunrise, sunset },
    name,
  } = currentWeather;

  const transormDate = (date: number) => new Date(date * 1000).toUTCString();
  const transformSunTime = (date: number) => {
    const time = new Date(date * 1000);
    const hours = time.getUTCHours();
    const minutes = time.getUTCMinutes();
    const seconds = time.getUTCSeconds();

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="details">
      <div className="details__row">
        <Typography>{transormDate(dt)}</Typography>
        <Typography>{`${lat}°N, ${lon}°E`}</Typography>
      </div>

      <div className="details__row">
        <Typography variant="h4">{name}</Typography>
        <Typography variant="h4">{country}</Typography>
      </div>

      <div className="details__row">
        <div className="details__info">
          <div className="details__item">
            <WaterDropIcon titleAccess="Humidity" />
            <Typography>{`${humidity}%`}</Typography>
          </div>

          {rain1h && (
            <div className="details__item">
              <BeachAccessOutlinedIcon titleAccess="Rain volume" />
              <Typography>{`${rain1h}mm`}</Typography>
            </div>
          )}

          <div className="details__item">
            <CompressIcon titleAccess="Pressure" />
            <Typography>{`${pressure}hPa`}</Typography>
          </div>

          <div className="details__item">
            <AirIcon titleAccess="Wind" />
            <Typography>{`${speed}m/s`}</Typography>
          </div>

          <div className="details__item">
            <CloudOutlinedIcon titleAccess="Cloudiness" />
            <Typography>{`${all}%`}</Typography>
          </div>

          <div className="details__item">
            <VisibilityOutlinedIcon titleAccess="Visibility" />
            <Typography>{`${visibility}m`}</Typography>
          </div>

          {sea_level && (
            <div className="details__item">
              <WavesOutlinedIcon titleAccess="Sea level" />
              <Typography>{`${sea_level}m`}</Typography>
            </div>
          )}

          {grnd_level && (
            <div className="details__item">
              <LandscapeOutlinedIcon titleAccess="Ground level" />
              <Typography>{`${grnd_level}m`}</Typography>
            </div>
          )}

          <div className="details__item">
            <WbTwilightIcon titleAccess="Sunrise" />
            <Typography>{`${transformSunTime(sunrise)}`}</Typography>
          </div>

          <div className="details__item">
            <Brightness4OutlinedIcon titleAccess="Sunset" />
            <Typography>{`${transformSunTime(sunset)}`}</Typography>
          </div>
        </div>

        <div className="details__item">
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt="weather icon"
          />

          <div className="details__info">
            <Typography variant="h4">{main}</Typography>
            <Typography>{description}</Typography>
            <Typography variant="h4">{`${temp}°C`}</Typography>
          </div>
        </div>

        <div className="details__info">
          <Typography>{`Feels like: ${feels_like}°C`}</Typography>
          <Typography>{`Max: ${temp_max}°C`}</Typography>
          <Typography>{`Min: ${temp_min}°C`}</Typography>
        </div>
      </div>

      <Forecast cityId={currentWeather.id} />
    </div>
  );
};
