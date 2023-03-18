import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import ChatInput from './ChatInput';
import Logout from './Logout';
import { Image } from '../utils';
import { groupMessage, userMessage } from '../hooks/Message';
import { useAllMessage, useGetMessage } from '../hooks/GetMessage';
import { useCurrentUser } from '../hooks/Chat';
import { UserContext } from '../view/Chat';
export default function ChatContainer() {

  const { currentUser, currentChat, socket } = useContext(UserContext)

  const [sendChater, setSendChater] = useState(currentChat)

  const { messages, handleSendMsg, scrollRef } = useGetMessage({ currentChat, currentUser, socket, sendChater })

  const { contacts } = useCurrentUser()

  const { messages: Gmessages, handleSendMsg: GhandleSendMsg, scrollRef: GscrollRef }

    = useAllMessage({ contacts })

  return (
    <>{
      currentChat && (
        <Container className="hide">
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img src={`${currentChat.id > 5 ? currentChat?.avatarImage : Image[currentChat.id]}`}></img>
              </div>
              <div className="username">
                <h2>{currentChat?.username}</h2>
              </div>
            </div>
            <Logout />
          </div>
          <div className="chat-messages">
            {
              currentChat.id > 5 ?
                userMessage({ messages, scrollRef, currentUser, currentChat })
                : groupMessage({ Gmessages, GscrollRef, currentUser, currentChat })
            }
          </div>
          {
            currentChat.id > 5 ?
              <ChatInput handleSendMsg={handleSendMsg} currentSendChat={currentChat} setSendChater={setSendChater} />
              : <ChatInput handleSendMsg={GhandleSendMsg} currentSendChat={currentChat} setSendChater={setSendChater} />
          }
        </Container>
      )
    }</>
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
          width: 4rem;
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
        gap:0.5rem;
        align-items: center;
        h3{
          color: white;
          display: block;
        }
          img{
            height: 2.5rem;
            border-radius: 3rem;
          }
        .content{
          max-width:40%;
          overflow-wrap:break-word;
          padding: 0.8em;
          font-size: 1.1rem;
          border-radius:0.7rem;
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
      h5{
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {

    grid-template-rows: 15% 77% 10%;

  }
  
    @media screen and (min-width:300px) and (max-width:720px){
      display: none;
      grid-template-rows: 10% 100% 5%;
      height: 100%;
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