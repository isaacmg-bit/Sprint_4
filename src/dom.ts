const jokeTextBox = document.querySelector<HTMLElement>("#jokebox");

export const printJoke = (text: string) => {
  if (!jokeTextBox) throw new Error("The HTMLElement (p) does not exist!");
  jokeTextBox.textContent = text;
};

export const buttonElement =
  document.querySelector<HTMLButtonElement>("#button");

export const registerButtonHandler = (callback: () => void) => {
  buttonElement?.addEventListener("click", callback);
};
