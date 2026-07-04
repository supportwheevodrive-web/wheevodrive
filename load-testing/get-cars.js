import http from "k6/http";
import { check, sleep } from "k6";

// Least load
// export const options = {
//   vus: 10,
//   duration: "30s",
//   thresholds: {
//     http_req_failed: ["rate<0.1"], // Allow 10% failure rate during debugging
//   },
// };

// Moderate load
// export const options = {
//   stages: [
//     { duration: "10s", target: 10 },
//     { duration: "20s", target: 50 },
//     { duration: "30s", target: 50 },
//     { duration: "10s", target: 0 },
//   ],
//   thresholds: {
//     http_req_failed: ["rate<0.01"],
//     http_req_duration: ["p(95)<500"], // 95% under 500ms
//   },
// };

// Medium load
// export const options = {
//   stages: [
//     { duration: "10s", target: 50 },
//     { duration: "20s", target: 100 },
//     { duration: "30s", target: 200 },
//     { duration: "30s", target: 200 },
//     { duration: "10s", target: 0 },
//   ],
//   thresholds: {
//     http_req_failed: ["rate<0.01"],
//     http_req_duration: ["p(95)<100"],
//   },
// };

// export const options = {
//   stages: [
//     { duration: "10s", target: 100 },
//     { duration: "20s", target: 300 },
//     { duration: "30s", target: 500 },
//     { duration: "30s", target: 1000 },
//     { duration: "30s", target: 1000 },
//     { duration: "10s", target: 0 },
//   ],
//   thresholds: {
//     http_req_failed: ["rate<0.02"], // Allow 2% during stress
//     http_req_duration: ["p(95)<500"],
//   },
// };

// WIth 20k users
// export const options = {
//   // REMOVE the "vus" and "duration" fields
//   // Only use "stages" for ramp-up

//   stages: [
//     { duration: "30s", target: 1000 }, // Ramp to 1K users
//     { duration: "1m", target: 2000 }, // Ramp to 5K users
//     { duration: "1m", target: 3000 }, // Ramp to 10K users
//     { duration: "1m", target: 10000 }, // Ramp to 20K users
//     { duration: "2m", target: 15000 }, // Ramp to 50K users
//     { duration: "1m", target: 20000 }, // Stay at 50K users
//     { duration: "30s", target: 0 }, // Ramp down to 0
//   ],

//   // Optional: Add thresholds
//   thresholds: {
//     http_req_failed: ["rate<0.01"],
//     http_req_duration: ["p(95)<1000"],
//   },
// };

// with 20k
// export const options = {
//   // Maximum safe load for laptop
//   stages: [
//     { duration: "30s", target: 1000 },
//     { duration: "1m", target: 5000 },
//     { duration: "1m", target: 10000 },
//     { duration: "2m", target: 15000 },
//     { duration: "2m", target: 20000 }, // MAX
//     { duration: "1m", target: 20000 },
//     { duration: "30s", target: 0 },
//   ],

//   thresholds: {
//     http_req_failed: ["rate<0.01"],
//     http_req_duration: ["p(95)<1000"],
//   },

//   gracefulStop: "30s",

//   // Reduce resource usage
//   summaryTrendStats: ["avg", "med", "p(95)", "p(99)"],
// };

// With 25k
// export const options = {
//   stages: [
//     { duration: "30s", target: 1000 },
//     { duration: "1m", target: 5000 },
//     { duration: "1m", target: 10000 },
//     { duration: "2m", target: 15000 },
//     { duration: "2m", target: 20000 },
//     { duration: "2m", target: 25000 },
//     { duration: "1m", target: 25000 },
//     { duration: "30s", target: 0 },
//   ],

//   thresholds: {
//     http_req_failed: ["rate<0.01"],
//     http_req_duration: ["p(95)<1000"],
//   },

//   gracefulStop: "30s",

//   summaryTrendStats: ["avg", "med", "p(95)", "p(99)"],
// };

export default function () {
  const url = "http://localhost:5000/api/v1/user/cars?page=1&limit=10";

  const res = http.get(url, {
    timeout: "10s",
  });

  console.log(`Status: ${res.status}, Body length: ${res.body.length}`);

  const checkResult = check(res, {
    "status is 200": (r) => r.status === 200,
    "has valid JSON": (r) => {
      try {
        JSON.parse(r.body);
        return true;
      } catch (e) {
        console.log(`Invalid JSON: ${r.body.substring(0, 100)}`);
        return false;
      }
    },
  });

  if (!checkResult) {
    console.log(`Failed response: ${res.body.substring(0, 200)}`);
  }

  sleep(1);
}
