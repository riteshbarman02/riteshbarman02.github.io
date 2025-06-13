import React, { useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('light', !darkMode);
  };

  const navLinks = ["Home", "About", "Contact"];

  return (
    <header className="w-full fixed top-0 z-50 bg-white/5 backdrop-blur-xl shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="text-4xl font-bold text-text-heading italic font-cursive hover:text-text_subheading cursor-pointer shadow-lg rounded-lg p-2 hover:bg-white/20">
          R<span className="text-text_subheading hover:text-text-heading">B</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex space-x-6 text-text-heading">
          {navLinks.map((text, index) => (
            <a
              key={index}
              href="#"
              className="relative group hover:text-gray-300 transition duration-300"
            >
              {text}
              <span className="absolute inset-0 bg-secondary shadow-[0_0_25px_#a78bfa] rounded-full blur-3xl opacity-20 top-0 transition duration-300 group-hover:opacity-100 opacity-0 z-[-1]" />
            </a>
          ))}
        </nav>

        {/* Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          className="hidden lg:flex text-text-heading hover:text-yellow-300 transition duration-300 mr-4"
          title="Toggle theme"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden text-text-heading" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden px-4 pb-4 text-text-heading">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((text, index) => (
              <a
                key={index}
                href="#"
                className="relative group hover:text-gray-300 transition duration-300"
              >
                {text}
                <span className="absolute  bg-white shadow-[0_30px_25px_#a78bfa] rounded-full blur-2xl  top-0 transition duration-300 group-hover:opacity-100 opacity-0 z-[1]" />
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
