import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

interface userNameHandle_Type {
  email: string,
  password: string,
  phoneMumnber?: string,
  role: 'user' | 'admin'
}

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<userNameHandle_Type>({
    mode: 'onChange',
    defaultValues: { role: 'user' }
  })
  const navigate = useNavigate()
const onSubmitData = async (data: userNameHandle_Type) => {
  try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    const result = await response.json()
    
    if (response.ok) {
      toast.success("Login Successful!")
      localStorage.setItem('token', result.token)
      localStorage.setItem('name', result.name)

      // Dispatch custom event to notify other components
      window.dispatchEvent(new Event('auth-change'))

      // Wait 1.5 seconds so the user can actually see the success message 
      setTimeout(() => {
        navigate('/');
      }, 1500)
    } else {
      toast.error(result.message || 'Invalid Credentials')
    }
  } catch (err) {
    toast.error("Server connection failed")
  }
}

  return (
    <div className='min-h-screen bg-gray-200 flex items-center mx-auto justify-center'>
      <div className='bg-white p-8 rounded-2xl w-full max-w-md'>
        <h2 className='text-2xl font-bold text-blue-500 text-center'>
          Login
        </h2>

        {/* Login Section */}
        <form className='space-y-3.5' onSubmit={handleSubmit(onSubmitData)}>
          <div>
            <input 
              type='text'
              {...register('email', { required: 'Email is required' })}
              placeholder='Enter your email'
              className='w-full p-2.5 mt-2.5 rounded-2xl outline-none focus:ring-2 focus:ring-blue-400'
            />
            {errors.email && <p className='text-red-400 text-sm mt-1.5'>{errors.email.message}</p>}
          </div>
          
          <div>
            <input type="hidden" {...register('role')} />
          </div>
          
          <div>
            <input 
              type='password'
              {...register('password', { required: 'Password is required' })}
              placeholder='Enter your password'
              className='w-full p-2.5 mt-2.5 rounded-2xl outline-none focus:ring-2 focus:ring-blue-200'
            />
            {errors.password && <p className='text-red-400 text-sm mt-1.5'>{errors.password.message}</p>}
          </div>
          
          <button 
            type='submit' 
            disabled={isSubmitting} 
            className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-2 rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-95 disabled:bg-gray-400 mt-4'
          >
            {isSubmitting ? 'Authenticating...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage