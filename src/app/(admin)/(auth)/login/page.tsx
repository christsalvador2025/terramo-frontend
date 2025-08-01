import React from 'react';
import  LoginForm  from "@/components/forms/auth/LoginForm"
import Header from '@/components/shared/header/header';
import Login from '@/components/forms/auth/Login';
export default function LoginPage() {
  return (
    // <div>
    //     <h1>Login</h1>
    //     <LoginForm/>
    // </div>
     <>
      {/* <Navbar/> */}
      {/* <Header/> */}
      <div className="mt-32 flex w-full min-w-[600px] flex-col items-center justify-center rounded-lg bg-white">
      
        <Login/>
      </div>
    </>
  )
}
