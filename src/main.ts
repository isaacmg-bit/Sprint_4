interface JokeResponse {
  // TS: We define the response structure. We know due to the API documentation that the GET request will return an object with these three properties
  id: string;
  joke: string;
  status: number;
}

type AppResponse = {
  status: number;
  message: string;
};

const getJoke = (): void => {
  // TS: Added error control, so now we expect a response and not void
  try {
    const jokeTextBox = document.querySelector<HTMLElement>("#jokebox"); // TS: We are expecting an Element, and seeing that we use textContent on it later, we are expecting an HTMLElement

    if (!jokeTextBox) {
      throw new Error("The HTMLElement does not exist!");
    }

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
      return {
        status: 200,
        message: "OK!"
      }
  } catch (err: unknown) {
    return {
      status: 400,
      message: err instanceof Error ? `Error: ${err.message}` : "Unknown error" // TS: We ask if err was created by Error, and if true, we throw the error message from the error that happened. If something weird happens, we throw Unknown error.
    };
  }
};

getJoke(); // We call the function first thing to get the first joke without pressing the button

const button = document.querySelector<HTMLButtonElement>("button"); // TS: We use the generic <HTMLButtonElement> to tell TS what specific type of element we expect, so it knows about button-specific properties
button?.addEventListener("click", getJoke); //?. optional chaining: if button exists (is not null/undefined), we use addEventListener.
