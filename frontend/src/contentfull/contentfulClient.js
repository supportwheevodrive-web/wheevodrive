import { createClient } from "contentful";
const contentful = require("contentful");

const client = createClient({
  space: process.env.REACT_APP_CONTENTFULL_SPACEID || "1234",
  accessToken: process.env.REACT_APP_CONTENTFULL_ACCESS_TOKEN || "1234",
});

export default client;

export const fetchEntries = async () => {
  try {
    const entries = await client.getEntries();
    return entries.items;
  } catch (error) {
    console.error("Error fetching entries:", error);
  }
};
