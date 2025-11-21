describe("fetchWeather", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    vi.stubGlobal("fetch", vi.fn());
  });

  test("Weather API returns ok = true", async () => {
    const mockedFetch = vi.mocked(globalThis.fetch);

    mockedFetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        location: { name: "Barcelona" },
        current: {
          temp_c: 10,
          condition: { text: "Overcast", icon: "iconurl/icon.jpg" },
        },
      }),
    } as any);

    const { fetchWeather } = await import("../src/weather");

    const result = await fetchWeather();

    expect(mockedFetch).toHaveBeenCalledWith(
      "http://api.weatherapi.com/v1/current.json?key=ee7c31ce651d4b2596c114408251911&q=Barcelona/",
      expect.objectContaining({ method: "GET" })
    );

    expect(result).toEqual({
      location: { name: "Barcelona" },
      current: {
        temp_c: 10,
        condition: { text: "Overcast", icon: "iconurl/icon.jpg" },
      },
    });
  });

  test("Weather API returns ok = false", async () => {
    const mockedFetch = vi.mocked(globalThis.fetch);

    mockedFetch.mockResolvedValue({
      ok: false,
      status: 400,
    } as any);

    const { fetchWeather } = await import("../src/weather");

    const resultPromise = fetchWeather();

    await expect(resultPromise).rejects.toThrow("Failed to fetch weather: 400");

    expect(mockedFetch).toHaveBeenCalledWith(
      "http://api.weatherapi.com/v1/current.json?key=ee7c31ce651d4b2596c114408251911&q=Barcelona/",
      expect.objectContaining({ method: "GET" })
    );
  });
});

describe("actualWeather", () => {
  test("actualWeather pushes the weather to weatherDB", async () => {
    const mockedFetch = vi.mocked(globalThis.fetch);

    mockedFetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        location: { name: "Barcelona" },
        current: {
          temp_c: 20,
          condition: { text: "Sunny", icon: "iconurl/icon.jpg" },
        },
      }),
    } as any);

    const { actualWeather, weatherDB } = await import("../src/weather");

    await actualWeather();

    expect(mockedFetch).toHaveBeenCalledWith(
      "http://api.weatherapi.com/v1/current.json?key=ee7c31ce651d4b2596c114408251911&q=Barcelona/",
      expect.objectContaining({ method: "GET" })
    );

    expect(weatherDB).toHaveLength(1);
    expect(weatherDB[0]).toEqual({
      city: "Barcelona",
      temp: 20,
      condition: "Sunny",
      icon: "iconurl/icon.jpg",
    });
  });
});
