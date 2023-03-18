import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { allUserRouter } from "utils/api";


const useCurrentUser = () => {

  const navigate = useNavigate();
  const [contacts, setContact] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    if (!localStorage.getItem('chat-app-user')) {
      navigate('/login')
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem('chat-app-user')))
      setIsLoaded(true)
    }
  }, [])

  const midSetContact = async () => {
    if (currentUser) {

      if (currentUser.avatarImage) {

        const { data } = await axios.get(`${allUserRouter}/${currentUser.id}`)

        const { allUser } = data

        setContact([...allUser])

      } else {
        navigate('/avater')
      }
    }
  }

  useEffect(() => { midSetContact() }, [currentUser])


  return { isLoaded, currentUser, contacts }
}

export {
  useCurrentUser
}