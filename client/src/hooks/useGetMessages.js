import React, { useEffect } from 'react'
import { MESSAGE_API_END_POINT } from '../utils/constant'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../redux/messageSlice'
const useGetMessages = () => {
  const { selectedUser } = useSelector(store => store.user)
 
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        axios.defaults.withCredentials = true
        const res = await axios.get(`${MESSAGE_API_END_POINT}/${selectedUser?._id}`)
         dispatch(setMessages(Array.isArray(res.data) ? res.data : [res.data]))


      }
      catch (e) {
        console.error(e)
        dispatch(setMessages([]));
      }
    }
    fetchMessages()
  }, [selectedUser])
}

export default useGetMessages
