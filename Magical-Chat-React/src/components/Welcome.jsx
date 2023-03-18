import React, { useContext } from 'react'
import { UserContext } from '../view/Chat';
import styled from 'styled-components'
import robot from '../assets/picture/robot.gif'
import { github } from '../utils/api'

function Welcome() {

  const { currentUser } = useContext(UserContext)

  return (
    <Container>
      <a href={github} lang="en" > <img src={robot} alt='Robot' lang='en' ></img></a>
      <h1>
        <span>Welcome , {currentUser?.username} !</span>
      </h1>
      <h3>
        Please select a chat to Start Magical Chat.
      </h3>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  gap: 1rem;
  img{
    height: 25rem;
  }
  span{
    font-weight: 400;
    font-family: STXingkai;
  }
  
  @media screen and (min-width:300px) and (max-width:720px){
      display: none;
    }
  
`
export {
  Welcome
} 