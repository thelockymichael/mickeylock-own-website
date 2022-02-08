import axios from "axios";
const baseUrl = "/api/website";

const getAll = async () => {
  const response = await axios.get(baseUrl);

  console.log("res-23", response);

  return response;
};

export { getAll };
