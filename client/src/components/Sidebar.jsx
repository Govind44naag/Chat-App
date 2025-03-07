import React, { useState } from 'react'
import { MdSearch } from "react-icons/md";
import OtherUsers from './OtherUsers';
import axios from 'axios';
import toast from 'react-hot-toast/headless';
import { USER_API_END_POINT } from '../utils/constant';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setOtherUsers } from '../redux/userSlice';
import { useEffect } from 'react';
 const Sidebar = () => {
    const {otherUsers}=useSelector(store=>store.user)
    const dispatch=useDispatch()
    const [search,setSearch]=useState("")
    const navigate=useNavigate()
    const [originalUsers, setOriginalUsers] = useState([]);
    useEffect(() => {
        // Save the original user list when component loads
        if (otherUsers && originalUsers.length === 0) {
            setOriginalUsers(otherUsers);
        }
    }, [otherUsers]); 
    const logoutHandler=async()=>{
        try{
              const res=await axios.get(`${USER_API_END_POINT}/logout`)
            navigate('/login')
             toast.success(res.data.message)
             dispatch(setAuthUser(null))
        }
        catch(e){
            console.error(e)
           
        }
    }
    const searchSubmitHandler = (e) => {
        e.preventDefault(); // Fix: Prevent form submission

        if (!search.trim()) {
            toast.error("Please enter a name to search.");
            return;
        }

        const filteredUsers = otherUsers?.filter(user =>
            user.fullName.toLowerCase().includes(search.toLowerCase())
        );

        if (filteredUsers.length > 0) {
            dispatch(setOtherUsers({ otherUsers: filteredUsers })); // Fix: Keep `otherUsers` as an object
        } else {
            toast.error("User not found");
        }
    };
    useEffect(() => {
        if (search.trim() === "") {
            dispatch(setOtherUsers({ otherUsers: originalUsers }));
        }
    }, [search]);
    return (
        <div className='border-r border-slate-500 p-4 flex flex-col'>
            <form onSubmit={searchSubmitHandler}   className='flex items-center gap-1'>
                <input className='input input-bordered rounded-md'
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    
                    type='text'
                    placeholder='search...' />
                    <button type='submit'  className='btn bg-zinc-500 text-white'>
                        <MdSearch className='m-4 h-2 outline-none'/>
                        
                    </button>
                    <div className="divider px-3"></div>
            </form>
            <div className='divider px-3'></div>
            <OtherUsers/>
             <div className='mt-2'>
                <button onClick={logoutHandler} className='btn btn-sm bg-green-400 rounded-sm text-blue-800'>Logout</button>
             </div>

        </div>
    )
}

export default Sidebar
