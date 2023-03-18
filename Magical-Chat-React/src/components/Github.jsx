import React from 'react'
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '../view/Login';

export default function Github({ getGithub }) {

  const navigate = useNavigate();

  const [avatar, setavatar] = useState("")

  const [qqAvater, setqqAvater] = useState("")


  const handleChange = async (event) => {
    setavatar([...avatar, event.target.value])
    setqqAvater(avatar[avatar.length - 1])
  }
  getGithub(qqAvater)

  return (
    <Container>
      <div className='dataform'>
        <div className="title-input">
          <input
            type='text'
            placeholder="输入你的GitHub地址"
            name="Github"
            onChange={e => handleChange(e)} />

          <Button type="link" >
            <a href={`${qqAvater}`} target="_blank">点击跳转</a>
          </Button>
        </div>
      </div>
    </Container>
  )
}
const Container = styled.div` 
    .dataform{
      display: flex ;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 3rem;
      .title-input{
      input{
          background-color: transparent;
          padding: 1rem;
          border: 0.1rem solid #4e0eff;
          border-radius: 0.4rem;
          color: white;
          width: 60%;
          font-size: 1.2rem;
          &:focus{
            border: 0.1rem solid #997af0;
            outline: none;
          }
        }    
      }
      .databtn{
          background-color: #997af0;
          color: white;
          font-weight: bold;
          padding: 1rem 9rem;
          cursor: pointer;
          
          border-radius:0.4rem;
          font-size: 1rem;
          text-transform: uppercase;
          transform: 0.5s ease-in-out;
          &:hover{
          background-color: #4e0eff;
        }
      }     
    }
    
    
   .avatar {
    height: 6rem ;
    width: 6rem;
    border-radius:3rem;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s ease-in-out;
      img {
        background-color: #fff;
        border-radius:3rem;
        transition: 0.5s ease-in-out;
      } 
  }
`
