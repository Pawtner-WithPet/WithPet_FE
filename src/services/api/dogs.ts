import axios from "axios";
import MockAdapter from "axios-mock-adapter";

export type Dog = {
  id: number;
  name: string;
  age: string;
  breed: string;
  gender: string;
  imageUrl: string;
};

const API_URL = "https://your-api-endpoint.com/api/dogs";

const mock = new MockAdapter(axios, { delayResponse: 500 }); // 0.5초 지연 추가

// mock 설정 - GET 요청 시 아래 데이터를 반환
mock.onGet(API_URL).reply(200, [
  {
    id: 1,
    name: "해피",
    age: "2세",
    breed: "골든 리트리버",
    gender: "암컷",
    imageUrl: "https://your-mock-url.com/happy.jpg",
  },
  {
    id: 2,
    name: "조이",
    age: "1세",
    breed: "진도 믹스",
    gender: "수컷",
    imageUrl: "https://your-mock-url.com/joy.jpg",
  },
]);

export const fetchDogs = async (): Promise<Dog[]> => {
  try {
    const response = await axios.get<Dog[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch dogs:", error);
    return [];
  }
};
