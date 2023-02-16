import React from 'react'
import {BrowserRouter,Routes,Route, Navigate}  from 'react-router-dom'
import Avater from './page/Avater'
import Chat from './page/Chat'
import Login from './page/Login'
import Register from './page/Register'
import UserData from './page/UserData'
import { useEffect } from 'react';
export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route
            path="*"
            element={<Navigate to={"login"} replace />}
          ></Route>
        <Route path='/user' element = { <Register/>}/>
        <Route path='/userdata' element = { <UserData/>}/>
        <Route path='/login' element = { <Login/>}/>
        <Route path='/avatar' element = { <Avater/>}/>
        <Route path='/chat' element = { <Chat/>}/>
     </Routes>
    </BrowserRouter>
  )
}
