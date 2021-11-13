import React, { useEffect } from "react";
import IPage from "../interfaces/page";
import logging from "../config/logging";

const ProjectsPage: React.FC<IPage> = (props) => {
  useEffect(() => {
    logging.info(`Loading ${props.name}`);
  }, [props.name]);

  return <p>This is {props.name} page!</p>;
};

export default ProjectsPage;
