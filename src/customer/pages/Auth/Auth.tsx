import React, { useState } from 'react'
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { Button } from '@mui/material';

const Auth = () => {
  const [isLogin,setIsLogin]=useState(true);
  return (
    <div className='flex justify-center h-[90vh] items-center'>
      <div className='w-[440px] h-[85vh] rounded-md shadow-lg'>
        <img className='w-full h-[140px] rounded-t-md' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq8Eqy09aEmv9yUC1qXodEI6Kvr4klWV_LY7fbYcyqZA&s=10" alt=""/>

        <div className='mt-8 px-10'>
        {isLogin ? <LoginForm /> :<RegisterForm/>}

        <div className='flex items-center gap-1 justify-center mt-5'>
          <p>{isLogin && "Don't "}have Account</p>
          <Button size="small" onClick={()=>setIsLogin(!isLogin)}>{isLogin?"Create Account":"login"}</Button>
          </div>

        </div>
      </div>
        
    </div>
  )
}

export default Auth