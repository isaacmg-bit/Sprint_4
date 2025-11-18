import { buttonElement, clickButton, printJoke } from "./dom";

type ApiResponse = {
  // TS: We define the response structure. We know due to the API documentation that the GET request will return an object with these three properties
  id: string;
  joke: string;
  status: number;
};

type AppResponse = {
  status: number;
  message: string;
  joke?: string;
};

// TS: This is our own response structure, the one we will print throught console.

export const fetchJoke = async (): Promise<AppResponse> => {
  // TS: async function converts return to promise, thats why we wrap it in promise now
  try {
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

    printJoke(data.joke);

    return {
      status: 200,
      message: "OK!",
      joke: data.joke,
    };

    // now we get the return when everything has been done and not right when we launch the function, as expected
  } catch (err: unknown) {
    return {
      status: 400,
      message: err instanceof Error ? `Error: ${err.message}` : "Unknown error", // TS: We ask if err was created by Error, and if true, we throw the error message from the error that happened. If something weird happens, we throw Unknown error.
    };
  }
};

fetchJoke().then((result) => console.log(result)); // fetchJoke gets called, and we use .then as it resturns a promise now, then we print the return on the console

clickButton(() => {
  fetchJoke().then((result) => console.log(result));
});
