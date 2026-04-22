import React, { useState, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import Fuse from 'fuse.js';
import { Search, ArrowRight } from 'lucide-react';
import { STARTUPS } from './data/brands';
import { CATEGORIES } from './data/categories';
import BrandCard from './components/BrandCard';
import Navbar from './components/Navbar';
import Story from './views/Story';
import GiftGuide from './views/GiftGuide';

const fuseOptions = {
  keys: [
    { name: 'name', weight: 0.5 },
    { name: 'tags', weight: 0.3 },
    { name: 'description', weight: 0.2 },
    { name: 'category', weight: 0.1 }
  ],
  threshold: 0.3,
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const fuse = useMemo(() => new Fuse(STARTUPS, fuseOptions), []);

  const filteredBrands = useMemo(() => {
    let results = STARTUPS;
    if (searchQuery.length > 0) {
      results = fuse.search(searchQuery).map(result => result.item);
    }
    if (activeCategory !== 'All') {
      results = results.filter(brand => brand.category === activeCategory);
    }
    return results;
  }, [activeCategory, searchQuery, fuse]);

  return (
    <div className="min-h-screen bg-[#FFF8F0] font-sans text-gray-900 pb-20">
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            {/* Hero */}
            <div className="max-w-7xl mx-auto px-4 pt-6 pb-12">
              <div className="bg-yellow-400 rounded-3xl border-2 border-black p-8 md:p-16 relative overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#000_1px,transparent_0)] bg-[length:20px_20px]"></div>
                <div className="relative z-10 max-w-3xl">
                  <div className="inline-block bg-white border-2 border-black px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    The New Indian Aesthetic
                  </div>
                  <h2 className="text-5xl md:text-7xl font-black text-black leading-[0.9] mb-6">
                    DITCH THE <br/>
                    <span className="text-white text-stroke-black">NOISE.</span><br/>
                    GIFT INDIE <span className="italic text-pink-600">CANONS.</span>
                  </h2>
                  <p className="text-xl font-bold text-gray-800 mb-8 max-w-xl">
                    A curated collection of India's most interesting consumer startups.
                    From artisanal chocolates to streetwear that tells a story.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 max-w-lg">
                    <div className="relative flex-grow">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <Search className="text-gray-400" size={20} />
                      </div>
                      <input
                        type="text"
                        placeholder="Find coffee, sneakers, or games..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-14 pl-12 pr-4 bg-white border-2 border-black rounded-xl text-lg font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:font-medium placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-pink-500 rounded-full border-2 border-black hidden md:block"></div>
                <div className="absolute top-12 right-12 text-9xl opacity-20 rotate-12 hidden lg:block">🎁</div>
              </div>
            </div>

            {/* Categories */}
            <div className="max-w-7xl mx-auto px-4 mb-12 overflow-x-auto">
              <div className="flex gap-4 pb-4 min-w-max">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`
                        flex items-center gap-2 px-6 py-3 rounded-xl font-bold border-2 border-black transition-all duration-200
                        ${isActive
                          ? 'bg-black text-white shadow-[4px_4px_0px_0px_#ec4899] -translate-y-1'
                          : 'bg-white text-black hover:bg-gray-50 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1'}
                      `}
                    >
                      <Icon size={18} />
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Brand Grid */}
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredBrands.map((brand) => (
                  <BrandCard key={brand.id} brand={brand} />
                ))}
              </div>
              {filteredBrands.length === 0 && (
                <div className="text-center py-20 bg-white border-2 border-black rounded-3xl border-dashed">
                  <div className="text-6xl mb-4">🧐</div>
                  <h3 className="text-2xl font-black mb-2">No treasures found</h3>
                  <p className="text-gray-500 font-medium">Try searching for "coffee" or "games" instead.</p>
                </div>
              )}
            </div>

            {/* Footer CTA */}
            <div className="max-w-7xl mx-auto px-4 mt-20">
              <div className="bg-pink-500 border-2 border-black rounded-3xl p-10 text-center text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-3xl md:text-4xl font-black mb-4">Are you a Maker?</h2>
                  <p className="text-lg font-medium mb-8 max-w-2xl mx-auto opacity-90">
                    Building something that breaks the mold? We want to see it.
                    Join the collective and get discovered by people who care.
                  </p>
                  <a href="https://tally.so/r/rjj9kL" target="_blank" rel="noreferrer" className="bg-white text-black font-black px-8 py-4 rounded-xl border-2 border-black hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all flex items-center gap-2 mx-auto">
                    Submit Your Brand <ArrowRight size={20} />
                  </a>
                </div>
              </div>
            </div>

            <div className="text-center mt-12 text-sm font-bold text-gray-400 uppercase tracking-widest">
              © 2024 Indie Bazaar • Made for the daring
            </div>
          </>
        } />
        <Route path="/story" element={<Story />} />
        <Route path="/gift-guide" element={<GiftGuide />} />
      </Routes>
    </div>
  );
}
