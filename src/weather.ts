export const fetchWeather = async () => {
  const response = await fetch(
    "http://api.weatherapi.com/v1/current.json?key=ee7c31ce651d4b2596c114408251911&q=Barcelona/",
    {
      method: "GET",
      headers: { Accept: "application/json" },
    }
  );
  const data = await response.json();
  console.log(data);
};

fetchWeather();
