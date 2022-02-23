const config = {
  defaults: {
    namespace: "Application",
  },
  WEBSITE_PROJECTS: process.env.REACT_APP_API_PROJECTS_URL,
  WEBSITE_API: process.env.REACT_APP_API_WEBSITE_URL,
  WEBSITE_ID: process.env.REACT_APP_WEBSITE_ID,
}

export default config
