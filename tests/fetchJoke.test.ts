describe("fetchJoke", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    vi.stubGlobal("fetch", vi.fn());
  });

  test("should return an error when buttonElement is missing", async () => {
    vi.doMock("../src/dom", () => ({
      printJoke: vi.fn(),
      buttonElement: null,
    }));

    const { fetchJoke } = await import("../src/fetchJoke");

    const result = await fetchJoke();

    expect(result.status).toBe(400);
    expect(result.message).toBe("Error: Button element not found in DOM!");
  });

  test("if Math.random > 0.5, should fetch from icanhazdadjoke", async () => {
    vi.doMock("../src/dom", () => ({
      printJoke: vi.fn(),
      buttonElement: {},
    }));

    const mockedFetch = vi.mocked(globalThis.fetch);
    vi.spyOn(Math, "random").mockReturnValue(0.6);

    mockedFetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        id: "123",
        joke: "Mocked joke",
        status: 200,
      }),
    } as any);

    const { fetchJoke } = await import("../src/fetchJoke");
    const { printJoke } = await import("../src/dom");

    const result = await fetchJoke();

    expect(mockedFetch).toHaveBeenCalledWith(
      "https://icanhazdadjoke.com/",
      expect.objectContaining({ method: "GET" })
    );

    expect(printJoke).toHaveBeenCalledWith("Mocked joke");
    expect(result.joke).toBe("Mocked joke");
  });

  test("if math.random > 0.5 but ok = false, returns error 400", async () => {
    vi.doMock("../src/dom", () => ({
      printJoke: vi.fn(),
      buttonElement: {},
    }));

    const mockedFetch = vi.mocked(globalThis.fetch);
    vi.spyOn(Math, "random").mockReturnValue(0.6);

    mockedFetch.mockResolvedValue({
      ok: false,
      status: 400,
    } as any);

    const { fetchJoke } = await import("../src/fetchJoke");

    const result = await fetchJoke();

    expect(mockedFetch).toHaveBeenCalledWith(
      "https://icanhazdadjoke.com/",
      expect.objectContaining({ method: "GET" })
    );

    expect(result.status).toBe(400);
    expect(result.message).toBe("Error: Failed to fetch joke: 400");
  });

  test("if math.random > 0.5, ok = true, but the .joke property does not exist", async () => {
    vi.doMock("../src/dom", () => ({
      printJoke: vi.fn(),
      buttonElement: {},
    }));

    const mockedFetch = vi.mocked(globalThis.fetch);
    vi.spyOn(Math, "random").mockReturnValue(0.6);

    mockedFetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        id: "123",
        joke: undefined,
        status: 200,
      }),
    } as any);

    const { fetchJoke } = await import("../src/fetchJoke");

    const result = await fetchJoke();

    expect(mockedFetch).toHaveBeenCalledWith(
      "https://icanhazdadjoke.com/",
      expect.objectContaining({ method: "GET" })
    );

    expect(result.status).toBe(400);
    expect(result.message).toBe(
      "Error: Could not find the property 'joke' on the API response"
    );
  });

  test("if Math.random < 0.5, should fetch from chuck norris api", async () => {
    vi.doMock("../src/dom", () => ({
      printJoke: vi.fn(),
      buttonElement: {},
    }));

    const mockedFetch = vi.mocked(globalThis.fetch);
    vi.spyOn(Math, "random").mockReturnValue(0.4);

    mockedFetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        id: "123",
        value: "Mocked joke",
        url: "",
      }),
    } as any);

    const { fetchJoke } = await import("../src/fetchJoke");
    const { printJoke } = await import("../src/dom");

    const result = await fetchJoke();

    expect(mockedFetch).toHaveBeenCalledWith(
      "https://api.chucknorris.io/jokes/random",
      expect.objectContaining({ method: "GET" })
    );

    expect(printJoke).toHaveBeenCalledWith("Mocked joke");
    expect(result.joke).toBe("Mocked joke");
  });

  test("if math.random < 0.5 but ok = false, returns error 400", async () => {
    vi.doMock("../src/dom", () => ({
      printJoke: vi.fn(),
      buttonElement: {},
    }));

    const mockedFetch = vi.mocked(globalThis.fetch);
    vi.spyOn(Math, "random").mockReturnValue(0.4);

    mockedFetch.mockResolvedValue({
      ok: false,
      status: 400,
    } as any);

    const { fetchJoke } = await import("../src/fetchJoke");

    const result = await fetchJoke();

    expect(mockedFetch).toHaveBeenCalledWith(
      "https://api.chucknorris.io/jokes/random",
      expect.objectContaining({ method: "GET" })
    );

    expect(result.status).toBe(400);
    expect(result.message).toBe("Error: Failed to fetch joke: 400");
  });

  test("if math.random < 0.5, ok = true, but the .value property does not exist", async () => {
    vi.doMock("../src/dom", () => ({
      printJoke: vi.fn(),
      buttonElement: {},
    }));

    const mockedFetch = vi.mocked(globalThis.fetch);
    vi.spyOn(Math, "random").mockReturnValue(0.4);

    mockedFetch.mockResolvedValue({
      ok: true,
      status: 400,
      json: async () => ({
        id: "123",
        value: undefined,
        url: "",
      }),
    } as any);

    const { fetchJoke } = await import("../src/fetchJoke");

    const result = await fetchJoke();

    expect(mockedFetch).toHaveBeenCalledWith(
      "https://api.chucknorris.io/jokes/random",
      expect.objectContaining({ method: "GET" })
    );

    expect(result.status).toBe(400);
    expect(result.message).toBe(
      "Error: Could not find the property 'value' on the API response"
    );
  });
});
