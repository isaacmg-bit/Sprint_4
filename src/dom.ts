import { scoreJoke } from "./scoreJoke";
import { weatherDB } from "./weather";

// fetchJoke()
export const printJoke = (text: string) => {
  const jokeTextBox = document.querySelector<HTMLElement>("#jokebox");
  if (!jokeTextBox) throw new Error("The HTMLElement (p) does not exist!");
  jokeTextBox.textContent = text;
};

export const buttonElement =
  document.querySelector<HTMLButtonElement>("#button");

export const clickButton = (callback: () => void) => {
  buttonElement?.addEventListener("click", callback);
};

// scoreJoke()
const buttons = document.querySelectorAll("#buttonContainer button");
export let selectedButton = "";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedButton = button.id;
    scoreJoke(selectedButton);
  });
});

//fetchWeather()
export const printWeather = () => {
  const weatherBox = document.querySelector<HTMLElement>("#weatherbox");
  if (!weatherBox) throw new Error("weatherbox not found");

  const weather = weatherDB[0];

  if (!weather) {
    weatherBox.textContent = "Error fetching weather";
    return;
  }

  weatherBox.textContent = `${weather.city} — ${weather.temp}ºC, ${weather.condition}`;
};
