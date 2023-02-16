import React from 'react'
import { Link } from "react-router-dom";
import loader from "../assets/loader.gif";
import { useState ,useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer,toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { setAvatarRouter } from '../utils/ApiRoutes';
import styled from 'styled-components'
import { handleValidation, toastOptions } from "../utils";
import { Buffer} from 'buffer'
import axios from 'axios';
import { network } from "../network";
import { Button } from './Login';
import Github from './../components/Github';

export default function UserData() {
  
  const navigate = useNavigate();

  const [avatar,setavatar] = useState("")
  // const [gitHub,setGitHub] = useState("")

  const URL = `https://q2.qlogo.cn/headimg_dl?dst_uin=undefine&spec=100`
  
  const [ qqAvater , setqqAvater ] = useState(URL)


  const handleSumbit = async( event ) =>{

    event.preventDefault()

    const url = `https://q2.qlogo.cn/headimg_dl?dst_uin=${avatar[avatar.length - 1]}&spec=100`

    setqqAvater(url)
    
  }
  
  const handleChange = async ( event ) =>{
    setavatar([...avatar,event.target.value])
    console.log(avatar)
  }
  const getGithub = (url) =>{

  }
  const handleClick = async (  ) =>{
    try {
      // 获取id
      const user = await JSON.parse(localStorage.getItem('chat-app-user'));
      
      console.log(user.id)

      // 将头像与id传给数据库
      const { data } = await axios.post(`${setAvatarRouter}/${user.id}`,{
        avatarImage:qqAvater
      })
      const { code  } = data

      // 头像设置成功
      if( code === 0 ){

        user.avatarImage = qqAvater;

        // 将头像信息设置到 localStorage里面
        localStorage.setItem('chat-app-user',JSON.stringify(user))

        navigate('/chat')
      }
      
    } catch (error) {
      toast.error("设置有误，请重试~",toastOptions);
    }
  }
    
  return (
     <Container>
        <div className="title-container">
            <h1>

            </h1>
        </div>

        <div className="avatar" >
              <img src={`${qqAvater === URL ? URL : qqAvater }`}></img>
        </div>
        <div className='dataform'>
            <form onSubmit={(event) => handleSumbit(event)}>
                <div className="title-input">
                  <input 
                    type='text' 
                    placeholder="输入你的QQ号" 
                    name="count" 
                    onChange={e => handleChange(e)} />
                    <Button type='sumbit'>
                    点击预览
                    </Button>
              </div>
            </form>
        <button  className='databtn' type='sumbit' onClick={handleClick}>确认保存 </button>
       </div>
    </Container>
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
