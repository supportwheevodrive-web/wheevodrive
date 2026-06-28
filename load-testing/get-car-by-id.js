import http from "k6/http";
import { check, sleep } from "k6";

const carIds = ["6a3d2915a2d5a86bba675fb6"];

// Simulate different user types
function getUserBehavior() {
  const behaviors = [
    { sleep: 0.5, label: "casual" },
    { sleep: 1.0, label: "browsing" },
    { sleep: 2.0, label: "detailed" },
    { sleep: 0.3, label: "fast" },
  ];
  return behaviors[Math.floor(Math.random() * behaviors.length)];
}

export const options = {
  stages: [
    { duration: "1m", target: 1000 },
    { duration: "2m", target: 3000 },
    { duration: "3m", target: 5000 },
    { duration: "2m", target: 5000 },
    { duration: "30s", target: 0 },
  ],
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<500"],
  },
};

export default function () {
  const carId = carIds[Math.floor(Math.random() * carIds.length)];
  const url = `http://localhost:5000/api/v1/user/car/${carId}`;

  const res = http.get(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "User-Agent": "Mozilla/5.0 (compatible; LoadTest/1.0)",
    },
  });

  check(res, {
    "status is 200": (r) => r.status === 200,
    "response < 300ms": (r) => r.timings.duration < 300,
  });

  const behavior = getUserBehavior();
  sleep(behavior.sleep);
}
