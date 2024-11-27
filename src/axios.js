import axios from "axios";

const instance = axios.create({
  baseURL: "https://us-central1-challenge-9eca5.cloudfunctions.net/api",
  //"https://us-central1-challenge-9eca5.cloudfunctions.net/api",
  //'http://127.0.0.1:5001/challenge-9eca5/us-central1/api' //URL of API
});

export default instance;
