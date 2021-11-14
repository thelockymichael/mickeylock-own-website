import React, { useEffect } from "react";
import IPage from "../interfaces/page";
import logging from "../config/logging";
import { Link, RouteComponentProps } from "react-router-dom";
import styled from "styled-components";

import { primaryColor, primaryText, secondaryColor } from "../colors/colors";

const AboutPage: React.FC<IPage & RouteComponentProps<any>> = (props) => {
  useEffect(() => {
    logging.info(`Loading ${props.name}`);
  }, [props.name]);

  const Wrapper = styled.div`
    height: 70rem;
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

  const TextContainer = styled.div`
    display: flex;
    flex: 1;
    /* @media (max-width: 768px) {
      align-items: center;
      flex-direction: column;
    } */
  `;

  const ImageContainer = styled.div`
    display: flex;
    flex: 1;
  `;

  return (
    <Wrapper>
      <NameContainer>
        <NameText>About</NameText>
      </NameContainer>
      <GroupContainer>
        <TextContainer>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed
            enim eros. Aliquam tempus turpis ac sem commodo, vitae pharetra ante
            mollis. Aliquam suscipit vehicula neque eu accumsan. Aliquam erat
            volutpat. Nam consectetur fermentum pretium. Mauris et tellus risus.
            Pellentesque sit amet imperdiet massa. Vestibulum lacinia malesuada
            elit, ut auctor ligula maximus nec. Donec efficitur, augue ac
            laoreet porta, eros risus aliquam purus, sit amet semper purus ex
            condimentum nunc. Donec finibus ac ligula quis porttitor. Aenean
            turpis metus, molestie a lectus quis, fermentum molestie neque.
            Nulla orci ex, mattis nec enim ac, varius venenatis velit. Nunc
            molestie bibendum velit, id elementum quam rutrum vel. Nam pretium
            neque et ligula luctus consectetur. Donec volutpat nibh mi, egestas
            accumsan urna interdum a. Duis ac pellentesque leo, quis viverra
            sapien.
          </p>
        </TextContainer>
        <ImageContainer>
          <img
            alt="profile"
            src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          />
        </ImageContainer>
      </GroupContainer>
    </Wrapper>
  );
};

export default AboutPage;
