import React from 'react'

import { useState ,useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { setAvatarRouter } from '../utils/ApiRoutes';
import {  toastOptions } from "../utils";
import axios from 'axios';

const useAvater = (selectAvatar)=>{

  const api = `https://api.multiavatar.com`;

  const navigate = useNavigate();

  const [ avatars ,setAvatars] = useState([]);

  const [ isLoading ,setIsLoading] = useState(true);

  // 注册之前或者选头像之后 自动重定向到登录页面
  useEffect(()=>{
  const user = JSON.parse(localStorage.getItem('chat-app-user'));
  if( ! user || user.avatarImage ){
    navigate('/login')
  }},[])  

  const setProfilePicture = async() =>{ 
    if(selectAvatar === undefined) {
      toast.error("选一个头像吧~",toastOptions);
      return ;
    }  
    // 获取id
    const user = await JSON.parse(localStorage.getItem('chat-app-user'));
    
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

    // 加载动画
    setTimeout(() => {
      setIsLoading(false)
    }, 1000);
  }

  useEffect(() =>{
    setPicture()
  },[])

  return { isLoading , avatars , selectAvatar , setProfilePicture}
}

export {
  useAvater
}