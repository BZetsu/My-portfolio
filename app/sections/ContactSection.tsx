'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function ContactSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
      
      // Reset submission status after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };
  
  return (
    <section id="contact" className={`py-20 md:py-32 ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
            Get In Touch
          </h2>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} max-w-2xl mx-auto`}>
            Interested in working together? Have a question about one of my projects?
            I'd love to hear from you! Fill out the form below and I'll get back to you as soon as possible.
          </p>
        </motion.div>
        
        <div className="max-w-3xl mx-auto">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 md:p-10 border border-indigo-200 text-center"
            >
              <svg 
                className="w-16 h-16 mx-auto mb-4 text-green-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
              <p className="text-gray-700">
                Thank you for your message. I'll get back to you soon!
              </p>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              className={`${isDark 
                ? 'bg-black/80 backdrop-blur-sm border border-white/10' 
                : 'bg-white'
              } rounded-2xl p-6 md:p-10 border ${isDark ? 'border-gray-800' : 'border-gray-200'} shadow-lg`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className={`block mb-2 text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Your Name
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    className={`w-full ${
                      isDark 
                      ? 'bg-gray-900 text-white border-gray-700'
                      : 'bg-gray-50 text-gray-900 border-gray-300'
                    } rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                    Your Email
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full bg-gray-50 text-gray-900 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className={`block mb-2 font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Your Message
                </label>
                <motion.textarea
                  whileFocus={{ scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full ${
                    isDark 
                    ? 'bg-gray-900 text-white border-gray-700'
                    : 'bg-gray-50 text-gray-900 border-gray-300'
                  } rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                  placeholder="What would you like to discuss?"
                  required
                ></motion.textarea>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium text-base transition-all hover:shadow-lg w-full flex items-center justify-center ${isSubmitting ? 'opacity-70' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending Message...
                  </>
                ) : (
                  'Send Message'
                )}
              </motion.button>
              
              <p className="mt-4 text-sm text-gray-500 text-center">
                I'll never share your email with anyone else.
              </p>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
} 