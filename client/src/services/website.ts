import axios from "axios"
import config from "../config/config"
import { IWebsite } from "../models"
const baseUrl = config.WEBSITE_API || "/api/website"

console.log("baseUrl", baseUrl)

const getAll = async () => {
  const response = await axios.get(baseUrl + "/selectedProfileImg")

  return response
}

export const initWebsite = () => {
  return axios.post(baseUrl).then((response) => {
    console.log("response.data", response.data)

    return response.data
  })
}

export { getAll }
