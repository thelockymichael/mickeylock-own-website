import React, { useState } from "react"

import styled from "styled-components"
import {
  infoSectColor,
  infoTextColor,
  primaryColor,
  primaryShade,
  primaryText,
  secondaryColor,
  secondaryText,
  tagColor,
} from "../../colors/colors"

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons"

// Route
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { IProject } from "../../models"

const ListItem = styled.div`
  background: ${primaryShade};
  font-size: 2rem;
  text-align: center;
  position: relative;
`

const ListItemImg = styled.div``

const Image = styled.img`
  /* display: block;
  width: 100%; */

  width: 100%;
  max-height: 100%;
  left: 50%;
  top: 50%;
  height: 100%;
  object-fit: cover;
  /** */
  /* @media (max-width: 768px) {
    max-width: 100% !important;
  } */
`

const ListItemRows = styled.div`
  display: flex;
  flex-direction: column;
`

// TOP
const ListItemTop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1.5rem 1.5rem;
`

const TagItem = styled.div`
  margin: 0.5rem;
  background: ${tagColor};
  color: ${secondaryText};
  padding: 1rem;
  border-radius: 1rem;
  font-size: 2rem;
  text-align: center;
`

const InfoSection = styled.div`
  background-color: ${infoSectColor};
  width: 100%;
  height: 30%;

  border-radius: 0rem 0rem 2rem 2rem;

  position: absolute;
  left: 50%;
  bottom: -44%;
  transform: translate(-50%, -50%);

  z-index: 10;

  @media (max-width: 768px) {
    height: 70%;
    bottom: -104%;
  }
`

const InfoText = styled.p`
  font-size: 1em;
  font-weight: 400;
  color: ${infoTextColor};
  text-align: left;
  padding: 1rem;
`

const IconButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`

const IconContainer = styled.div`
  display: flex;
  padding: 0rem 2rem;
`

const TitleGithubButton = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 2rem 2rem;
  justify-content: space-between;
`

const TitleContainer = styled.div``

const TitleText = styled.p`
  font-size: 2em;
  color: ${primaryText};
  @media (max-width: 768px) {
    font-size: 1.25em;
    font-weight: 400;
  }
`

const GitHubButton = styled.div`
  display: flex;
  align-items: center;
  background-color: ${primaryColor};
  border-radius: 2rem;
  width: 100%;
  padding: 1rem;
`

const GitHubText = styled.p`
  font-size: 2em;
  @media (max-width: 768px) {
    font-size: 0.5em;
  }
`

const AHref = styled.a`
  color: ${primaryText};
  text-decoration: none;
  text-align: center;
  width: 100%;
`

export type IProjectItemProps = {
  item: IProject
}

const ProjectItem: React.FC<IProjectItemProps> = ({ item }) => {
  const [show, setShow] = useState<boolean>(false)

  let src: string = "https://via.placeholder.com/700x400"
  if (item.image) {
    let imgType = item.image?.imgType
    let img = item.image?.img
    let dataBase64
    if (img) dataBase64 = img.data
    const data = Buffer.from(dataBase64).toString("base64")
    src = `data:${imgType};charset=utf-8;base64,${data}`
  }

  return (
    <ListItem>
      <ListItemImg>
        <Image
          alt="background"
          src={
            src ||
            "https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg"
          }
        />
      </ListItemImg>
      <ListItemRows>
        <ListItemTop>
          <IconButton onClick={() => setShow(!show)}>
            <IconContainer>
              <FontAwesomeIcon
                size="3x"
                color={secondaryColor}
                icon={!show ? faCaretDown : faCaretUp}
              />
            </IconContainer>
          </IconButton>

          <TitleGithubButton>
            <TitleContainer>
              <TitleText>{item.name}</TitleText>
            </TitleContainer>
            <div>
              <AHref href={item.gitHubLink || "https://github.com/"}>
                <GitHubButton>
                  <FontAwesomeIcon
                    size="2x"
                    color={secondaryColor}
                    icon={faGithub}
                  />
                  <GitHubText>
                    {item.gitHubLink ? "GitHub" : "No link"}
                  </GitHubText>
                </GitHubButton>
              </AHref>
            </div>
          </TitleGithubButton>
        </ListItemTop>
        <TagContainer>
          {item.tags!!.map((item) => (
            <TagItem>{item}</TagItem>
          ))}
        </TagContainer>
        {show && (
          <InfoSection>
            <InfoText>{item.description}</InfoText>
          </InfoSection>
        )}
      </ListItemRows>
    </ListItem>
  )
}

export { ProjectItem }
