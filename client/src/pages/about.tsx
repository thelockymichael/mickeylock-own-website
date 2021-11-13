import React, { useEffect } from "react";
import IPage from "../interfaces/page";
import logging from "../config/logging";
import { RouteComponentProps } from "react-router";

const AboutPage: React.FC<IPage & RouteComponentProps<any>> = (props) => {
  useEffect(() => {
    logging.info(`Loading ${props.name}`);
  }, [props.name]);

  return <p>This is {props.name} page!</p>;
};

export default AboutPage;
