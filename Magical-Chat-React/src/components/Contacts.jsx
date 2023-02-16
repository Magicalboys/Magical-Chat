import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import  styled  from 'styled-components';
import { useNavigate } from 'react-router-dom'

function Contacts({contacts,currentUser,changeChat}) {

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
    changeChat(contact)
  }

  const handleClick = () =>{
    navigate('/userdata')
  }

  return (
    <>
      {
        currentUserImage && currentUserName &&
        <Container>
          <div className="brand">
              <h2>Macgical CHAT</h2>           
          </div>
          <div className="contacts">
            
            {
              contacts.map((contact,index)=>{
                return(
                  <div
                  className = {`contact  ${index === currentSelected ? "selected" : "" }`}
                  key={index}
                  onClick={()=>changeCurrentChat(index,contact)}
                  draggable
                  >
                    <div className="avatar">
                      <img src={`${contact.avatarImage}`} alt={`${contact.username}`}></img>
                    </div>
                    <div className="username">
                      <h2>{contact.username}</h2>
                    </div>
                  </div>
                )
              })
            }
        
          </div>
          <div className="current-user">
              <div className="avatar" onClick={handleClick}>
                  <img src={`${currentUserImage}` }></img>
                  </div>
                  <div className="username">
                    <h1>{currentUserName}</h1>
               </div>
          </div>
        </Container>
          
        }
    </>
  )
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15% ;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap:1rem;
    h2{
      color:white;
      text-transform:uppercase
    }
  }
  .contacts{
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 1rem;
    &::-webkit-scrollbar{
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact{
      background-color: #ffffff39;
      min-height: 15%;
      width: 90%;
      cursor: pointer;
      border-radius:0.4rem;
      padding: 0.4rem;
      gap: 1.5rem;
      display: flex;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar{
        img {
          height: 3.6rem;
          border-radius: 3rem;
        }
      }
      .username{
          h2{
            font-size: 1.2rem;
            font-weight: 590;
            color: white;
          }
        }
    }
    .selected{
      background-color: #9a86f3;
    }  
  }
  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar{
      img {
        height:6rem;
        border-radius: 3rem;
        cursor: pointer;
        max-inline-size: 100%;
      }
    }
    .username{
      h1{
        font-size: 2rem;
        font-weight: 500;
        color: white;
      }
    }
  }  
  @media screen and (min-width:1080px) and (max-width:1300px){
  
  }
  @media screen and (min-width:720px) and (max-width:1080px){
    display: grid;
    grid-template-rows: 10% 75% 15% ;
      .contact{
        background-color: #ffffff39;
        min-height: 15%;
        width: 90%;
        cursor: pointer;
        border-radius:0.4rem;
        padding: 0.4rem;
        gap: 1.5rem;
        display: flex;
        align-items: center;
        transition: 0.5s ease-in-out;
        .avatar{
          img {
            height:4rem;
            max-inline-size: 100%;
          }
        }
        .username{
          h2{
            font-size: 1.20rem;
            font-weight: 450;
            color: white;
          }
        }
        .selected{
          background-color: #9a86f3;
        } 
      }

      .current-user {
        .avatar{
          img {
            height:4rem;
            max-inline-size: 100%;
          }
        }
        .username{
          h1{
            font-size: 1.7rem;
            font-weight: 500;
            color: white;
        }
      }
    }

  } 

  @media screen and (min-width:300px) and (max-width:720px){
    display: grid;
    grid-template-rows: 10% 76% 15% ;
    .contact {
        .avatar {
          img {
            height: 2.3rem !important
          }
        }
        .username {
          h2{
            font-size: 1rem !important;
            font-weight: 400 !important;
            color: white;
          }
        }
        .selected{
          background-color: #9a86f3;
        }         
      }
      .current-user {
        .avatar{
          img {
            height:2.1rem;
            max-inline-size: 100%;
          }
        }
        .username{
          h1{
            font-size: 1.4rem;
            font-weight: 500;
            color: white;
        }
      }
    } 
  }
`


export {
  Contacts
}