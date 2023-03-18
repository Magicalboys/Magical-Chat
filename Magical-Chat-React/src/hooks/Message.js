import { v4 as uuidv4 } from 'uuid'
const userMessage = ({ messages ,scrollRef,currentUser,currentChat})=>{ 

  return (
    
    <>
     {
       messages && messages?.map( message =>{
          return(
            <div ref={scrollRef} key={uuidv4()}>
                <div className={` message ${message.sender === currentUser.username ? "sended": "recieved"}` }
                style={{display:`${ message.id === undefined && message.sender === undefined && message.users !== currentChat.username  ? "none": ""}`}}
                >
                  <img 
                  alt={`${message.sender}`}
                  style={{display:`${message.sender !== currentUser.username ? "": "none"}`}}
                  src={`${message.sender === currentUser.username ? 
                  currentUser.avatarImage :currentChat.avatarImage} `}>
                  </img>
                  <div className="content">
                    <p>
                      {message.message}
                    </p>
                  </div>
                  <img 
                  alt={`${message.sender}`}
                  style={{display:`${message.sender === currentUser.username ? "": "none"}`}}
                  src={`${message.sender === currentUser.username ? 
                  currentUser.avatarImage :currentChat.avatarImage} `}>
                  </img>
              </div>
            </div>
          )
        })
        }
    </>
  )
}

const groupMessage = ({  Gmessages:messages ,GscrollRef:scrollRef,currentUser,currentChat})=>{ 

  
  return (
    <>
     {
       messages && messages?.map(message =>{
          return(
            <div ref={scrollRef} key={uuidv4()}>
                <div className={` message ${message.sender === currentUser.username ? "sended": "recieved"}` }
                style={{display:`${ message.id === undefined && message.sender === undefined && message.users !== currentChat.username  ? "none": ""}`}}
                >
                  <div>
                  {messages.sender}
                  </div>
                  <img 
                  style={{display:`${message.sender !== currentUser.username ? "": "none"}`}}
                  src={`${message.sender === currentUser.username ? 
                  currentUser.avatarImage :message.avatarImage} `}>
                  </img>
                  <div className="content">
                    <p >
                      {message.message}
                    </p>
                  </div>
                  <img 
                  style={{display:`${message.sender === currentUser.username ? "": "none"}`}}
                  src={`${message.sender === currentUser.username ? 
                  currentUser.avatarImage :message.avatarImage} `}>
                  </img>
              </div>
            </div>
          )
        })
        }
    </>
  )
}

export {
  userMessage,
  groupMessage,
}