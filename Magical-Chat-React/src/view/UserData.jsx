import React from 'react'
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { setAvatarRouter } from 'utils/api';
import styled from 'styled-components'
import { toastOptions } from "utils";
import axios from 'axios';
import { Button } from './Login';
import { setNameRouter } from 'utils/api';

export default function UserData() {

  const navigate = useNavigate();

  const [avatar, setavatar] = useState("")

  const user = JSON.parse(localStorage.getItem('chat-app-user'));

  const [name, setName] = useState(user.username)

  // const [gitHub,setGitHub] = useState("")

  const [qqAvater, setqqAvater] = useState(user.avatarImage)

  const handleSumbit = async (event) => {
    event.preventDefault()
    const url = `https://q2.qlogo.cn/headimg_dl?dst_uin=${avatar[avatar.length - 1]}&spec=100`
    setqqAvater(url)
  }

  const handleChangeCount = async (event) => {
    setavatar([...avatar, event.target.value])
  }

  const handleChangeName = async (event) => {
    setName([...name, event.target.value])
  }

  const handleClick = async () => {

    // 获取id
    // 将头像与id传给数据库
    const username = name[name.length - 1];


    if (name !== user.username) {

      const { data } = await axios.post(`${setNameRouter}/${user.id}`, {
        username: username
      })

      const { code, message } = data


      if (code === 0) {
        user.username = username;
        // 将头像信息设置到 localStorage里面
        localStorage.setItem('chat-app-user', JSON.stringify(user))
        navigate('/chat')
      } else {
        toast.error(message, toastOptions);
      }
    }

    if (qqAvater !== user.avatarImage) {

      const { data } = await axios.post(`${setAvatarRouter}/${user.id}`, {
        avatarImage: qqAvater
      })
      // 头像设置成功
      if (data.code === 0) {
        user.avatarImage = qqAvater;
        // 将头像信息设置到 localStorage里面
        localStorage.setItem('chat-app-user', JSON.stringify(user))
        // navigate('/chat')
        navigate('/chat')
      }

    }

  }

  return (
    <Container>
      <ToastContainer />
      <div className="title-container">
        <h1>

        </h1>
      </div>

      <div className="avatar" >
        <img src={`${qqAvater === URL ? URL : qqAvater}`}></img>
      </div>
      <div className='dataform'>
        <form onSubmit={(event) => handleSumbit(event)}>
          <div className="title-input">
            <Input
              type='text'
              placeholder="输入你的QQ号"
              name="count"
              onChange={e => handleChangeCount(e)} />
            <Button type='sumbit'>
              点击预览
            </Button>
          </div>
        </form>

        <div className="title-name">
          <Input
            type='text'
            style={{ width: '21.9rem' }}
            placeholder="修改你的用户名"
            name="username"
            onChange={e => handleChangeName(e)} />
        </div>

        <button className='databtn' type='sumbit' onClick={handleClick}>确认保存 </button>
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
      form{
        display: flex ;
        flex-direction: column;
        gap: 3rem;
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
    border: 1px solid rgb(19,19,36);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s ease-in-out;
      img {
        background-color: #fff;
        border-radius:3rem;
        height: 6rem ;
        width: 6rem;
        transition: 0.5s ease-in-out;
      } 
  }
`

const Input = styled.input`
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
`