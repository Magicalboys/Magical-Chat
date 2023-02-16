import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }) {

  // 保存消息
  const [msg, setMsg] = useState("");
  
  // 显示表情框
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  // 将表情存入消息中
  const handleEmojiClick = (emoji,event) => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };
  // 将消息发送
  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };
  

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 2% 98%;
  background-color: #080420;
  padding: 0 2rem;
  gap: 1rem;
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .epr-main{
        position: absolute;
        top: -250px;
        height: 220px !important;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .epr-body::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .epr-header-overlay{
          display: none !important;
        }
        .epr-emoji-category-label{
          display: none !important;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    height:80%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    
    button {
      height: 100%;
      padding: 0.5rem 2.7rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      svg {
        font-size: 1.7rem;
        color: white;
      }
    }
  }

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-columns: 3% 97%;
    padding: 0 1rem;
    gap: 1rem;
    height: 75%;
    button {
      height: 100%;
      svg {
        font-size: 1rem ;
        color: white;
      }
    }
  }

  @media screen and (min-width:300px) and (max-width:720px){
    .button-container {
      display: flex;
      align-items: center;
      color: white;
      gap: 1rem;
      .emoji {
        position: relative;
        svg {
          font-size: 1.5rem;
          color: #ffff00c8;
          cursor: pointer;
        }
        .epr-main{
        position: absolute;
        top: -250px;
        height: 220px !important;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .epr-header-overlay{
          display: none !important;
        }
        .epr-emoji-category-label{
          display: none !important;
        }
      }
    }
    button {
      height: 100%;
      padding: 0.8rem 0.9rem !important;
      svg {
        font-size: 1rem !important;
        color: white;
      }
    }
  }
}
`