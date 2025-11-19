import { fetchJoke } from "./fetchJoke";
import { clickButton } from "./dom";
import { pushScore } from "./scoreJoke";
import { actualWeather, fetchWeather } from "./weather";

actualWeather();

fetchJoke().then((result) => console.log(result)); // fetchJoke gets called, and we use .then as it resturns a promise now, then we print the return on the console

clickButton(() => {
  fetchJoke().then((result) => console.log(result));
  pushScore();
});
