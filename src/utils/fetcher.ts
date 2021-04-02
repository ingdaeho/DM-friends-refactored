import axios from "axios";

const token = sessionStorage.getItem("token");

const fetcher = (url: string) =>
  axios
    .get(url, {
      headers: {
        authorization: token,
      },
    })
    .then((res) => res.data);

export default fetcher;
