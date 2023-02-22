import React, { useEffect, useState,useRef } from "react";
import styled  from 'styled-components';
import { Contacts } from "../components/Contacts";
import { Welcome }  from './../components/Welcome';
import ChatContainer from "../components/ChatContainer";
import { io } from 'socket.io-client'
import { SOCKETHOST } from './../utils/ApiRoutes';
import {  useCurrentUser } from "../utils/Chat";
function Chat (){

  const socket = useRef();
  
  const [ currentChat, setCurrentChat ] = useState(undefined)

  const [showWelcome,setShowWelcome] = useState(true)

  const {isLoaded, currentUser , contacts } = useCurrentUser()

  // 建立socket连接,将当前用户信息传给后端
  useEffect(()=>{
    if(currentUser){
      socket.current = io(SOCKETHOST)
      socket.current.emit("add-user",currentUser.username)
    }
  },[currentUser])

  const handleChatChange = (chat) => setCurrentChat(chat)
 
  const handleWelcome = (showWelcome) => setShowWelcome(showWelcome);

  const [show,setShow] = useState(true)

  // const [showUser,setShowUser] = useState(true)
  // const handleShow = (show) => { 
  //   setShow(show) ;
  // }
  // useEffect(()=>{
  //   if (window.screen.availWidth > 300 && window.screen.availWidth < 720 && show) {
  //     // 当前设备是移动设备
  //     setShowUser(false)
  //   }
  // },[show])
  
  // useEffect(()=>{
  //   if (window.screen.availWidth > 300 && window.screen.availWidth < 720 ) {
  //     // 当前设备是移动设备
  //     setShow(false)
  //   }
  // },[window.screen.availWidth])
  
  return (
    <Container>
      <div className="container">
        {/* {
          showUser &&
          <Contacts changeChat = {handleChatChange} handleWelcome={handleWelcome} handleShow={handleShow}/> 
        } */}
        <>
        <Contacts changeChat = {handleChatChange} handleWelcome={handleWelcome}/> 

          {
            show && (
              !showWelcome|| ( isLoaded   &&
                currentChat === undefined )? (
                  <Welcome  currentUser = {currentUser} ></Welcome>
                ):(
                  <ChatContainer  currentChat = {currentChat} currentUser = { currentUser } socket={socket}/>
                )
            )
          }
        </>
      </div>
    </Container>
  )
}
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
     @media screen and (min-width:720px) and (max-width:1080px){
      grid-template-columns: 45% 55% 
     }
     @media screen and (min-width:300px) and (max-width:720px){
      grid-template-columns: 100% 
     }
  }
`
export default Chat