import React from "react"
import { Navigate } from "react-router-dom"

const Register = React.lazy(()=> import("view/Register"))
const UserData = React.lazy(()=> import("view/UserData"))
const Login = React.lazy(()=> import("view/Login"))
const Avater = React.lazy(()=> import("view/Avater"))
const Chat = React.lazy(()=> import("view/Chat"))

// # 写一个防抖函数

const routes = [
  {
    path:"/",
    element:<Navigate to ="/login"/>
  },
  {
    path:"/user",
    element:<Register/>
  },
  {
    path:"/userdata",
    element:<UserData/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/avatar",
    element:<Avater/>
  },
  {
    path:"/chat",
    element:<Chat/>
  },
]

export default routes