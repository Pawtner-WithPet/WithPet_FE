import { fetchDogs } from "../services/api/dogs";

describe("fetchDogs API", () => {
  it("강아지 목록을 잘 받아온다", async () => {
    const dogs = await fetchDogs();
    expect(dogs).toHaveLength(2);
    expect(dogs[0].name).toBe("해피");
  });
});
