import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

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
        <a href="#about" className="text-zinc-700 dark:text-zinc-200 hover:underline">About</a>
        <a href="#projects" className="text-zinc-700 dark:text-zinc-200 hover:underline">Projects</a>
        <a href="#tech" className="text-zinc-700 dark:text-zinc-200 hover:underline">Tech</a>
        <a href="#contact" className="text-zinc-700 dark:text-zinc-200 hover:underline">Contact</a>
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