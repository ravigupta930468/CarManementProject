import { Link, Links, useNavigate } from 'react-router-dom'
import companyLogo from '..//assets/CompanyLogo/CompanyLogo.png'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const Header = () => {
  
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const navigate = useNavigate()

  const checkLoginStatus = () => {
    const name = localStorage.getItem('name')
    const token = localStorage.getItem('token')
    
    if (name && token) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }

  useEffect(() => {
    checkLoginStatus()
    
    // Listen for auth changes
    window.addEventListener('auth-change', checkLoginStatus)
    
    return () => {
      window.removeEventListener('auth-change', checkLoginStatus)
    }
  }, [])

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('name')
    localStorage.removeItem('token')
    
    // Update state
    setIsLoggedIn(false)
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('auth-change'))
    
    // Show success message
    toast.success('Logged out successfully!')
    
    // Redirect to home
    setTimeout(() => {
      navigate('/')
    }, 1000)
  }

  return (
    <div className='grid grid-cols-2 bg-white m-2 rounded-2xl shadow-md shadow-blue-300'>
      <div className='flex justify-between items-center gap-3'>
        <img src={companyLogo} className='w-20 object-cover rounded-s-2xl p-1 cursor-pointer' onClick={()=>navigate('/')} />
        
      </div>

      <div className='flex  justify-end gap-2.5'>
        <ul className='flex flex-wrap gap-2.5 font-semibold text-blue-600 text-center items-center p-2'>
          <Link to="/BookingSlot" className='p-1.5'>Booking Slot </Link>
          <Link to ="/about" className='p-1.5'>About</Link>
         
          <Link to ='/businessPage' className='p-1.5'>Business</Link>
          
          
          {/* Show Login/SignUp only if NOT logged in */}
          {!isLoggedIn ? (
            <>
              <Link to="/login" className='p-1.5'>Login</Link>
              <Link to='/SignUp' className='p-1.5'>SignUp</Link>
            </>
          ) : (
            /* Show Logout only if logged in */
            <>
            <button 
              onClick={handleLogout}
              className='p-1.5 bg-red-500 text-white rounded-lg px-4 hover:bg-red-600 transition'
            >
              Logout
            </button>
           
            </>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Header