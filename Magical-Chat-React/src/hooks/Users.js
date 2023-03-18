import { Image } from "utils"
export const users = (start,end ,contacts,currentSelected,changeCurrentChat,groupAvater) =>{

  return (
    <>
     {
      contacts.map((contact,index)=>{
        if(start <= index &&  end > index ){
          return(
            <div
            className = {`contact  ${index === currentSelected ? "selected" : "" }`}
            key={index}
            onClick={()=>changeCurrentChat(index,contact)}
            draggable
            >
              <div className={`avatar`}>
                <img className={`${groupAvater}`} src={`${  index >= 5 ?contact.avatarImage :Image[contact.id]}`} alt={`${contact.username}`}></img>
              </div>
              <div className="username">
                <h2>{contact.username}</h2>
              </div>
            </div>
          )
        }
      })
    }
  </>)
}
