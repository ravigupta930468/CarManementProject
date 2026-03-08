import React from 'react';
import { FaChartBar, FaShieldAlt, FaGlobe, FaArrowRight, FaHandshake, FaUserTie } from 'react-icons/fa';
import BusinessHelp from "../assets/busniesHelp.jpg"

const BusinessPage = () => {
  return (
    <div className="bg-white text-slate-900 font-sans">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-20 pb-32 px-6 bg-gradient-to-br from-blue-50 via-white to-blue-50/30 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 space-y-8 z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/80 rounded-full text-blue-700 font-bold text-xs uppercase tracking-widest shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              Enterprise Solutions
            </div>
            <h1 className="text-6xl font-black tracking-tight leading-[1.1]">
              Maximize your <br />
              <span className="text-blue-600 italic">Parking Assets.</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-xl">
              From individual driveway owners to commercial real estate giants, we provide the technology to monetize and manage parking spaces with 96% driver satisfaction.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-10 py-5 bg-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
                Partner with Us <FaArrowRight />
              </button>
              <button className="px-10 py-5 bg-white border-2 border-slate-100 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 transition-all shadow-sm">
                View Case Studies
              </button>
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src={BusinessHelp} 
                alt="Modern Parking Management" 
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Decorative abstract shape */}
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -z-0"></div>
          </div>
        </div>
      </section>

      {/* --- STATS BAR --- */}
      <section className="px-6 mt-16">
        <div className="max-w-6xl mx-auto bg-slate-900 rounded-[35px] p-10 shadow-2xl grid grid-cols-2 lg:grid-cols-4 gap-8 text-white border-b-4 border-blue-600">
          <div className="text-center space-y-1">
            <p className="text-3xl font-black text-blue-400">13M+</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Global Drivers</p>
          </div>
          <div className="text-center space-y-1 border-l border-slate-700/50">
            <p className="text-3xl font-black text-blue-400">45k+</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Partner Sites</p>
          </div>
          <div className="text-center space-y-1 border-l border-slate-700/50">
            <p className="text-3xl font-black text-blue-400">₹25Cr+</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Monthly Payouts</p>
          </div>
          <div className="text-center space-y-1 border-l border-slate-700/50">
            <p className="text-3xl font-black text-blue-400">96%</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Retention Rate</p>
          </div>
        </div>
      </section>

      {/* --- SOLUTIONS SECTION --- */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-black mb-6">Tailored solutions for every scale.</h2>
            <p className="text-slate-500 text-lg italic">"We handle the complexity of parking so you can focus on your core business."</p>
          </div>
          <div className="h-1 w-32 bg-blue-600 rounded-full hidden md:block"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Solution 1 */}
          <div className="group p-10 rounded-[40px] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:border-blue-100 transition-all duration-500">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-8 text-2xl shadow-lg shadow-blue-200">
              <FaHandshake />
            </div>
            <h3 className="text-2xl font-black mb-4 group-hover:text-blue-600 transition-colors">Property Owners</h3>
            <p className="text-slate-500 leading-relaxed mb-6">
              Turn your underutilized driveway, garage, or land into a passive income stream. Set your own hours, prices, and availability via our partner portal.
            </p>
            <ul className="space-y-3 mb-8 text-sm font-bold text-slate-600">
              <li className="flex items-center gap-2">✓ Monthly Automated Payouts</li>
              <li className="flex items-center gap-2">✓ Dynamic Pricing Control</li>
              <li className="flex items-center gap-2">✓ Verified Driver Profiles</li>
            </ul>
            <button className="text-blue-600 font-black flex items-center gap-2 hover:gap-4 transition-all uppercase text-xs tracking-widest">
              Learn More <FaArrowRight />
            </button>
          </div>

          {/* Solution 2 */}
          <div className="group p-10 rounded-[40px] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:border-blue-100 transition-all duration-500">
            <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white mb-8 text-2xl shadow-lg">
              <FaUserTie />
            </div>
            <h3 className="text-2xl font-black mb-4 group-hover:text-blue-600 transition-colors">Corporate Fleets</h3>
            <p className="text-slate-500 leading-relaxed mb-6">
              Empower your employees or logistics team with guaranteed parking. Centralized billing and real-time space management for large-scale operations.
            </p>
            <ul className="space-y-3 mb-8 text-sm font-bold text-slate-600">
              <li className="flex items-center gap-2">✓ Multi-User Dashboards</li>
              <li className="flex items-center gap-2">✓ Tax-Ready Invoicing</li>
              <li className="flex items-center gap-2">✓ Priority Support Access</li>
            </ul>
            <button className="text-blue-600 font-black flex items-center gap-2 hover:gap-4 transition-all uppercase text-xs tracking-widest">
              Learn More <FaArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto rounded-[50px] bg-blue-600 p-16 text-center text-white shadow-2xl shadow-blue-300 relative overflow-hidden">
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-5xl font-black leading-tight">Ready to join the <br />parking revolution?</h2>
            <p className="text-blue-100 text-lg max-w-xl mx-auto opacity-90 font-medium">
              Join thousands of partners already earning with The Parking Hub. No setup fees, no contracts, just results.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-12 py-5 bg-white text-blue-600 font-black rounded-2xl hover:bg-blue-50 transition-colors shadow-lg">
                Get Started Now
              </button>
              <button className="px-12 py-5 bg-blue-700 text-white font-black rounded-2xl hover:bg-blue-800 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
          {/* Subtle background circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-20 -mb-20 blur-2xl"></div>
        </div>
      </section>
      
    </div>
  );
};

export default BusinessPage;