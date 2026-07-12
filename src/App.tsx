import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import LoginPage from './Pages/LoginPage'
import FromRegistration from './Pages/LoginAndSignUp'
import Layout from './Layout/Layout'
import BusinessPage from './Pages/BusinessPage'
import BookingSlot from './Pages/BookingSlot'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Everything inside this Route will show the Header from Layout */}
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/businessPage' element={<BusinessPage/>} />
          <Route path='/BookingSlot' element={<BookingSlot/>}/>
        </Route>

        {/* Auth pages usually don't show the main Header */}
        <Route path='/login' element={<LoginPage />} />
        <Route path='/SignUp' element={<FromRegistration />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App