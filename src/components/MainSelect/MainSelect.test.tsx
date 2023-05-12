import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MainSelect } from './MainSelect';
import { store } from '../../app/store';

describe('MainSelect', () => {
  it('renders select with correct label', () => {
    render(
      <Provider store={store}>
        <MainSelect />
      </Provider>,
    );

    expect(screen.getByLabelText(/select city/i)).toBeInTheDocument();
  });

  it('renders all cities from the cityList', () => {
    render(
      <Provider store={store}>
        <MainSelect />
      </Provider>,
    );

    const cityList = ['Paris', 'New York', 'Tokyo', 'Kyiv'];

    cityList.forEach((city) => {
      expect(screen.getByText(city)).toBeInTheDocument();
    });
  });

  it('dispatches addNew action on button click', () => {
    const dispatchMock = jest.fn();

    jest.mock('../../app/hooks', () => ({
      useAppDispatch: () => dispatchMock,
    }));

    render(
      <Provider store={store}>
        <MainSelect />
      </Provider>,
    );

    const cityId = '123';
    const select = screen.getByLabelText(/select city/i);

    fireEvent.change(select, { target: { value: cityId } });

    const addButton = screen.getByRole('button', { name: /add to selected/i });

    fireEvent.click(addButton);

    expect(dispatchMock).toHaveBeenCalledWith({ type: 'weathers/addNew', payload: cityId });
  });

  it('disables button if city is already added', () => {
    const citiesIds = ['123', '456'];

    localStorage.setItem('citiesIds', JSON.stringify(citiesIds));

    render(
      <Provider store={store}>
        <MainSelect />
      </Provider>,
    );

    const alreadyAddedCityId = '123';
    const select = screen.getByLabelText(/select city/i);

    fireEvent.change(select, { target: { value: alreadyAddedCityId } });

    const addButton = screen.getByRole('button', { name: /added yet/i });

    expect(addButton).toBeDisabled();

    const notAddedCityId = '789';

    fireEvent.change(select, { target: { value: notAddedCityId } });

    const addButtonEnabled = screen.getByRole('button', { name: /add to selected/i });

    expect(addButtonEnabled).toBeEnabled();
  });
});
