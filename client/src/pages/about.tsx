import React, { useEffect } from "react";
import IPage from "../interfaces/page";
import logging from "../config/logging";
import { Link } from "react-router-dom";

import styled from "styled-components";

import { primaryColor, primaryText, secondaryColor } from "../colors/colors";

const Wrapper = styled.div`
  height: 100%;
  background-color: ${primaryColor};
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 100%;
  background-color: ${primaryColor};
  display: flex;
  justify-content: center;
  align-items: center; */
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  /* display: flex;
  height: 50rem;
  width: 100rem;
  justify-content: space-around;
  flex-direction: column; */
`;

// TODO
// NavBar for mobile device
// -> (<-- Back arrow) + About + Projects

// My name container & text
const NameContainer = styled.div`
  text-align: center;
  /* height: "40%";
  display: flex;
  flex-direction: column;
  text-align: center; */
`;

const NameText = styled.p`
  font-size: 14em;
  @media (max-width: 768px) {
    font-size: 10em;
  }
`;

/* END */

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

const TextContainer = styled.div`
  display: flex;
  padding: 2rem;
  /* @media (max-width: 768px) {
      align-items: center;
      flex-direction: column;
    } */
`;

const ImageContainer = styled.div`
  display: flex;
  padding: 2rem;
  width: 100%;
`;

const ProfileImage = styled.img`
  display: block;
  @media (max-width: 768px) {
    max-width: 100% !important;
  }
`;

const AboutPage: React.FC<IPage> = (props) => {
  useEffect(() => {
    logging.info(`Loading ${props.name}`);
  }, [props.name]);

  return (
    <Wrapper>
      <Container>
        <NameContainer>
          <NameText>About</NameText>
        </NameContainer>
        <GroupContainer>
          <TextContainer>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed
              enim eros. Aliquam tempus turpis ac sem commodo, vitae pharetra
              ante mollis. Aliquam suscipit vehicula neque eu accumsan. Aliquam
              erat volutpat. Nam consectetur fermentum pretium. Mauris et tellus
              risus. Pellentesque sit amet imperdiet massa. Vestibulum lacinia
              malesuada elit, ut auctor ligula maximus nec. Donec efficitur,
              augue ac laoreet porta, eros risus aliquam purus, sit amet semper
              purus ex condimentum nunc. Donec finibus ac ligula quis porttitor.
              Aenean turpis metus, molestie a lectus quis, fermentum molestie
              neque. Nulla orci ex, mattis nec enim ac, varius venenatis velit.
              Nunc molestie bibendum velit, id elementum quam rutrum vel. Nam
              pretium neque et ligula luctus consectetur. Donec volutpat nibh
              mi, egestas accumsan urna interdum a. Duis ac pellentesque leo,
              quis viverra sapien.
            </p>
          </TextContainer>
          <ImageContainer>
            <ProfileImage
              alt="profile"
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            />
          </ImageContainer>
        </GroupContainer>
      </Container>
    </Wrapper>
  );
};

export default AboutPage;
