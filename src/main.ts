import { fetchJoke } from "./fetchJoke";
import { clickButton, printWeather } from "./dom";
import { pushScore } from "./scoreJoke";
import { actualWeather } from "./weather";

window.addEventListener("DOMContentLoaded", async () => {
  try {
    await actualWeather();
    printWeather();
  } catch (error: any) {
    console.error(error);
    const weatherBox = document.querySelector("#weatherbox");
    if (weatherBox) {
      weatherBox.textContent = "Failed to get the weather, sorry! Take a peek outisde your window for now.";
    }
  }
});

fetchJoke().then((result) => console.log(result));
clickButton(() => {
  fetchJoke().then((result) => console.log(result));
  pushScore();
});
