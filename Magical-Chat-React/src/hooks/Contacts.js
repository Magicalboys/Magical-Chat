
import React from 'react'
import { useState, useContext } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../view/Chat';

const useContacts = () => {

  const { currentUser, handleChatChange, handleWelcome } = useContext(UserContext)

  const [currentUserName, setCurrentUserName] = useState(undefined)

  const [currentUserImage, setCurrentUserImage] = useState(undefined)

  const [currentSelected, setCurrentSelected] = useState(undefined)

  const navigate = useNavigate();

  // 更新自己的头像和名字
  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage)
      setCurrentUserName(currentUser.username)
    }
  }, [currentUser])

  // 高亮选中的消息框
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index)
    // console.log(contact)
    handleChatChange(contact)
    handleWelcome(true)
  }

  const ClickAvatar = () => {
    navigate('/userdata')
  }
  const ClickName = () => {
    handleWelcome(false)
  }

  return { currentUserName, currentUserImage, currentSelected, changeCurrentChat, ClickAvatar, ClickName }
}

export {
  useContacts
}