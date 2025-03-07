import axios from 'axios';
import React, {  useState } from 'react'
import { setMessages } from '../redux/messageSlice';
import { IoSendSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { MESSAGE_API_END_POINT } from '../utils/constant';
const SendInput = () => {
   const [message, setMessage] = useState("")
  const dispatch = useDispatch()
  const { selectedUser } = useSelector(store => store.user)
  const { messages } = useSelector(store => store.message)
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${MESSAGE_API_END_POINT}/send/${selectedUser?._id}`, { message }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
       dispatch(setMessages([...messages, res?.data?.newMessage]))
    }
    catch (e) {
      console.error(e)
    }
    setMessage("")

  }
  return (
    <form onSubmit={onSubmitHandler} className='px-4 my-3' >
      <div className='w-full relative'>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder='send a message..'
          className='border p-3 border-zinc-500 text-sm rounded-lg block w-full bg-gray-600 text-white'
        />
        <button type='submit' className='absolute flex inset-y-0 end-1 items-center pr-4'>
          <IoSendSharp />
        </button>

      </div>
    </form>
  )
}

export default SendInput
