import React, { useEffect } from "react";
import IPage from "../interfaces/page";
import logging from "../config/logging";
import { Link } from "react-router-dom";

import styled from "styled-components";

import { primaryColor, primaryText, secondaryColor } from "../colors/colors";

const Wrapper = styled.div`
  background-color: ${primaryColor};
  flex-direction: column;
  display: flex;
  justify-content: center;
  @media (max-width: 768px) {
    height: 60rem;
  }
`;

const NavLink = styled(Link)`
  font-size: 10em;
  color: ${primaryText};
  text-decoration: none;
  &:hover {
    color: ${primaryColor};
    background: ${secondaryColor};
  }
  @media (max-width: 768px) {
    font-size: 10em;
  }
`;

// My name container & text
const NameContainer = styled.div`
  height: "40%";
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const NameText = styled.p`
  font-size: 14em;
  @media (max-width: 768px) {
    font-size: 10em;
  }
`;

const DescText = styled.p`
  font-size: 2em;
`;

/* END */

const GroupContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  flex-direction: row;
  @media (max-width: 768px) {
    align-items: center;
    flex-direction: column;
  }
`;

const HomePage: React.FC<IPage> = (props) => {
  useEffect(() => {
    logging.info(`Loading ${props.name}`);
  }, [props.name]);

  return (
    <Wrapper>
      <NameContainer>
        <NameText>Mickey</NameText>
        <DescText>Mobile Apps || Fullstack</DescText>
      </NameContainer>
      <GroupContainer>
        <div>
          <NavLink to="/about"> About </NavLink>
        </div>
        <div>
          <NavLink to="/projects"> Projects </NavLink>
        </div>
      </GroupContainer>
    </Wrapper>
  );
};

export default HomePage;
