import React, { useState } from 'react';
import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';
import GlowBackground from '../ui/GlowBackground';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with Formspree, EmailJS, etc.
    console.log(formData);
    setStatus('Thank you! I will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="w-full min-h-screen bg-[#11071f] text-white flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 ">
        
        {/* Left Section: Details */}
        <div className="flex flex-col gap-2 ">
         
          <div>
            <h2 className="text-4xl font-bold mb-4">Contact Me</h2>
            <p className="text-white/80 mb-6">
              "Let's build something great together." — Reach out for collaborations, questions, or just to say hi!
            </p>
   
          </div>

          <div className="flex gap-4 text-2xl mt-4">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
              <FaGithub className="hover:text-purple-400 transition" />
            </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="hover:text-purple-400 transition" />
            </a>
            <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="hover:text-purple-400 transition" />
            </a>
          </div>
        </div>

        {/* Right Section: Form */}
        <div  className='backdrop-blur-md bg-white/10 border border-white/20 p-8 rounded-2xl shadow-lg relative'>
         <GlowBackground />
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="p-3 rounded-xl bg-white/10 border border-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="p-3 rounded-xl bg-white/10 border border-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="p-3 rounded-xl bg-white/10 border border-white/20 placeholder-white/70 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
            <button
              type="submit"
              className="mt-2 bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-xl transition-all duration-300"
            >
              Send Message
            </button>
          </form>
          {status && <p className="mt-4 text-green-400">{status}</p>}
        </div>
      </div>
    </div>
  );
};

export default Contact;
