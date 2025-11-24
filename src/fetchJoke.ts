import { buttonElement, printJoke } from "./dom";

type ApiResponse = {
  id: string;
  joke: string;
  status: number;
};

type ApiChuckResponse = {
  id: string;
  url: string;
  value?: string;
};

type AppResponse = {
  status: number;
  message: string;
  joke?: string;
};

let currentJoke: string | null = null;
export const getCurrentJoke = () => currentJoke;

export const fetchJoke = async (): Promise<AppResponse> => {
  try {
    if (!buttonElement) {
      throw new Error("Button element not found in DOM!");
    }

    const coin_flip = Math.random();

    if (coin_flip > 0.5) {
      const response = await fetch("https://icanhazdadjoke.com/", {
        method: "GET",
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch joke: ${response.status}`);
      }

      const data: ApiResponse = await response.json();

      if (!data.joke) {
        throw new Error(
          "Could not find the property 'joke' on the API response"
        );
      }
      currentJoke = data.joke;
      printJoke(currentJoke);

      return {
        status: 200,
        message: "OK!",
        joke: currentJoke,
      };
    } else {
      const responseChuck = await fetch(
        "https://api.chucknorris.io/jokes/random",
        {
          method: "GET",
          headers: { Accept: "application/json" },
        }
      );

      if (!responseChuck.ok) {
        throw new Error(`Failed to fetch joke: ${responseChuck.status}`);
      }

      const dataChuck: ApiChuckResponse = await responseChuck.json();

      if (!dataChuck.value) {
        throw new Error(
          "Could not find the property 'value' on the API response"
        );
      }
      currentJoke = dataChuck.value;
      printJoke(currentJoke);

      return {
        status: 200,
        message: "OK!",
        joke: currentJoke,
      };
    }
  } catch (err: unknown) {
    return {
      status: 400,
      message: err instanceof Error ? `Error: ${err.message}` : "Unknown error",
    };
  }
};
