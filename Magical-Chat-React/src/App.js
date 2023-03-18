import React,{useEffect} from 'react'
import { Routes, Route, Navigate, useRoutes } from 'react-router-dom'
import routes from './router/index';
export default function App() {

  useEffect(()=>{
    console.log(`方便的话可以给个start嘛,非常感谢!
    https://github.com/Magicalboys/Magical-Chat`)
  },[])

  return (
    <div>
      {
        useRoutes(routes)
      }
    </div>
  )
}
