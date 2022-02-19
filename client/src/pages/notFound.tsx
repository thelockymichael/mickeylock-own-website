import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  primaryColor,
  primaryText,
  secondaryColor,
  secondaryShade,
  secondaryText,
} from "../colors/colors";

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const HeaderFont = styled.h1`
  font-size: 7em;
`;

const GoHomeContainer = styled.div`
  padding: 4rem;
  margin-top: 4rem;
  background-color: ${secondaryColor};

  :hover {
    background-color: ${secondaryShade};
  }
`;

const GoHomeFont = styled.div`
  font-size: 7em;
  color: ${secondaryText};
`;

const NotFound: React.FC = () => {
  return (
    <Container>
      <HeaderFont>404 - Page Not Found!</HeaderFont>
      <GoHomeContainer>
        <Link to="/">
          <GoHomeFont>Go to Home page</GoHomeFont>
        </Link>
      </GoHomeContainer>
    </Container>
  );
};

export default NotFound;
