import React from 'react'
import loader from "../assets/loader.gif";
import { useState  } from "react";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import styled from 'styled-components'
import { Button } from './Login';
import { useAvater } from '../utils/Avater';

export default function Avater() {
  
  const [ selectAvatar , setSelecteAvater] = useState((undefined))
  
  const { isLoading , avatars , setProfilePicture } = useAvater(selectAvatar)

  return (
    <>
    { isLoading ? <Container>
        <img src={loader} alt ='loader' className='loader'/>
      </Container> : (
        <Container>
          <div className="title-container">
            <h1>
             选择一个你喜欢的头像~
            </h1>
          </div>
            <div className="avatars">
              {
                avatars.map((avatar,index) => {
                  return (
                    <div
                    key={index}
                    id={index}
                    className={`avatar ${selectAvatar === index ? "selected":""}`
                    }>
                    <img 
                    src = {`${avatar}`}
                    alt = "avatar"
                    onClick={() =>setSelecteAvater(index)}
                    />
                    </div>
                  )
  
                })
              }
            </div>
             <Button onClick={setProfilePicture}>
                 Set this as my pictrue
             </Button>
        </Container>
      )
    }  <ToastContainer/>
    </>
  )
}
const Container = styled.div` 
display: flex ;
justify-content: center;
align-items: center;
flex-direction: column;
gap: 3rem;
background-color: #131324;
height: 100vh;
width: 100vw;
.loader{
  max-inline-size: 100%;
}
.title-container{
  h1{
    color: white;
  }
}
.avatars {
  display: flex;
  gap: 2rem;
   .avatar {
      border: 0.4rem solid transparent;
      padding:0.4rem;
      border-radius:5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem ;
        transition: 0.5s ease-in-out;
      }
   }
   .selected{
    border: 0.4rem solid #4e0eff;
   }
}`
