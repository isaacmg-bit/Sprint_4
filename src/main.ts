interface ApiResponse {
  // TS: We define the response structure. We know due to the API documentation that the GET request will return an object with these three properties
  id: string;
  joke: string;
  status: number;
}

type AppResponse = {
  status: number;
  message: string;
};

// TS: This is our own response structure, the one we will print throught console.

const getJoke = async (): Promise<AppResponse> => {
  // TS: async function converts return to promise, thats why we wrap it in promise now
  try {
    const jokeTextBox = document.querySelector<HTMLElement>("#jokebox"); // TS: We are expecting an Element, and seeing that we use textContent on it later, we are expecting an HTMLElement
    const buttonElement = document.querySelector<HTMLButtonElement>("button");

    if (!jokeTextBox) {
      throw new Error("The HTMLElement (p) does not exist!");
    }
    // We check if the HTMLElement exists

    if (!buttonElement) {
      throw new Error("Button element not found in DOM!");
    }
    // We check if the button exists on the HTML.

    const response = await fetch("https://icanhazdadjoke.com/", {
      // Function gets 'paused' until fetch resolves
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch joke: ${response.status}`);
    }
    // response.ok checks that the status is in the range 200-299

    const data: ApiResponse = await response.json(); // function pauses until we parse the body from the response

    if (!data.joke) {
      throw new Error("Could not find the property 'joke' on the API response");
    }

    jokeTextBox.textContent = data.joke;

    // we do this last validation just for the sake of it, but it checks if joke exists inside data, and if it does, we print it on the html

    return {
      status: 200,
      message: "OK!",
    };

    // now we get the return when everything has been done and not right when we launch the function, as expected
  } catch (err: unknown) {
    return {
      status: 400,
      message: err instanceof Error ? `Error: ${err.message}` : "Unknown error", // TS: We ask if err was created by Error, and if true, we throw the error message from the error that happened. If something weird happens, we throw Unknown error.
    };
  }
};

getJoke().then((result) => console.log(result)); // getJoke gets called, and we use .then as it resturns a promise now, then we print the return on the console

const button = document.querySelector<HTMLButtonElement>("button"); // if button is not null, when clicked, we call the function again (next joke)
button?.addEventListener("click", () => {
  getJoke().then((result) => console.log(result));
});
