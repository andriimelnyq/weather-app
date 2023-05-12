import React from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Typography } from '@mui/material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { Details } from '../../components/Details';
import { useAppSelector } from '../../app/hooks';

export const DetailsPage = () => {
  const { cityId = '' } = useParams();
  const navigate = useNavigate();
  const { weathers } = useAppSelector(state => state.weathers);
  const currentWeather = weathers.find(weather => `${weather.id}` === cityId);

  const handleBackInHistory = () => navigate(-1);

  return (
    <div className="container">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: '20px',
        }}
      >
        <IconButton onClick={handleBackInHistory}>
          <ArrowBackIosNewRoundedIcon titleAccess="Turn back" />
        </IconButton>

        <Typography variant="h4" color="primary">
          Weather details
        </Typography>
      </Box>

      {currentWeather
        && (<Details currentWeather={currentWeather} />)}
    </div>
  );
};
