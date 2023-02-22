import React  from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
// 登出图标
import { BiPowerOff } from 'react-icons/bi'
import styled from 'styled-components'

export default function Logout() {
  
  const navigate = useNavigate();
  
  // 提醒框，调用时做了防抖处理
  // const handleMouse = ()=>{
  //     toast.warning("你确定要登出嘛?",toastOptions) 
  // }

  // 退出登录,清除localStorage，返回登录页面
  const handleClick = async ()=>{
    localStorage.clear();
    navigate('/login');
  }

  return (
    <>
      <ToastContainer limit={1}/>
      {/* <Button onClick={handleClick} onMouseOver = {debounce(handleMouse,1300)}> */}
      <Button onClick={handleClick}>
        <BiPowerOff/>
      </Button>
    </>
  )
}
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #997af0;
  color: white;
  padding: 1rem;
  font-weight: bold;
  cursor: pointer;
  border-radius:0.5rem;
  font-size: 1rem;
  text-transform: uppercase;
  transform: 0.5s ease-in-out;
  svg {
    font-size: 1.3rem;
  }
  &:hover{
  background-color: #4e0eff;
}
  @media screen and (min-width:300px) and (max-width:720px){
    padding: 0.3rem !important;
    display: flex;
    justify-content: center;
    align-items: center ;
    background-color: #997af0;
    color: white;
    font-weight: bold;
    cursor: pointer;
    border-radius:0.5rem;
    font-size: 1rem;
    text-transform: uppercase;
    transform: 0.5s ease-in-out;
    svg {
      font-size: 1.3rem;
    }
    &:hover{
    background-color: #4e0eff;
  }
}
`