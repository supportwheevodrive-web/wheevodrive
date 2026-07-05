export const REACT_ENV = "development";

export const BACKEND_URL =
  REACT_ENV === "production"
    ? "https://wheevodrive.onrender.com"
    : "http://localhost:5000";

export const PROFILE_URL = `${BACKEND_URL}/api/v1/user/me`;
export const SIGN_IN_URL = `${BACKEND_URL}/api/v1/user/signin`;
export const SIGN_UP_URL = `${BACKEND_URL}/api/v1/user/signup`;
export const ADD_CAR_URL = `${BACKEND_URL}/api/v1/user/car`;
export const GET_DEALER_CAR_URL = `${BACKEND_URL}/api/v1/user/cars/me`;
export const CAR_DETAILS_API = `${BACKEND_URL}/api/v1/user/car`;
export const UPDATE_PROFILE_URL = `${BACKEND_URL}/api/v1/user/profile`;
export const GET_ALL_CARS = `${BACKEND_URL}/api/v1/user/cars`;
export const SEARCH_URL = `${BACKEND_URL}/api/v1/user/car/search`;
export const STATS_COUNT = `${BACKEND_URL}/api/v1/user/car/stats-count`;
export const GET_DEALER_CARS_BY_DEALER_ID = `${BACKEND_URL}/api/v1/user/cars/dealer`;
export const GET_SAVED_CARS_URL = `${BACKEND_URL}/api/v1/user/car/saved`;
export const ADD_REVIEWS_URL = `${BACKEND_URL}/api/v1/user/reviews`;
export const GET_REVIEWS_URL = `${BACKEND_URL}/api/v1/user/reviews`;
export const ADD_SUBSCRIPTION_URL = `${BACKEND_URL}/api/v1/user/subscribe`;
export const FOREGOT_PASSWORD_URL = `${BACKEND_URL}/api/v1/user/reset-password`;
export const RESET_PASSWORD_URL = `${BACKEND_URL}/api/v1/user/reset-password`;
export const OTP_SEND_URL = `${BACKEND_URL}/api/v1/user/otp/send`;
export const VERIFY_OTP__URL = `${BACKEND_URL}/api/v1/user/otp/verify`;
export const ADD_CHAT_USER = `${BACKEND_URL}/api/v1/user/message/user/add`;
export const ADD_CAR_VIEWS_COUNT = `${BACKEND_URL}/api/v1/user/add-views-count`;
export const SEND_FEEDBACK_API = `${BACKEND_URL}/api/v1/user/feedback`;
export const GET_STATUS_URL = `${BACKEND_URL}/api/v1/user/feedback`;
export const CREATE_PAYMENT_INTENT = `${BACKEND_URL}/api/v1/user/create-payment-intent`;
export const UPDATE_CAR_URL = `${BACKEND_URL}/api/v1/user/car`;
export const PLAN_CONFIRMATION_API_URL = `${BACKEND_URL}/api/v1/user/plan-confirmation`;
