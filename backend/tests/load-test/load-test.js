import http from "k6/http";
import { sleep } from "k6";

export let options = {
  vus: 5000, // virtual users
  duration: "30s",
};

let url = "http://localhost:5000/api/v1/user/cars";

export default function () {
  //   http.get();
  http.get(url, { timeout: "20s" });
  sleep(1);
}
