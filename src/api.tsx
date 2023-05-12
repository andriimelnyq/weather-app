const BASE_URL = 'https://api.openweathermap.org';
const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export const getWeather = async (id: string) => {
  await wait(500);

  const url = `${BASE_URL}/data/2.5/weather?id=${id}&appid=${apiKey}&units=metric`;

  return fetch(url).then(res => res.json());
};

export const getForecast = async (id: string) => {
  await wait(500);

  const url = `${BASE_URL}/data/2.5/forecast?id=${id}&appid=${apiKey}&units=metric`;

  return fetch(url).then(res => res.json());
};
