import { scoreJoke } from "./scoreJoke";
import { actualWeather, weatherDB } from "./weather";

// fetchJoke()
const jokeTextBox = document.querySelector<HTMLElement>("#jokebox");

export const printJoke = (text: string) => {
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
const weatherBox = document.querySelector<HTMLElement>("#weatherbox");
weatherBox.textContent = weatherDB;
