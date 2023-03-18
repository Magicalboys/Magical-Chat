import React from 'react';
import axios from 'axios'
import { toast } from 'react-toastify';
import { findAvatarRouter } from '../utils/api';
import { toastOptions } from '../utils';

const network = async (values, Router, Register) => {

  const { password, username } = values;

  const { data } = await axios.post(Router, {
    username,
    password
  })

  const { code, message, data: user } = data;


  if (code === 0) {

    try {
      // 登录成功 
      if (!Register) {
        const { data } = await axios.get(`${findAvatarRouter}/${username}`)

        const { avatarImage } = data

        // console.log( avatarImage  )

        user.avatarImage = avatarImage;
      }

      localStorage.setItem('chat-app-user', JSON.stringify(user))
      // 返回 true 跳转到别的页面  
      return true;

    } catch (error) {

      console.log(error)

    }
  } else {

    toast.error(message, toastOptions);

    return false;
  }
}

export {
  network
}