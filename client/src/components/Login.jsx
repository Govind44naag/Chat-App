import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router'
import { USER_API_END_POINT } from '../utils/constant'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setAuthUser } from '../redux/userSlice'
const Login = () => {
  const [user, setUser] = useState({
      
      username: "",
      password: "",
      
    })
    const dispatch=useDispatch()
    const navigate=useNavigate()
     
    const onSubmitHandler = async(e) => {
      e.preventDefault()
      try{
       
        const res=await axios.post(`${USER_API_END_POINT}/login`,user,{
          headers:{
            'Content-Type':'application/json',
          },
          withCredentials:true,
        })
        navigate('/')
         
        dispatch(setAuthUser(res.data))
      }
      catch(e){
        toast.error(e.response.data.message)
        console.error(e)
      }
      
      setUser({
    
        username:"",
        password:"",
       
      })
    }
  return (
    <div className='min-w-96 m-auto '>
      <div className='w-full p-6 rounded-lg shadow-md   h-full   bg-gray-600  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-100'>
        <h1 className='text-3xl font-bold text-center  '>Login</h1>
        <form onSubmit={onSubmitHandler} action="">

          <div>
            <label className='label p-2 flex items-center'>
              <span className='text-base label-text'>Username</span>

            </label>
            <input type="text"
            value={user.username}
            onChange={(e)=>setUser({...user,username:e.target.value})}
              placeholder='govind@thakur'
              className='mx-1 p-1 input input-bordered w-full ' />
          </div>

          <div>
            <label className='label p-2 flex items-center'>
              <span className='text-base label-text'>Password</span>

            </label>
            <input type="password"
            value={user.password}
            onChange={(e)=>setUser({...user,password:e.target.value})}
              placeholder='password'
              className='mx-1 p-1 input input-bordered w-full ' />
          </div>
 
          <div>
            <p className='inline mx-2'>Don't have Account? </p>
            <Link to='/register'>
              <span className='text-blue-400  hover:underline'>signup</span>
            </Link>
          </div>
          <div>
            <button type='submit' className="btn w-full btn-success mt-4  bg-green-500 rounded p-2 hover:bg-green-400">Login</button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default Login
