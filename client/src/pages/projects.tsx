import React, { useEffect } from "react";
import IPage from "../interfaces/page";
import logging from "../config/logging";

import styled from "styled-components";

import {
  primaryColor,
  primaryShade,
  primaryText,
  secondaryColor,
} from "../colors/colors";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

// Route
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  height: 100%;
  background-color: ${primaryColor};
`;

const Container = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  justify-content: space-around;
`;

// My name container & text
const NavBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const NavBarBack = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;

const NavBarItem = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 2rem;
    flex: 1;
  }
`;

const NavLink = styled(Link)`
  font-size: 10em;
  color: ${primaryText};
  text-decoration: none;
  text-align: center;
  width: 100%;
  &:hover {
    color: ${primaryColor};
    background-color: ${secondaryColor};
  }
  @media (max-width: 768px) {
    font-size: 4em;
    text-align-last: left;
  }
`;

const Breakline = styled.div`
  height: 0.5rem;
  background-color: ${primaryShade};
`;

const GroupContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  flex-direction: row;
  @media (max-width: 768px) {
    justify-content: flex-start;
    flex-direction: column;
  }
`;

// TODO

// 1. ListContainer
// 2. ListItem -->
// * flexbox order:
// flex-direction: column,
// 1. row: image
// 2. row: dropdown-icon VEHO go (project name) Link to github
// *

const AboutPage: React.FC<IPage> = (props) => {
  useEffect(() => {
    logging.info(`Loading ${props.name}`);
  }, [props.name]);

  return (
    <Wrapper>
      <Container>
        <NavBar>
          <NavBarBack>
            <Link to="/">
              <FontAwesomeIcon
                size="6x"
                color={secondaryColor}
                icon={faArrowLeft}
              />
            </Link>
          </NavBarBack>
          <Breakline />
          <NavBarItem>
            <NavLink to="/about">About</NavLink>
          </NavBarItem>
          <Breakline />
          <NavBarItem>
            <NavLink to="/projects">Projects</NavLink>
          </NavBarItem>
          <Breakline />
        </NavBar>
        <GroupContainer></GroupContainer>
      </Container>
    </Wrapper>
  );
};

export default AboutPage;
