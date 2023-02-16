import { toast } from 'react-toastify'

const toastOptions = {
  position:'top-center',
  autoClose:'4000',
  pauseOnHover:true,
  closeOnClick:true,
  draggable:true,
  theme:'dark',
}
const handleValidation = (values)=>{
  const { password ,confirmPassword ,username ,email } = values;

  if( password !== confirmPassword ){
    console.log( username[0] )
    toast.error('两次输入密码不一样呀，检查检查~',toastOptions)
    return false;
  }
  else if( username[0]<= 9 && username[0] >= 0 ){
    console.log( username[0] )
    toast.error('用户名不能以数字开头捏~',toastOptions)
    return false;
  } 
  // else if( username. length < 1){
  //   toast.error('用户名不能为空~',toastOptions)
  //   return false;
  // } 
  else if( username. length > 8){
    toast.error('名字长度不能大于8哦~',toastOptions)
    return false;
  }
  
  return true;
}


function debounce(func, wait) {

  let timeout;

  return function () {

      let context = this; // 保存this指向

      let args = arguments; // 拿到event对象

      clearTimeout(timeout)
      
      timeout = setTimeout(function(){

          func.apply(context, args)

      }, wait);
  }
}
export  {
  debounce,
  toastOptions,
  handleValidation,
}