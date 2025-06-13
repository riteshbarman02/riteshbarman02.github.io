import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react'; // Optional icons

const Navbar = ({ darkMode , setDarkMode}) => {
  const [isOpen, setIsOpen] = useState(false);


  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('light', !darkMode);
  };

  // Optional: initialize based on system preference


  return (
    <header className="w-full  fixed top-0 z-50 bg-white/5 backdrop-blur-xl shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="text-4xl font-bold text-text-heading italic font-cursive hover:text-text_subheading cursor-pointer shadow-lg rounded-lg p-2 hover:bg-white/20">
          R<span className='text-text_subheading hover:text-text-heading'>B</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex space-x-6 text-text-heading">
          <a href="#" className="hover:text-gray-300">Home</a>
          <a href="#" className="hover:text-gray-300">About</a>
          <a href="#" className="hover:text-gray-300">Contact</a>
        </nav>

        {/* Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          className="hidden  lg:flex text-text-heading hover:text-yellow-300 transition duration-300 mr-4"
          title="Toggle theme"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Mobile toggle */}
        <button className="lg:hidden text-text-heading" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden px-4 pb-4 text-text-heading">
          <nav className="flex flex-col space-y-2">
            <a href="#" className="hover:text-gray-300">Home</a>
            <a href="#" className="hover:text-gray-300">About</a>
            <a href="#" className="hover:text-gray-300">Contact</a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
