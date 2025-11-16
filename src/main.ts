interface JokeResponse {
  // TS: We define the response structure. We know due to the API documentation that the GET request will return an object with these three properties
  id: string;
  joke: string;
  status: number;
}

const getJoke = (): void => {
  // TS: Function does not have return, void means we don't care about the return value
  const jokeTextBox = document.querySelector<HTMLElement>("#jokebox"); // TS: We are expecting an Element, and seeing that we use textContent on it later, we are expecting an HTMLElement

  fetch("https://icanhazdadjoke.com/", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response: Response) => response.json()) // TS: We expect a Response (native JS/TS type)
    .then((data: JokeResponse) => {
      // TS: It returns a promise by default. We expect an object with id, joke and status as per the API documentation

      if (jokeTextBox) {
        // TS: We use an IF to validate that jokeTextBox will NOT be NULL
        jokeTextBox.textContent = data.joke; // TS: We take the .joke property from the returned objetct, and it will be a string as defined in JokeResponse
      }
    });
};

getJoke(); // We call the function first thing to get the first joke without pressing the button

const button = document.querySelector<HTMLButtonElement>("button"); // TS: We use the generic <HTMLButtonElement> to tell TS what specific type of element we expect, so it knows about button-specific properties
button?.addEventListener("click", getJoke); //?. optional chaining: if button exists (is not null/undefined), we use addEventListener. 