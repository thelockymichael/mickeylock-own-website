import axios from "axios";
const baseUrl = "/api/website";

const getAll = async () => {
  const response = await axios.get(baseUrl);

  return response;
};

export { getAll };
