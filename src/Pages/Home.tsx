import React, { useEffect, useState } from 'react'
import Like_Image from "../../public/HomePagesImages/LikeLogo.png"
import Ruppe_Image from "../../public/HomePagesImages/RuppesLogo.png"
import Car_Parking_Image from "../../public/HomePagesImages/carParkingLogo.png"
import Home_Page_Image from "../../public/HomePagesImages/homePageImage.webp"
import SeamlessExperience from "../../public/HomePagesImages/SeamlessExperience.png"
import Whereever_whenever from "../../public/HomePagesImages/Whereever_Whenever.png"
import Piece_of_Mind from "../../Public/HomePagesImages/PieceOfMind.png"
import AppDownloadIcon from "../../Public/HomePagesImages/PhoneImagesLogo.png"
import ParkingData from './ParkingData'
import { Link } from 'react-router-dom'

interface TrustBarInterface {
  image: string,
  title: string
}
interface Scoical_ProofType {
  img: string,
  title: string,
  body: string,
  subBody: string
}

const TrustBarSection: TrustBarInterface[] = [
  {
    image: Ruppe_Image,
    title: "Best price guarantee"
  },
  {
    image: Like_Image,
    title: "Trusted by 1m+ drivers"
  },
  {
    image: Car_Parking_Image,
    title: "100k+ reservable spaces"
  }
]

const ScocialProof: Scoical_ProofType[] = [
  {
    img: Whereever_whenever,
    title: "Wherever, whenever",
    body: "Choose from millions of spaces across the India",
    subBody: 'Find your best option for every car journey'
  },
  {
    img: Piece_of_Mind,
    title: "View information on availability, price and restrictions",
    body: "Choose from millions of spaces across the India",
    subBody: 'Reserve in advance at over 45,000+ locations'
  },
  {
    img: SeamlessExperience,
    title: "Pay for ParkHub spaces via the app or website",
    body: "Choose from millions of spaces across the India",
    subBody: 'Follow easy directions and access instructions'
  }
]

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  // Function to check login status
  const checkLoginStatus = () => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }

  useEffect(() => {
    // Check initial login status
    checkLoginStatus()

    // Listen for storage changes (when logout happens)
    const handleStorageChange = () => {
      checkLoginStatus()
    }

    // Add event listener for storage changes
    window.addEventListener('storage', handleStorageChange)
    
    // Custom event for same-tab updates
    window.addEventListener('auth-change', handleStorageChange)

    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('auth-change', handleStorageChange)
    }
  }, [])

  return (
    <>
      <div className='w-full flex mt-5 justify-center mx-auto p-3.5'>
        <section className='max-w-6xl p-4 text-wrap'>
          <div className='max-w-2xl'>
            <h1 className='text-3xl'>
              <strong className='text-blue-400'>The smarter way </strong>to find
              <span className='text-3xl'> parking</span>
            </h1>
          </div>

          {/* Trust Bar Section */}
          <section className='hidden md:grid grid-cols-3 items-center gap-2.5 mt-5'>
            {TrustBarSection?.map((item, index) => (
              <div key={index} className='flex bg-white shadow-md rounded-md items-center p-1.5 shadow-sm shadow-blue-200'>
                <img src={item.image} className='w-10' loading='lazy' decoding='async' />
                <h1 className='ms-1'>{item.title}</h1>
              </div>
            ))}
          </section>

          <div className='text-wrap text-lg mt-1.5 p-3.5'>
            <h1>
              Thousands of reservable spaces located right where you need them. Join over 13 million drivers and enjoy stress-free, cheaper parking.
            </h1>
          </div>

          {/* Show ParkingData only if user is logged in */}
          <div>
            {isLoggedIn ? (
              <ParkingData />
            ) : (
              <div className='bg-blue-50 border-2 border-blue-300 rounded-2xl p-8 text-center mt-4'>
                <h2 className='text-2xl font-bold text-blue-600 mb-4'>
                  Please Login to View Parking Locations
                </h2>
                <p className='text-gray-700 mb-6'>
                  You need to be logged in to browse and book parking spaces.
                </p>
                <div className='flex gap-4 justify-center'>
                  <Link 
                    to="/login"
                    className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition'
                  >
                    Login
                  </Link>
                  <Link 
                    to="/SignUp"
                    className='bg-gray-200 hover:bg-gray-300 text-blue-600 font-bold py-3 px-6 rounded-lg transition'
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

                  <div className="lg:w-1/2 relative">
            <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl border-8 border-white shadow-blue-300 shadow-md">
              <img 
                src={Home_Page_Image} 
                alt="Modern Parking Management" 
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Decorative abstract shape */}
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -z-0"></div>
          </div>
      </div>

      {/* Social media proof section */}
      <section className='max-w-7xl mx-auto mt-10 px-4'>
        <div className='text-center mb-10'>
          <h1 className='text-4xl text-blue-400 font-bold'>Parking made easy</h1>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {ScocialProof?.map((item, index) => (
              <div className='flex flex-col justify-center items-center text-center' key={index}>
                {/* Image container */}
                <div className='mb-3 mt-2.5 flex justify-center items-center'>
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    loading='lazy' 
                    decoding='async'
                    className='w-40 h-40 object-contain rounded-full shadow-lg border-blue-50/50'
                  />
                </div>
                {/* Body container */}
                <div className='space-y-2'>
                  <h2 className='text-xl font-bold text-blue-400'>
                    {item.title}
                  </h2>
                  <p className='text-gray-700 leading-relaxed'>{item.body}</p>
                  <p className='text-md text-gray-500'>{item.subBody}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download App Section */}
      <section className='mt-5 w-full flex justify-center items-center mx-auto'>
        {/* About our platform */}
        <div className='max-w-4xl p-2.5'>
          <h1 className='text-4xl font-semibold'>Download the India's favourite parking app</h1>
          <h1 className='border-b border-4 border-blue-500 w-20'></h1>
          <p className='mt-2.5'>
            Rated 5 stars with an average satisfaction rating of 96%, JustPark is the India favourite parking service. 
            But don't just take our word for it check out some of the latest customer reviews below for our London parking spaces.
          </p>
        </div>
        <div>
          <img src={AppDownloadIcon} alt="Download App" />
        </div>
      </section>
    </>
  )
}

export default Home