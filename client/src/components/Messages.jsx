import React from 'react'
import Message from './Message'
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage'
import useGetMessages from '../hooks/useGetMessages'
import { useSelector } from 'react-redux'
import { BiMessageSquareAdd } from 'react-icons/bi'
 const Messages = () => {
useGetRealTimeMessage()
 useGetMessages()
  const {messages}=useSelector(store=>store.message)
  if(!BiMessageSquareAdd) return;
 

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {
       

       messages && messages?.map((message)=>{
          return (
            <Message key={message._id} message={message}/>
          )
        })
      }
       

    </div>
  )
}

export default Messages
