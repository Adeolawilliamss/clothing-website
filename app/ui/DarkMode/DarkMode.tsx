"use client"

import { useEffect, useState } from 'react';
import Sun from '@/app/ui/DarkMode/Sun.svg';
import Moon from '@/app/ui/DarkMode/Moon.svg';
import './Darkmode.css';

const DarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check localStorage for the user's preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      document.body.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    const newTheme = !isDarkMode ? 'dark' : 'light';
    document.body.classList.toggle('dark', !isDarkMode);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className='dark_mode flex flex-row mx-auto'>
      <input
        className='dark_mode_input'
        type='checkbox'
        id='darkmode-toggle'
        checked={isDarkMode}
        onChange={toggleDarkMode}
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}  // Accessibility improvement
        title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}  // Accessibility improvement
      />
      <label className='dark_mode_label' htmlFor='darkmode-toggle'>
        <Sun className="w-6 h-6" alt="Sun" />
        <Moon className="w-6 h-6 ml-10" alt="Moon" />
      </label>
    </div>
  );
};

export default DarkMode;
