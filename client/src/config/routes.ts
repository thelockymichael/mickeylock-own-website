import IRoute from "../interfaces/route";
import AboutPage from "../pages/about";
import HomePage from "../pages/home";
import ProjectsPage from "../pages/projects";

const routes: IRoute[] = [
  {
    path: "/",
    name: "Home Page",
    component: HomePage,
    exact: true,
  },
  {
    path: "/about",
    name: "About Page",
    component: AboutPage,
    exact: true,
  },
  {
    path: "/projects",
    name: "Projects Page",
    component: ProjectsPage,
    exact: true,
  },
];

export default routes;
