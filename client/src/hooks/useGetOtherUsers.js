import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { USER_API_END_POINT } from '../utils/constant'
import { setOtherUsers } from '../redux/userSlice'
const useGetOtherUsers = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                axios.defaults.withCredentials = true
                const res = await axios.get(`${USER_API_END_POINT}/`)
                 //store
                dispatch(setOtherUsers(res.data))
            }
            catch (e) {
                console.error(e)
            }

        }
        fetchOtherUsers()
    }, [])
}

export default useGetOtherUsers
