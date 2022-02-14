import axios from "axios";
import config from "../config/config";
import { IWebsite } from "../models";
const baseUrl = config.WEBSITE_API || "/api/website";

const getAll = async () => {
  const response = await axios.get(baseUrl);

  return response;
};

export const initWebsite = () => {
  return axios.post(baseUrl).then((response) => {
    console.log("response.data", response.data);

    return response.data;
  });
};

export { getAll };
