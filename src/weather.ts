type Weather = {
  city: string;
  temp: number;
  condition: string;
  icon: string;
};

export const weatherDB: Weather[] = [];

export const fetchWeather = async () => {
  const response = await fetch(
    "http://api.weatherapi.com/v1/current.json?key=ee7c31ce651d4b2596c114408251911&q=Barcelona/",
    {
      method: "GET",
      headers: { Accept: "application/json" },
    }
  );
  const data = await response.json();
  return data;
};

export const actualWeather = async () => {
  const data = await fetchWeather();
  const weatherCity = data.location.name;
  const weatherTemp = data.current.temp_c;
  const weatherCondition = data.current.condition.text;
  const weatherIcon = data.current.condition.icon;
  weatherDB.push({
    city: weatherCity,
    temp: weatherTemp,
    condition: weatherCondition,
    icon: weatherIcon,
  });
};
