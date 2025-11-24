type Weather = {
  city: string;
  temp: number;
  condition: string;
  icon: string;
};

type WeatherApiResponse = {
  location: {
    name: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
};

export const weatherDB: Weather[] = [];

export const fetchWeather = async (): Promise<WeatherApiResponse> => {
  const response = await fetch(
    "http://api.weatherapi.com/v1/current.json?key=ee7c31ce651d4b2596c114408251911&q=Barcelona/",
    {
      method: "GET",
      headers: { Accept: "application/json" },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch weather: ${response.status}`);
  }

  const data: WeatherApiResponse = await response.json();
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
