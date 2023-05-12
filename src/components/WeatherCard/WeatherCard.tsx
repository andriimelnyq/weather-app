import React, { useState } from 'react';
import {
  Card, CardContent, Typography, IconButton, Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Close } from '@mui/icons-material';
import ReplayIcon from '@mui/icons-material/Replay';
import { WeatherType } from '../../types/WeatherType';
import * as weatherActions from '../../features/weathers';
import { useAppDispatch } from '../../app/hooks';
import { ErrorText } from '../../types/ErrorText';
import { Loader } from '../Loader';
import './WeatherCard.scss';

type Props = {
  weather: WeatherType;
};

export const WeatherCard: React.FC<Props> = ({ weather }) => {
  const [isLoad, setIsLoad] = useState(false);
  const {
    name,
    dt,
    id,
    sys: { country },
    main: { temp, temp_min, temp_max },
    weather: [{ main, icon }],
  } = weather;
  const dispatch = useAppDispatch();

  const handleClickUpdate = async () => {
    try {
      setIsLoad(true);
      await dispatch(weatherActions.updateOne(`${id}`));
    } catch {
      dispatch(weatherActions.actions.setError(ErrorText.UPDATE_ONE));
    } finally {
      setIsLoad(false);
    }
  };

  const handleClickDelete = () => {
    dispatch(weatherActions.actions.delete(id));
  };

  return (
    <Card className="weather-card">
      {isLoad && (<Loader card />)}

      <CardContent>
        <div className="weather-card__row">
          <Typography
            variant="h5"
          >
            {`${name}, ${country}`}
          </Typography>

          <IconButton onClick={handleClickDelete}>
            <Close titleAccess="delete" />
          </IconButton>
        </div>

        <div className="weather-card__row">
          <Typography variant="h4">{main}</Typography>

          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt="weather icon"
          />

          <div className="weather-card__info">
            <Typography variant="subtitle2">
              {`Max: ${temp_max}°C`}
            </Typography>

            <Typography variant="subtitle2">
              {`Min: ${temp_min}°C`}
            </Typography>

            <Typography variant="h6">
              {`${temp}°C`}
            </Typography>
          </div>
        </div>

        <div className="weather-card__row">
          <Button className="weather-card__button">
            <Link to={`/${id}`} className="weather-card__link">
              Details
            </Link>
          </Button>

          <Typography variant="subtitle1">
            {new Date(dt * 1000).toUTCString()}
          </Typography>

          <IconButton onClick={handleClickUpdate}>
            <ReplayIcon titleAccess="update" />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};
