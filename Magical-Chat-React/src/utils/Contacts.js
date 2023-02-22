
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const useContacts = ({currentUser,changeChat,handleWelcome})=>{
  const [currentUserName,setCurrentUserName] = useState(undefined)

  const [currentUserImage,setCurrentUserImage] = useState(undefined)

  const [currentSelected,setCurrentSelected] = useState(undefined)
  

  const navigate = useNavigate();
  // 更新自己的头像和名字
  useEffect(()=>{
    if(currentUser){
      setCurrentUserImage(currentUser.avatarImage)
      setCurrentUserName(currentUser.username)
    }
  },[currentUser])

  // 高亮选中的消息框
  const changeCurrentChat = (index,contact) =>{
    setCurrentSelected(index)
    // console.log(contact)
    changeChat(contact)
    handleWelcome(true)
  }

  const ClickAvatar = () =>{
    navigate('/userdata')
  } 
  const ClickName = () =>{
    handleWelcome(false)
  }

  return {currentUserName,currentUserImage ,currentSelected ,changeCurrentChat ,ClickAvatar,ClickName}
}

export {
  useContacts
}