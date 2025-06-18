import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import '../App.css';
import { Link } from 'react-router-dom';

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
    <header className="w-full px-6 py-4 flex justify-between items-center bg-white dark:bg-zinc-900 shadow-sm fixed left-0 top-0 z-50">
      <h1 className="text-xl font-bold text-zinc-800 dark:text-white">My</h1>
      
      <nav className="space-x-6 md:flex">
        <Link to="#HeroSection" className="text-zinc-700 dark:text-zinc-200 hover:underline">About</Link>
        <Link to="#projects" className="text-zinc-700 dark:text-zinc-200 hover:underline">Projects</Link>
        <Link to="#tech" className="text-zinc-700 dark:text-zinc-200 hover:underline">Tech</Link>
        <Link to="#contact" className="text-zinc-700 dark:text-zinc-200 hover:underline">Contact</Link>
      </nav>
      
      <button
        onClick={() => setIsDark(!isDark)}
        className="ml-4 text-zinc-700 dark:text-zinc-200"
        aria-label="Toggle Dark Mode"
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </header>
  );
};

export default Header;
