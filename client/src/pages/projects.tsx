import React, { useContext, useEffect, useState } from "react"
import IPage from "../interfaces/page"
import logging from "../config/logging"

import styled from "styled-components"

import {
  primaryColor,
  primaryShade,
  primaryText,
  secondaryColor,
} from "../colors/colors"

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faCaretDown } from "@fortawesome/free-solid-svg-icons"

// Route
import { Link } from "react-router-dom"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { ProjectItem } from "../components"

import { WebsiteContext } from "../contexts/website"
import { IProject } from "../models"

import projectService from "../services/projects"

const Wrapper = styled.div`
  height: 100%;
  background-color: ${primaryColor};
`

const Container = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  justify-content: space-around;
`

// My name container & text
const NavBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const NavBarBack = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`

const NavBarItem = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 2rem;
    flex: 1;
  }
`

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
`

const Breakline = styled.div`
  height: 0.5rem;
  background-color: ${primaryShade};
`

const ListContainer = styled.div`
  display: grid;
  margin: 2rem 2rem;
  grid-auto-columns: minmax(60rem, auto);
  grid-template-columns: repeat(auto-fill, minmax(60rem, 1fr));
  grid-gap: 2rem;

  @media (max-width: 768px) {
    grid-auto-columns: minmax(60rem, auto);
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  }
`

const ProjectsPage: React.FC<IPage> = (props) => {
  const [projects, setProjects] = useState<Array<IProject>>([])

  useEffect(() => {
    const getData = async () => {
      projectService.getAll().then((projects) => {
        setProjects(projects)
      })

      logging.info(`Loading ${props.name}`)
    }
    getData()
  }, [props.name])

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
        <ListContainer>
          {projects?.map((item) => (
            <ProjectItem item={item} />
          ))}
        </ListContainer>
      </Container>
    </Wrapper>
  )
}

export default ProjectsPage
