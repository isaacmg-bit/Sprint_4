import { fetchJoke } from "./fetchJoke";
import { clickButton, printWeather } from "./dom";
import { pushScore } from "./scoreJoke";
import { actualWeather } from "./weather";

window.addEventListener("DOMContentLoaded", async () => {
  await actualWeather();
  printWeather();
});

fetchJoke().then((result) => console.log(result));
clickButton(() => {
  fetchJoke().then((result) => console.log(result));
  pushScore();
});
