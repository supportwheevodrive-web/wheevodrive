export const VEHICLE_LIST_REQUEST = "VEHICLE_LIST_REQUEST";
export const VEHICLE_LIST_SUCCESS = "VEHICLE_LIST_SUCCESS";
export const VEHICLE_LIST_FAIL = "VEHICLE_LIST_FAIL";

// User related constants
export const USER_SIGNIN_REQUEST = "USER_SIGNIN_REQUEST";
export const USER_SIGNIN_SUCCESS = "USER_SIGNIN_SUCCESS";
export const USER_SIGNIN_FAIL = "USER_SIGNIN_FAIL";
export const USER_SIGNOUT = "USER_SIGNOUT";

export const FREE_SUBSCRIPTION_MAX_CAR_COUNT = 5;

export const SUBRIPTION_PLANS = {
  FREE: {
    TITLE: "Free",
    MAX_LISTING: 5,
    ANALYTICS_AVAILABLE: false,
    NOTIFICATIONS_AVAILABLE: true,
    PROMOTION_AVAILABLE: false,
    SEARCH_PRIORITY: false,
    PROFILE_VERIFICATION_BADGE: false,
    BOOST_CAR_OPTION: {
      isAvailable: false,
      maxBoostCount: 0,
    },
    WHATSAPP_CONTACT_BUTTON: false,
    amount: 0,
  },
  PRO: {
    TITLE: "Pro",
    MAX_LISTING: 50,
    ANALYTICS_AVAILABLE: true,
    NOTIFICATIONS_AVAILABLE: true,
    PROMOTION_AVAILABLE: false,
    SEARCH_PRIORITY: true,
    PROFILE_VERIFICATION_BADGE: true,
    BOOST_CAR_OPTION: {
      isAvailable: true,
      maxBoostCount: 5,
    },
    WHATSAPP_CONTACT_BUTTON: true,
    amount: 99,
  },
  ELITE: {
    TITLE: "Elite",
    MAX_LISTING: 500,
    ANALYTICS_AVAILABLE: true,
    NOTIFICATIONS_AVAILABLE: true,
    PROMOTION_AVAILABLE: true,
    SEARCH_PRIORITY: true,
    PROFILE_VERIFICATION_BADGE: true,
    BOOST_CAR_OPTION: {
      isAvailable: true,
      maxBoostCount: 500,
    },
    WHATSAPP_CONTACT_BUTTON: true,
    amount: 499,
  },
};
