const getJoke = () => {
  const jokeTextBox = document.querySelector("#jokebox");

  fetch("https://icanhazdadjoke.com/", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (jokeTextBox) {
        jokeTextBox.textContent = data.joke;
      }
    });
};

const button = document.querySelector("button").addEventListener("click", getJoke); 
