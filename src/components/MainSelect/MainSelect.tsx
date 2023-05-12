import React, { useState } from 'react';
import {
  FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Button,
} from '@mui/material';
import { cityList } from '../../data/cityList';
import * as weatherActions from '../../features/weathers';
import { useAppDispatch } from '../../app/hooks';
import './MainSelect.scss';

export const MainSelect = () => {
  const dispatch = useAppDispatch();
  const [id, setId] = useState('');
  const citiesIdsJSON = localStorage.getItem('citiesIds');
  const citiesIds = citiesIdsJSON ? JSON.parse(citiesIdsJSON) : [];
  const isButtonDisabled = citiesIds.includes(id);
  const handleChange = (event: SelectChangeEvent) => {
    setId(event.target.value as string);
  };

  const handleClickAdd = () => {
    setId('');
    if (id) {
      dispatch(weatherActions.addNew(id));
    }
  };

  return (
    <div className="main-select">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select City</InputLabel>
        <Select
          sx={{ backgroundColor: 'white' }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={id}
          label="Select City"
          onChange={handleChange}
        >
          {cityList.map(city => (
            <MenuItem
              value={city.id}
              key={city.name}
            >
              {city.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        className="main-select__button"
        variant="contained"
        onClick={handleClickAdd}
        disabled={isButtonDisabled}
      >
        {isButtonDisabled ? 'Added yet' : 'Add to selected'}
      </Button>
    </div>
  );
};
