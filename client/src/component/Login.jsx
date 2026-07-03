import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { AppContext } from '../context/App.Context'
import { motion } from 'motion/react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const [state, setState] = useState('Login')
  const { setShowLogin,backendurl,setToken,setUser } = useContext(AppContext)               
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  
  const onSubmitHandler=async (e)=>{
    e.preventDefault();
    try {
      if(state === 'Login'){
        const {data} = await axios.post(backendurl + '/api/user/login', {email, password})

        if(data.success){
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('token', data.token)
          setShowLogin(false)
        }else{
          toast.error(data.message)
        }

      }else{
        const {data}=await axios.post(backendurl+'/api/user/register',{name,email,password})
        if(data.success){
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('token', data.token)
          setShowLogin(false)
        }else{
          toast.error(data.message)
        }
      }
    } catch (error) {  
      toast.error(error.message)
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30
      flex justify-center items-center'>

      <motion.form onSubmit={onSubmitHandler}
        className='relative bg-white p-8 rounded-2xl shadow-xl w-96 flex flex-col gap-4'
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ duration: 0.4, type: 'spring', stiffness: 150 }}
      >

        {/* Close button */}
        <motion.img
          onClick={() => setShowLogin(false)}
          src={assets.cross_icon}
          alt="close"
          className='absolute top-4 right-4 w-4 cursor-pointer opacity-50 hover:opacity-100 transition'
          whileHover={{ scale: 1.2, rotate: 90 }}
          transition={{ duration: 0.2 }}
        />

        <motion.h1
          className='text-2xl font-semibold text-neutral-800 text-center'
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {state === 'Login' ? 'Welcome Back' : 'Create Account'}
        </motion.h1>

        <motion.p
          className='text-sm text-gray-400 text-center -mt-2'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          {state === 'Login' ? 'Please sign in to continue' : 'Sign up to get started'}
        </motion.p>

        {/* Full Name — only for Sign Up */}
        {state === 'Sign Up' && (
          <motion.div
            className='flex items-center gap-3 border border-gray-200 px-4 py-2.5 rounded-full'
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <img src={assets.user_icon} alt="" className='w-4 opacity-60' />
            <input
            onChange={e=> setName(e.target.value)}
            value={name}
              type="text"
              placeholder='Full Name'
              required
              className='flex-1 text-sm outline-none bg-transparent text-gray-700 placeholder:text-gray-400'
            />
          </motion.div>
        )}

        {/* Email */}
        <motion.div
          className='flex items-center gap-3 border border-gray-200 px-4 py-2.5 rounded-full'
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <img src={assets.email_icon} alt="" className='w-4 opacity-60' />
          <input
          onChange={e=> setEmail(e.target.value)}
          value={email}
            type="email"
            placeholder='Email Address'
            required
            className='flex-1 text-sm outline-none bg-transparent text-gray-700 placeholder:text-gray-400'
          />
        </motion.div>

        {/* Password */}
        <motion.div
          className='flex items-center gap-3 border border-gray-200 px-4 py-2.5 rounded-full'
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <img src={assets.lock_icon} alt="" className='w-4 opacity-60' />
          <input
          onChange={e=> setPassword(e.target.value)}
          value={password}
            type="password"
            placeholder='Password'
            required
            className='flex-1 text-sm outline-none bg-transparent text-gray-700 placeholder:text-gray-400'
          />
        </motion.div>

        {/* Forgot password */}
        {state === 'Login' && (
          <p className='text-xs text-violet-500 text-right -mt-2 cursor-pointer hover:underline'>
            Forgot password?
          </p>
        )}

        {/* Submit */}
        <motion.button
          className='w-full bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white
            py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-all duration-200'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
        >
          {state === 'Login' ? 'Login' : 'Create Account'}
        </motion.button>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          {state === 'Login' ? (
            <p className='text-xs text-gray-500 text-center'>
              Don't have an account?{' '}
              <span
                onClick={() => setState('Sign Up')}
                className='text-violet-500 cursor-pointer hover:underline font-medium'
              >
                Sign Up
              </span>
            </p>
          ) : (
            <p className='text-xs text-gray-500 text-center'>
              Already have an account?{' '}
              <span
                onClick={() => setState('Login')}
                className='text-violet-500 cursor-pointer hover:underline font-medium'
              >
                Login
              </span>
            </p>
          )}
        </motion.div>

      </motion.form>

    </div>
  )
}

export default Login