import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-gray-200 pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Brand Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
               <span className="text-white font-bold text-xl">P</span>
            </div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">The Parking Hub</h2>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">
            The smarter way to find parking. Join over 13 million drivers enjoying stress-free, cheaper parking across India.
          </p>
          <div className="flex gap-4 pt-2">
            <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors"><FaFacebook size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors"><FaTwitter size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors"><FaInstagram size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-blue-700 transition-colors"><FaLinkedin size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-slate-800 font-bold mb-6 uppercase text-xs tracking-widest">Platform</h3>
          <ul className="space-y-4 text-sm">
            <li><a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">Search Locations</a></li>
            <li><a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">How it Works</a></li>
            <li><a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">List Your Space</a></li>
            <li><a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">Business Solutions</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-slate-800 font-bold mb-6 uppercase text-xs tracking-widest">Support</h3>
          <ul className="space-y-4 text-sm font-medium">
            <li className="flex items-center gap-3 text-gray-500">
              <FaPhoneAlt className="text-blue-600" /> +91 800-PARK-HUB
            </li>
            <li className="flex items-center gap-3 text-gray-500">
              <FaEnvelope className="text-blue-600" /> support@parkhub.in
            </li>
            <li className="flex items-center gap-3 text-gray-500">
              <FaMapMarkerAlt className="text-blue-600" /> Noida sector-16, Uatter Pradesh, India
            </li>
          </ul>
        </div>

        {/* Newsletter/Trust */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-slate-800 font-bold mb-2 text-sm">Download our App</h3>
          <p className="text-xs text-gray-400 mb-4">India's favorite parking app with 96% satisfaction rating.</p>
          <div className="space-y-2">
            <button className="w-full bg-slate-900 text-white text-xs font-bold py-3 rounded-xl hover:bg-slate-800 transition shadow-md">
              Get it on App Store
            </button>
            <button className="w-full bg-slate-900 text-white text-xs font-bold py-3 rounded-xl hover:bg-slate-800 transition shadow-md">
              Get it on Google Play
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-400 text-xs text-center">
          © 2026 The Parking Hub. All rights reserved. Made for stress-free journeys.
        </p>
        <div className="flex gap-6 text-xs font-bold text-gray-400">
          <a href="#" className="hover:text-slate-600">Privacy Policy</a>
          <a href="#" className="hover:text-slate-600">Terms of Service</a>
          <a href="#" className="hover:text-slate-600">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;