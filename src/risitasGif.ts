import { buttonElement } from "./dom";

const risitasGif = document.querySelector<HTMLElement>("#risitas");

buttonElement?.addEventListener("click", () => {
  if (!risitasGif) return;

  risitasGif.classList.remove("hidden");

  setTimeout(() => {
    risitasGif.classList.add("hidden");
  }, 2200);
});