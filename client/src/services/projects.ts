import axios from "axios"
import config from "../config/config"
import { IProject } from "../models"
const baseUrl = config.WEBSITE_API || "/api/website/projects"

const getAll = async () => {
  const response = await axios.get<Array<IProject>>(baseUrl)

  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll }
