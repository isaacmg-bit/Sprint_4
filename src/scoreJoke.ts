import { selectedButton } from "./dom";

type ScoreJoke = {
  score: number;
};

const scoreJokeDB: ScoreJoke[] = [];

export const scoreJoke = (selectedButton: string) => {
  if (selectedButton === "scoreButton1") {
    const score1 = 1;
    return score1;
  } else if (selectedButton === "scoreButton2") {
    const score2 = 2;
    return score2;
  } else {
    const score3 = 3;
    return score3;
  }
};

export const pushScore = () => {
  const finalScore = scoreJoke(selectedButton)
  scoreJokeDB.push({score: finalScore})
  console.log(scoreJokeDB)

}

// async function. as soon as user clicks on one of the score buttons, it waits for user to press the next joke button to send the score to the array. voting is optional,
// so there should be an if when calling the score function to call it only when the user clicks on any of the score buttons.
// function should prepare to push to the scorejokedb array with the fecthed joke, the score the user gave to it and the timestamp (await).
