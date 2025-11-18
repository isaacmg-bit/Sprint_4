import { fetchJoke } from "./fetchJoke";

type ScoreJoke = {
  joke: string;
  score: number;
  date: string;
};

const scoreJokeDB: ScoreJoke[] = [];

export function scoreJoke(selectedButton: string) {
  if (selectedButton === "scoreButton1") {
    scoreJokeDB.push({ score: 1 });
    console.log(scoreJokeDB);
  }
}

// async function. as soon as user clicks on one of the score buttons, it waits for user to press the next joke button to send the score to the array. voting is optional,
// so there should be an if when calling the score function to call it only when the user clicks on any of the score buttons.
// function should prepare to push to the scorejokedb array with the fecthed joke, the score the user gave to it and the timestamp (await).
