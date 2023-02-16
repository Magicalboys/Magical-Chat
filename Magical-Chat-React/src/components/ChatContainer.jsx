import React from 'react'
import styled from 'styled-components'
import ChatInput from './ChatInput';
import Logout from './Logout';
import axios  from 'axios';
import { addMessageRouter, getMessageRouter } from './../utils/ApiRoutes';
import { useEffect } from 'react';
import { useState , useRef} from 'react';
import { v4 as uuidv4 } from 'uuid'
export default function ChatContainer({ currentChat , currentUser ,socket}) {

  const [ messages , setMessages ] = useState([])
  const [ arrivalMessage , setArrivalMessage ] = useState(null)
  
  const scrollRef = useRef()

  // 获取消息
  const getMegs = async() => {
    if( currentChat && currentUser ){
      const { data }  = await axios.post(getMessageRouter,{
      from:currentUser.username,
      to:currentChat.username,
      })
      const { data:Megs } = data
      setMessages( Megs );
    }
  } 

  useEffect(() => { getMegs() } , [currentChat])

  // 将消息存入数据库
  const  handleSendMsg = async (msg) =>{
    await axios.post(addMessageRouter,{
          from:currentUser.username,
          to:currentChat.username,
          msg:msg,
    })
    // 将消息通过socket发送到后端
    socket.current.emit("send-msg",{
      to:currentChat.username,
      from:currentUser.username,
      message:msg
    })

    const msgs = [...messages];

    msgs.push({sender:currentUser.username,message:msg})

    setMessages(msgs)
  }
  //接收消息
  useEffect(()=>{
    if( socket.current ){
      socket.current.on('msg-recieve',(msg) =>{
        setArrivalMessage({users:currentChat.username,message:msg})
      })
    }
  },[])
  // 将接收到的消息放入数组里
  useEffect(()=>{
    arrivalMessage && setMessages((prev) =>[...prev,arrivalMessage])
  },[arrivalMessage])

  // scrollIntoView方法是将调用它的元素滚动到浏览器窗口的可见区域
  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behaviour:"smooth"});
  },[messages])

  return (
    <>
      {
        currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img src={currentChat?.avatarImage}></img>
              </div>
              <div className="username">
                <h2>{currentChat?.username}</h2>
              </div>
            </div>
            <Logout/>
          </div>
          <div className="chat-messages">
            {
              messages.map(message =>{
                return(
                  <div ref={scrollRef} key={uuidv4()}>
                      <div className={` message ${message.sender === currentUser.username ? "sended": "recieved"}` }>
                        <div className="content">
                          <p>
                            {message.message}
                          </p>
                        </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
            <ChatInput handleSendMsg = { handleSendMsg } />
        </Container>
        )
      }
    </>
  )
}
const Container = styled.div`
  display: grid;
  overflow: hidden;
  padding-top:1rem;
  overflow: hidden;
  grid-template-rows: 10% 81% 10%;
 
  .chat-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img{
          height: 4rem;
          border-radius: 3rem;
        }
      }
      .username {
        h2{
          color: white;
        }
      }  
    }
  }
  .chat-messages {
      gap:1rem;
      padding: 1rem 2rem;
      display: flex;
      flex-direction: column;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 0.2rem;
        &-thumb {
          background-color: #ffffff39;
          border-radius: 1rem;
          width: 0.1rem;
        }
      }
      .message {
        display: flex;
        align-items: center;
        .content{
          max-width:40%;
          overflow-wrap:break-word;
          padding: 1rem;
          font-size: 1.1rem;
          border-radius:1rem;
          color:#d1d1d1;
        }
      }
      .sended{
        justify-content: flex-end;
        .content {
          background-color: #4f04ff21;
        }
      }
      .recieved {
        justify-content: flex-start;
        .content {
          background-color: #9900ff20;
        }
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 77% 10%;
  }
    @media screen and (min-width:300px) and (max-width:720px){
      grid-template-rows: 12% 73% 15%;
      .chat-messages{
      height: 25rem;
      .user-details {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
    }
        .avatar {
          img{
            height: 2rem !important;
          }
        }
      .username {
        h2{
          color: white;
        }
      }   
  }
`