import { scoreJoke } from "./scoreJoke";
import { weatherDB } from "./weather";

// fetchJoke()
export const printJoke = (text: string) => {
  const jokeTextBox = document.querySelector<HTMLElement>("#jokebox");
  if (!jokeTextBox) throw new Error("The HTMLElement (p) does not exist!");
  jokeTextBox.textContent = text;
};

export let buttonElement = document.querySelector<HTMLButtonElement>("#button");

export const clickButton = (callback: () => void) => {
  buttonElement?.addEventListener("click", callback);
};

// scoreJoke()
const buttons = document.querySelectorAll("#buttonContainer button");
export let selectedButton = "";
export const clearSelectedButton = () => {
  selectedButton = "";
};

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedButton = button.id;
    scoreJoke(selectedButton);
  });
});

//fetchWeather()
export const printWeather = () => {
  const weatherBox = document.querySelector<HTMLElement>("#weatherbox");
  const weatherIcon = document.createElement("IMG");
  document
    .querySelector<HTMLElement>("#weathercontainer")
    ?.appendChild(weatherIcon);

  if (!weatherBox) throw new Error("weatherbox not found");

  const weather = weatherDB[0];

  if (!weather) {
    weatherBox.textContent = "Error fetching weather";
    return;
  }

  weatherBox.textContent = `${weather.temp}ºC |`;
  weatherIcon.setAttribute("src", `${weather.icon}`);
};
