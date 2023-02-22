import React from 'react'
import { useState } from 'react';
import  styled  from 'styled-components';
import { useContacts } from '../utils/Contacts';
import { useCurrentUser } from '../utils/Chat';
import { users } from '../utils/Users';

function Contacts({changeChat,handleWelcome}) {

  const {contacts,currentUser } = useCurrentUser()

  const { 
    currentUserName,
    currentUserImage ,
    currentSelected ,
    changeCurrentChat ,
    ClickAvatar,
    ClickName
  } = useContacts({ currentUser, changeChat , handleWelcome})
 

  const [showGroup,setShowGrop] = useState(true) 

  const handleGroup = () =>{
    setShowGrop(false)
  }
  
  const handleUser = () =>{
    setShowGrop(true)
  }

  return (
    <>
      {
        currentUserImage && currentUserName &&
        <Container>
          <div className="brand">
              <h2>Macgical CHAT</h2>           
          </div>
          <div className='navigation'>
              <div className="user" onClick={handleUser}>
                User
              </div>
              <div className="group" onClick={handleGroup}>
                Group
              </div>
          </div>
          <div className="contacts">
           {
              showGroup? 
               users(5,contacts.length,contacts,currentSelected,changeCurrentChat,"")
              :users(0,5,contacts,currentSelected,changeCurrentChat,"groupAvater")
            }
          </div>
          <div className="current-user">
              <div className="avatar" onClick={ClickAvatar}>
                  <img src={`${currentUserImage}` }></img>
                  </div>
                  <div className="username" onClick={ClickName}>
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
  grid-template-rows: 6% 4% 73% 15% ;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    h2{
      color:white;
      text-transform:uppercase
    }
  }
  gap:0.3rem;

  .navigation{
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff34;
    border-radius: 1rem;
    cursor: pointer;
    .user{
      height: 100%;
      display: flex;
      border-top-left-radius:1rem;
      border-bottom-left-radius:1rem;
      align-items: center;
      justify-content: center;
      width: 50%;
      :hover{
        background-color: #9a86f3;
      }
    }
    .group{
      height: 100%;
      display: flex;
      border-top-right-radius:1rem;
      border-bottom-right-radius:1rem;
      align-items: center;
      justify-content: center;
      width: 50%;
      :hover{
        background-color: #9a86f3;
      }
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
      min-height: 12%;
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
      .groupAvater{
        width: 3.6rem !important;
        height: 3.6rem !important;
        border-radius:0rem !important;
      }
      .username{
          h2{
            font-size: 1.2rem;
            font-weight: 590;
            color: white;
            font-family:STXingkai;
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
        cursor: pointer;
        border-radius: 3rem;
        max-inline-size: 100%;
      }
    }
    .username{
      h1{
        cursor: pointer;
        font-size: 2rem;
        font-weight: 500;
        color: white;
        font-family:STXingkai;
      }
    }
  }  
  @media screen and (min-width:1080px) and (max-width:1700px){
       grid-template-rows: 6% 4% 73% 15% ;
      .contacts{
        .contact{
          background-color: #ffffff39;
          min-height: 12%;
          width: 90%;
          .avatar{
            img {
              height:2.8em;
              border-radius: 3rem;
            }
          }
          .groupAvater{
            width: 3.6rem !important;
            border-radius:0rem !important;
          }
          .username{
              h2{
                font-size: 1.2rem;
                font-weight: 590;
                color: white;
                /* font-family:Xingkai SC; */
              }
            }
        }
      }
    .current-user {
        .avatar{
          img {
            height:5rem;
          }
        }
        .username{
          h1{
            cursor: pointer;
            font-family:STXingkai;
          }
        }
      }  
    }
  @media screen and (min-width:720px) and (max-width:1080px){
    display: grid;
    grid-template-rows: 6% 4% 75% 15% ;
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
    grid-template-rows: 6% 4% 75% 15% ;
    .contact {
      min-height: 18% !important;
        .avatar {
          img {
            height: 4rem !important
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
            height:4rem;
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