// ./src/main.ts  (compílalo a main.js o usa bundler)
const button = document.getElementById("button");
const gifDiv = document.getElementById("risitas");

button?.addEventListener("click", () => {
  if (!gifDiv) return;

  gifDiv.classList.remove("hidden");

  setTimeout(() => {
    gifDiv.classList.add("hidden");
  }, 2200);
});
