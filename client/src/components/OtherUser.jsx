import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../redux/userSlice'
const OtherUser = ({user}) => {
  const dispatch=useDispatch()
 
  const { selectedUser, onlineUsers = [] } = useSelector(store => store.user);
  const isOnline = Array.isArray(onlineUsers) && user?._id && onlineUsers.includes(user._id);
  
  const selectedUserHandler=(user)=>{
    dispatch(setSelectedUser(user))
    
  }
 
  return (
   <>
        <div onClick={()=>selectedUserHandler(user)} className={`${selectedUser?._id===user?._id ? 'bg-zinc-200':'' }  flex gap-2 items-center   hover:bg-zinc-200 rounded-sm p-1 cursor-pointer  hover:text-green-700`}>

        <div className={` avatar ${isOnline ? 'online' : ''}`}>

          <div className="w-12 rounded-full">
            <img src={user?.profilePhoto} alt="userprofile" />
          </div>
        </div> 
        <div className="flex flex-col flex-1">
          <div className="flex justify-between gap-2">
              <p>{user?.fullName}</p>
           </div>
        </div> 
          </div>
          <div className='divider my-0 py-0 h-1'></div>
 </>
 
  )
}

export default OtherUser
