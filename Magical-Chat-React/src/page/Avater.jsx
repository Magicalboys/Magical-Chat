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

export default function Avater() {
  
  const api = `https://api.multiavatar.com`;

  const navigate = useNavigate();

  const [ avatars ,setAvatars] = useState([]);
  const [ isLoading ,setIsLoading] = useState(true);
  const [ selectAvatar,setSelecteAvater] = useState((undefined))
  // 注册之前或者选头像之后 自动重定向到登录页面
  useEffect(()=>{
  const user = JSON.parse(localStorage.getItem('chat-app-user'));
  if( ! user || user.avatarImage ){
    navigate('/login')
  }
  },[])  


  const setProfilePicture = async() =>{ 
    if(selectAvatar === undefined) {
      toast.error("选一个头像吧~",toastOptions);
      return ;
    }  
    try {
      // 获取id
      const user = await JSON.parse(localStorage.getItem('chat-app-user'));
      
      console.log(user.id)

      // 将头像与id传给数据库
      const { data } = await axios.post(`${setAvatarRouter}/${user.id}`,{
        avatarImage:avatars[selectAvatar]
      })
      const { code,image } = data

      // 头像设置成功
      if( code === 0 ){

        user.avatarImage = image;

        // 将头像信息设置到 localStorage里面
        localStorage.setItem('chat-app-user',JSON.stringify(user))

        navigate('/chat')
      }
      
    } catch (error) {
      toast.error("设置有误，请重试~",toastOptions);
    }
  }

  const setPicture = async () =>{
    const data = [];
    for( let i = 0 ; i < 3 ; i ++){

    // 根据随机数生成矢量图
    const URL = await `${api}/${Math.round(Math.random() * 1000 )}.png`
    
    // 将头像的URL存入数组
    data.push(URL)
    
    }
    setAvatars(data);
    // 加载 1 秒动画
    setTimeout(() => {
      setIsLoading(false)
    }, 1000);
  }

  useEffect(() =>{
    setPicture()
  },[])
  return (
    <>
    {
      isLoading ? <Container>
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
    }
      <ToastContainer/>
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
