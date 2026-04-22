import { Link, NavLink } from 'react-router-dom';
import { Zap } from 'lucide-react';

const Navbar = () => (
  <nav className="sticky top-0 z-50 bg-[#FFF8F0]/90 backdrop-blur-sm border-b-2 border-black">
    <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-3 cursor-pointer">
        <div className="w-10 h-10 bg-pink-500 border-2 border-black rounded-lg flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <Zap className="text-white fill-white" size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-black tracking-tight uppercase italic">Indie Bazaar</h1>
        </div>
      </Link>

      <div className="hidden md:flex items-center gap-4">
        <NavLink
          to="/story"
          className={({ isActive }) => `font-bold hover:underline decoration-2 underline-offset-4${isActive ? ' text-pink-600' : ''}`}
        >
          Our Story
        </NavLink>
        <NavLink
          to="/gift-guide"
          className={({ isActive }) => `font-bold hover:underline decoration-2 underline-offset-4${isActive ? ' text-pink-600' : ''}`}
        >
          Gift Guide
        </NavLink>
        <a
          href="https://tally.so/r/rjj9kL"
          target="_blank"
          rel="noreferrer"
          className="bg-black text-white font-bold px-6 py-2 rounded-full hover:scale-105 transition-transform border-2 border-transparent"
        >
          Submit Brand
        </a>
      </div>
    </div>
  </nav>
);

export default Navbar;
