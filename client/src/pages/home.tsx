import React, { useEffect } from "react";
import IPage from "../interfaces/page";
import logging from "../config/logging";
import { Link } from "react-router-dom";

import styled from "styled-components";

// TODO
// Title
const Title = styled.h1``;

const GroupContainer = styled.div`
  display: flex;

  justify-content: space-around;
  max-width: 100%;
  background: #a0c5e8;
`;

const ButtonContainer = styled.span`
  width: 100%;
  text-align: center;
  height: 100%;
  background: black;
  padding: 20px 0;
`;

const HomePage: React.FC<IPage> = (props) => {
  useEffect(() => {
    logging.info(`Loading ${props.name}`);
  }, [props.name]);

  return (
    <div>
      <GroupContainer>
        <ButtonContainer>
          <Title>
            <h1>
              <Link to="/about"> About </Link>
            </h1>
          </Title>
        </ButtonContainer>
        <ButtonContainer>
          <Title>
            <h1>
              <Link to="/projects"> Projects </Link>
            </h1>
          </Title>
        </ButtonContainer>
      </GroupContainer>
    </div>
  );
};

export default HomePage;
