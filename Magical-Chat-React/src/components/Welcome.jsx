import React from 'react'
import styled from 'styled-components'
import robot from '../assets/robot.gif'
function Welcome({currentUser}) {

  return (
    <Container>
      <img src={robot} alt='Robot'></img>
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
  
`
export {
  Welcome
} 