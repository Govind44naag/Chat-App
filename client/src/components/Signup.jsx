import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router'
import axios from 'axios'

import { USER_API_END_POINT } from '../utils/constant'
import toast from 'react-hot-toast'
const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  })
  const navigate=useNavigate()
  const handleCheckbox = (gender) => {
    setUser({ ...user, gender })
  }
  const onSubmitHandler = async(e) => {
    e.preventDefault()
    try{
       
      const res=await axios.post(`${USER_API_END_POINT}/register`,user,{
        headers:{
          'Content-Type':'application/json',
        },
        withCredentials:true,
      })
      if(res.data.success){
        navigate('/login')
        toast.success(res.data.message)
      }
    }
    catch(e){
      toast.error(e.response.data.message)
      console.error(e)
    }
    setUser({
      fullName:"",
      username:"",
      password:"",
      confirmPassword:"",
      gender:"",
    })
  }

  return (
    <div className='min-w-96 m-auto '>
      <div className='w-full p-6 rounded-lg shadow-md   h-full   bg-gray-600   bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-100'>
        <h1 className='text-3xl font-bold text-center  '>Signup</h1>
        <form onSubmit={onSubmitHandler} action="">
          <div>
            <label className='label p-2 flex items-center'>
              <span className='text-base label-text'>Full Name</span>

            </label>
            <input type="text"
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              placeholder='Govind'
              className='mx-1 p-1 input input-bordered w-full ' />
          </div>

          <div>
            <label className='label p-2 flex items-center'>
              <span className='text-base label-text'>Username</span>

            </label>
            <input type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder='govind@thakur'
              className='mx-1 p-1 input input-bordered w-full ' />
          </div>

          <div>
            <label className='label p-2 flex items-center'>
              <span className='text-base label-text'>Password</span>

            </label>
            <input type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder='password'
              className='mx-1 p-1 input input-bordered w-full ' />
          </div>

          <div>
            <label className='label p-2 flex items-center'>
              <span className='text-base label-text'>Confirm Password</span>

            </label>
            <input type="password"
              value={user.confirmPassword}
              onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
              placeholder='password'
              className='mx-1 p-1 input input-bordered w-full ' />
          </div>


          <div className='flex items-center my-4  mx-2'>
            <div className='flex items-center '>
              <p>Male</p>
              <input type="checkbox"
              checked={user.gender==='male'}
              onChange={()=>handleCheckbox('male')}
                defaultChecked className="checkbox checkbox-xl mx-2" />

            </div>

            <div className='flex items-center mx-3'>
              <p>Female</p>
              <input type="checkbox"
              checked={user.gender==='female'}
              onChange={()=>handleCheckbox('female')}
                defaultChecked className="checkbox checkbox-xl mx-2 " />

            </div>
          </div>
          <div>
            <p className='inline mx-2'>Already have account? </p>
            <Link to='/login'>
              <span className='text-blue-400  hover:underline'>login</span>
            </Link>
          </div>
          <div>
            <button type='submit' className="btn w-full btn-success mt-4  bg-green-500 rounded p-2 hover:bg-green-400">Signup</button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default Signup
