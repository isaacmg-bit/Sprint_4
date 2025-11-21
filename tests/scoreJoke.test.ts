import { scoreJoke } from "../src/scoreJoke";
import { pushScore, scoreJokeDB } from "../src/scoreJoke";
import * as fetchJokeModule from "../src/fetchJoke";

describe("scoreJoke", () => {
  test("should return 1 for scoreButton1", () => {
    expect(scoreJoke("scoreButton1")).toBe(1);
  });

  test("should return 2 for scoreButton2", () => {
    expect(scoreJoke("scoreButton2")).toBe(2);
  });

  test("should return 3 for scoreButton3", () => {
    expect(scoreJoke("scoreButton3")).toBe(3);
  });

  test("should return 0 for any other button", () => {
    expect(scoreJoke("unknownButton")).toBe(0);
  });
});

describe("pushScore", () => {
  beforeEach(() => {
    scoreJokeDB.length = 0;
  });

  test("if no score button is pressed, the function stops", () => {
    pushScore("");
    expect(scoreJokeDB).toHaveLength(0);
  });

  test("should push a score when button is defined", () => {
    vi.spyOn(fetchJokeModule, "getCurrentJoke").mockReturnValue("Mocked joke");

    pushScore("scoreButton2");

    expect(scoreJokeDB).toHaveLength(1);
    expect(scoreJokeDB[0].joke).toBe("Mocked joke");
    expect(scoreJokeDB[0].score).toBe(2);
    expect(scoreJokeDB[0].date).toBeInstanceOf(Date);
  });
});
