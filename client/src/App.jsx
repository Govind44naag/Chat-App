import React, { useEffect, useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Signup from './components/Signup'
import Login from './components/Login'
import HomePage from './components/HomePage'
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import { setSocket } from './redux/socketSlice'
import { setOnlineUsers } from './redux/userSlice'
 const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/register',
      element: <Signup />,
    },
    {
      path: '/login',
      element: <Login />
    }
  ]
)

const App = () => {
  const dispatch=useDispatch()
   const { authUser } = useSelector(store => store.user)
  const {socket}=useSelector(store=>store.socket)
  useEffect(() => {
    if (authUser) {
      const socket = io('http://localhost:3000', {
        withCredentials:true,
          query:{
            userId:authUser._id
          }
      })
     dispatch(setSocket(socket))
     socket.on('getOnlineUsers',(onlineUsers)=>{
      dispatch(setOnlineUsers(onlineUsers))
     })
    return ()=>socket.close();
    }
    else{
      if(socket){
        socket.close()
        dispatch(setSocket(null))
      }
    }
  }, [authUser])
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
