import React, { useEffect, useState,useRef } from "react";
import styled  from 'styled-components';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { allUserRouter } from "../utils/ApiRoutes";
import { Contacts } from "../components/Contacts";
import { Welcome }  from './../components/Welcome';
import ChatContainer from "../components/ChatContainer";
import { io } from 'socket.io-client'
import { host } from './../utils/ApiRoutes';
function Chat (){

  const socket = useRef();

  const [ contacts ,setContact] = useState([]);

  const [ currentUser , setCurrentUser] = useState(undefined);
  
  const [ currentChat, setCurrentChat ] = useState(undefined)

  const [ isLoaded ,setIsLoaded ] = useState(false)

  const navigate = useNavigate();
  
  // 建立socket连接,将当前用户信息传给后端
  try {
    useEffect(()=>{
      if(currentUser){
        socket.current = io("ws://chat.magicalboy.cn:8000")
        socket.current.emit("add-user",currentUser.username)
      }
    },[currentUser])
  } catch (error) {
    console.log(error)
  }


  //  destroy is not a function
  const midSetCurrentUser = async ()=>{
    if(!localStorage.getItem('chat-app-user')){
      navigate('/login')
    }else{
      setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')))
      setIsLoaded(true)
    }
  }
  // 必须封装成函数
  useEffect(()=>{midSetCurrentUser()},[]) 

  
  const midSetContact = async ()=>{
    if(currentUser ){

      if(currentUser.avatarImage){
        
        const { data } = await axios.get(`${allUserRouter}/${currentUser.id}`)
        
        const { allUser } = data
      
        setContact([...allUser])

      }else{
        navigate('/avater')
      }
    }
  }

  useEffect(()=>{midSetContact()},[currentUser])

  
  const handleChatChange = (chat) =>{
    setCurrentChat(chat);
  }

  return (
    <Container>
      <div className="container">
        <Contacts contacts = {contacts} currentUser ={currentUser} changeChat = {handleChatChange}/> 
        {
          isLoaded && 
            currentChat === undefined ? (
              <Welcome currentUser = {currentUser} ></Welcome>
            ):(
              <ChatContainer currentChat = {currentChat} currentUser = { currentUser } socket={socket}/>
            )
        }
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