import IRoute from "../interfaces/route";
import AboutPage from "../pages/about";
import HomePage from "../pages/home";
import ProjectsPage from "../pages/projects";
import NotFound from "../pages/notFound";

const routes: IRoute[] = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
    exact: true,
  },
  {
    path: "/about",
    name: "About",
    component: AboutPage,
    exact: true,
  },
  {
    path: "/projects",
    name: "Projects",
    component: ProjectsPage,
    exact: true,
  },
  {
    path: "/*",
    name: "Page Not Found",
    component: NotFound,
    exact: true,
  },
];

export default routes;
