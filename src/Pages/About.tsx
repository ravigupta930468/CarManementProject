import { useNavigate } from "react-router-dom";
import AboutUsWallPaper from "../..//Public/Images/AboutUs/AboutUsWallpapre.png";
import AppLogo from "../../public/Images/AboutUs/AppLogo.png"
import AppStore from "../../public/Images/AboutUs/appstore_bt-Bw36Ky4f.svg"
import googleStore from "../../public/Images/AboutUs/googleplay_bt-BT1q52l8.svg"

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section 
        style={{ backgroundImage: `url(${AboutUsWallPaper})` }} 
        className="relative w-full bg-cover bg-center bg-no-repeat flex justify-evenly items-center mt-5 p-10 min-h-[300px]"
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-20 text-white max-w-xl">
          <h1 className="text-4xl font-bold">
            We're <span className="text-blue-500">ParkHub</span>, here to make every journey easier
          </h1>
          <p className="mt-4 text-gray-300">
            Nearly twenty years in, we're still making parking simple—with bookable spaces and fast, effortless app payments.
          </p>
        </div>
        
        <div className="relative z-20 hidden md:block">
          <img 
            src={AboutUsWallPaper} 
            alt="About Us"
            className="h-64 rounded-2xl border-4 border-white/10 shadow-2xl object-cover" 
          />
        </div>
      </section>

      {/* Founder Section */}
      <section className="flex justify-center mt-12 px-6">
        <div className="max-w-5xl">
          <h1 className="text-4xl font-bold">
            India's <span className="text-blue-400">favourite</span> parking app
          </h1>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            The Parking Hub was founded in 2024 by Dhruv, who noticed a glaring inefficiency in urban life... 
            Today we have simplified the parking experience for thousands of users.
          </p>
        </div>
      </section>

      {/* Call to Action Section */}

     <div className="mt-12 w-full max-w-7xl max-auto p-6 mb-20">
        <div className="grid grid-cols-3 gap-6">
            
        <div className="col-span-2 bg-slate-50 p-10 flex flex-col justify-center rounded-[3rem] border-slate-100 shadow-sm border ">
            <h2 className="text-3xl font-bold">About <span className="text-blue-400">ParkHub</span></h2>
        <p className="text-slate-600 max-w-3xl">
          We’re ParkHub, making parking quicker, cheaper, and smarter. We connect drivers to reservable spaces nationwide—saving time, money, and hassle on every journey.
        </p>
        <button 
          className="px-8 py-4 font-bold w-44 text-white bg-blue-600 rounded-2xl mt-4 hover:bg-blue-700 transition-all hover:scale-95 shadow-lg shadow-blue-200" 
          onClick={() => navigate('/')}
        >
          Go to Home
        </button>
        </div>
        <div className="col-span-1 bg-slate-50  rounded-[3rem] border-slate-100 shadow-sm border flex items-center justify-center overflow-hidden">
          <img src={AppLogo} className=" rounded-[3rem]  "/>
        </div>

        <div className="col-span-2 text-black bg-slate-50 p-10 flex flex-col justify-center rounded-[3rem] border-slate-100 shadow shadow-md">
          <h1 className="font-bold mb-1.5 ">Why Park Hub</h1>
          <h2 className="text-sm font-bold">Trusted by 13M+ drivers</h2>
          <p>100k+ reservable spaces, all verified and reviewed.</p>
          <h2 className="text-sm font-bold mt-3.5">Flexible Bookings</h2>
          <p>Free cancellation up to 24h before arrival. Extend anytime, hassle-free.</p>
          <h2 className="text-sm font-bold mt-3.5">Best Price Guarantee</h2>
          <p>Find it cheaper elsewhere? We’ll match it + 20% credit.</p>
        </div>
         <div className="col-span-1 bg-slate-50  rounded-[3rem] border-slate-100 shadow-sm border flex flex-col items-center justify-center overflow-hidden">
          <h1 className="font-bold">Download the App</h1>
          <p className="p-2.5">Rated 5 stars with an average satisfaction score of 96%, ParkHub is the india favourite parking service. Trusted by millions of drivers nationwide.</p>
          <div className="flex justify-center gap-4 items-center top-3">
            <img src= {AppStore}/>
            <img src={googleStore}/>
          </div>
        </div>
      </div>
     </div>
    </div>
  );
};

export default About;