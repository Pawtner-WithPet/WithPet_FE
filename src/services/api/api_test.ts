import axios from "axios";

const fetchFunction = async () => {
  try {
    const { data, status } =
      await axios.get(`https://newsapi.org/v2/everything?q=tesla&from=2023-12-11&
                                          sortBy=publishedAt&apiKey=a59be9aa893d41d6844304d4c23162ef`);

    console.log(data);
    console.log(status);
  } catch (e) {
    console.log(e);
  }
};
