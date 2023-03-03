import React from 'react'
import axios  from 'axios';
import { addMessageRouter, getAllMessageRouter, getMessageRouter } from './ApiRoutes';
import { useEffect, useContext } from 'react';
import { useState , useRef} from 'react';
import { UserContext } from './../page/Chat';

const useGetMessage = () =>{

  const { currentUser,currentChat,socket } = useContext(UserContext)

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
    
    // console.log(sendChater.username)
    
    const msgs = [...messages];

    msgs.push({sender:currentUser.username,message:msg})

    setMessages(msgs)
  }
  
  //接收消息
  useEffect(()=>{
    if( socket.current ){
      socket.current.on("msg-recieve",(data) =>{

        const { from,message} = data

        setArrivalMessage({users:from,message:message})
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

  return { messages , handleSendMsg ,scrollRef }
  
}


const useAllMessage = ({contacts})=>{

  const { currentUser,currentChat,socket } = useContext(UserContext)

  const [ messages , setMessages ] = useState([])
  const [ arrivalMessage , setArrivalMessage ] = useState(null)
  
  const scrollRef = useRef()
  
  
  // 获取消息
  const getMegs = async() => {
    if( currentChat && currentUser ){
      const { data }  = await axios.post(getAllMessageRouter,{
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
 
    const { from , to }  = await axios.post(addMessageRouter,{
          from:currentUser.username,
          to:currentChat.username,
          msg:msg,
    })

    // 将消息通过socket发送到后端
    socket.current.emit("send-gmsg",{
      to:currentChat.username,
      from:currentUser.username,
      avatarImage:currentUser.avatarImage,
      message:msg
    })

    const msgs = [...messages];

    msgs.push({sender:currentUser.username,message:msg})
    
    setMessages(msgs)
  }

  
    //接收消息
      useEffect(()=>{
        if( socket.current ){
          socket.current.on("msg-group-recieve",(data) =>{

            const { to,from,message,avatarImage} = data
            
            setArrivalMessage({users:to,avatarImage:avatarImage,message:message})
          })
        }
      },[])
  
  messages.map(message =>{
    const name = message.sender;
    const avater = contacts.find(contact =>contact.username === name )
    if(!message.avatarImage)
    message.avatarImage = avater?.avatarImage;
    // console.log(message.sender, message.avatarImage  )
  })

  // 将接收到的消息放入数组里
  useEffect(()=>{
    arrivalMessage && setMessages((prev) =>[...prev,arrivalMessage])
  },[arrivalMessage])

  
// scrollIntoView方法是将调用它的元素滚动到浏览器窗口的可见区域
useEffect(()=>{
    scrollRef.current?.scrollIntoView({behaviour:"smooth"});
  },[messages])

  return { messages , handleSendMsg ,scrollRef }
}


export {
  useGetMessage,
  useAllMessage
}