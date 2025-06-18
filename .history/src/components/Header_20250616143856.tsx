import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Header = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <BrowserRouter>
      <header className="w-full px-6 py-4 flex justify-between items-center bg-white dark:bg-zinc-900 shadow-sm fixed left-0 top-0 z-50">
        <h1 className="text-xl font-bold text-zinc-800 dark:text-white">My</h1>
        
        <Routes className="space-x-6 md:flex">
          <Route path="#HeroSection" className="text-zinc-700 dark:text-zinc-200 hover:underline">About</Route>
          <Route path="#projects" className="text-zinc-700 dark:text-zinc-200 hover:underline">Projects</Route>
          <Route path="#tech" className="text-zinc-700 dark:text-zinc-200 hover:underline">Tech</Route>
          <Route path="#contact" className="text-zinc-700 dark:text-zinc-200 hover:underline">Contact</Route>
        </Routes>

        <button
          onClick={() => setIsDark(!isDark)}
          className="ml-4 text-zinc-700 dark:text-zinc-200"
          aria-label="Toggle Dark Mode"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>
    </BrowserRouter>
  );
};

export default Header;
