import { getCurrentJoke } from "./fetchJoke";

type ScoreJoke = {
  joke: string;
  score: number;
  date: Date;
};

const scoreJokeDB: ScoreJoke[] = [];

export const scoreJoke = (selectedButton: string) => {
  if (selectedButton === "scoreButton1") {
    const score1 = 1;
    return score1;
  } else if (selectedButton === "scoreButton2") {
    const score2 = 2;
    return score2;
  } else if (selectedButton === "scoreButton3") {
    const score3 = 3;
    return score3;
  } else {
    const score4 = 0;
    return score4;
  }
};

export const pushScore = (button: string) => {
  if (!button) {
    return;
  }
  const finalScore = scoreJoke(button);
  const finalJoke = getCurrentJoke();
  const date = new Date();
  scoreJokeDB.push({
    joke: finalJoke ?? "Error fetching joke",
    score: finalScore,
    date: date,
  });
  console.log(scoreJokeDB);
};
