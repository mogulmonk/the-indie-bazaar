import React, { useState, useMemo } from 'react';
import { Search, ExternalLink, Gift, ShoppingBag, Sparkles, Heart, Coffee, Shirt, Gamepad2, Home, Zap, ArrowRight } from 'lucide-react';

// --- 1. DATASET: Curated for Gifting & Buying ---
const STARTUPS = [
  // --- PANTRY ---
  {
    id: 1,
    name: "Subko Coffee",
    category: "Pantry",
    tags: ["Coffee", "Gift Worthy"],
    description: "Experimental specialty coffee & bakehouse. The packaging alone makes it a perfect gift.",
    price: "₹₹₹",
    color: "bg-emerald-100",
    url: "https://www.subko.coffee"
  },
  {
    id: 2,
    name: "The Whole Truth",
    category: "Pantry",
    tags: ["Healthy", "Snacks"],
    description: "Clean label bars and muesli. Ideal for the fitness freak friend who hates chemicals.",
    price: "₹₹",
    color: "bg-orange-100",
    url: "https://thewholetruthfoods.com"
  },
  {
    id: 3,
    name: "Manam Chocolates",
    category: "Pantry",
    tags: ["Luxury", "Sweets"],
    description: "Premium craft chocolate from Hyderabad. A sophisticated alternative to generic boxes.",
    price: "₹₹₹",
    color: "bg-amber-100",
    url: "https://manamchocolates.com"
  },
  {
    id: 4,
    name: "Svami Drinks",
    category: "Pantry",
    tags: ["Party", "Mixers"],
    description: "Progressive mixers for the home bartender. Cucumber tonic, ginger ale, and more.",
    price: "₹₹",
    color: "bg-lime-100",
    url: "https://svamidrinks.com"
  },
  {
    id: 5,
    name: "Pista Barfi",
    category: "Pantry",
    tags: ["Mithai", "Nostalgia"],
    description: "Old school mithai with a new school cool. The design is pure 90s nostalgia.",
    price: "₹₹",
    color: "bg-rose-100",
    url: "#"
  },
  {
    id: 6,
    name: "Mossant Kombucha",
    category: "Pantry",
    tags: ["Gut Health", "Artisanal"],
    description: "Small-batch artisanal kombucha brewed in Mumbai. Distinctively flavored.",
    price: "₹₹",
    color: "bg-purple-100",
    url: "https://mossant.com"
  },
  
  // --- WARDROBE ---
  {
    id: 11,
    name: "Gully Labs",
    category: "Wardrobe",
    tags: ["Streetwear", "Cool"],
    description: "Street culture aesthetics for the one who collects sneakers and stories.",
    price: "₹₹₹",
    color: "bg-yellow-100",
    url: "https://gullylabs.com"
  },
  {
    id: 12,
    name: "Jaipur Watch Co.",
    category: "Wardrobe",
    tags: ["Luxury", "Heirloom"],
    description: "Watches made with real British-era coins. A timeless gift for dads and collectors.",
    price: "₹₹₹₹",
    color: "bg-blue-100",
    url: "https://jaipur.watch"
  },
  {
    id: 13,
    name: "Gul Jaipur",
    category: "Wardrobe",
    tags: ["Ethnic", "Breezy"],
    description: "Modern block prints that feel like a summer afternoon in Jaipur.",
    price: "₹₹",
    color: "bg-pink-100",
    url: "#"
  },
  {
    id: 14,
    name: "Argos Watches",
    category: "Wardrobe",
    tags: ["Mechanical", "Minimal"],
    description: "Indian micro-brand creating reliable, aesthetic mechanical watches for enthusiasts.",
    price: "₹₹₹",
    color: "bg-teal-100",
    url: "https://argoswatch.com"
  },
  
  // --- PLAY ---
  {
    id: 20,
    name: "Shasn",
    category: "Play",
    tags: ["Board Game", "Strategy"],
    description: "The ultimate political strategy game. Ruin friendships over policy, not Monopoly.",
    price: "₹₹₹",
    color: "bg-red-100",
    url: "https://shasnthegame.com"
  },
  {
    id: 21,
    name: "Jigsaw Nation",
    category: "Play",
    tags: ["Art", "Relaxing"],
    description: "Stunning art puzzles by Indian artists. For the friend who needs a digital detox.",
    price: "₹₹",
    color: "bg-purple-100",
    url: "#"
  },
  {
    id: 22,
    name: "Mudgar Club",
    category: "Play",
    tags: ["Fitness", "Desi"],
    description: "Traditional Indian strength training clubs. Looks cool in a living room, builds serious muscle.",
    price: "₹₹",
    color: "bg-stone-100",
    url: "#"
  },
  {
    id: 23,
    name: "Shuffle Games",
    category: "Play",
    tags: ["Card Game", "Party"],
    description: "Fast-paced, easy-to-learn card games designed specifically for Indian house parties.",
    price: "₹",
    color: "bg-indigo-100",
    url: "#"
  },

  // --- LIVING ---
  {
    id: 24,
    name: "Phool.co",
    category: "Living",
    tags: ["Sustainable", "Fragrance"],
    description: "Incense made from temple flowers. Smells divine, saves the river. A classic gift.",
    price: "₹",
    color: "bg-teal-100",
    url: "https://phool.co"
  },
  {
    id: 25,
    name: "Claymen",
    category: "Living",
    tags: ["Decor", "Art"],
    description: "Minimalist clay sculptures that have more personality than most people.",
    price: "₹₹₹",
    color: "bg-gray-100",
    url: "https://claymen.in"
  },
  {
    id: 26,
    name: "Nurturing Green",
    category: "Living",
    tags: ["Plants", "Life"],
    description: "Gift a living plant. Because bouquets die, but succulents (hopefully) survive.",
    price: "₹₹",
    color: "bg-green-100",
    url: "https://nurturinggreen.in"
  },
  {
    id: 27,
    name: "Saphed",
    category: "Living",
    tags: ["Linen", "Comfort"],
    description: "Celebrating the timeless elegance of linen in home decor and bedding.",
    price: "₹₹₹",
    color: "bg-cyan-100",
    url: "https://saphed.com"
  },

  // --- SELF ---
  {
    id: 29,
    name: "Inde Wild",
    category: "Self",
    tags: ["Skincare", "Ayurveda"],
    description: "Ayurvedistry—ancient wisdom meets modern chemistry. For the skincare obsessive.",
    price: "₹₹₹",
    color: "bg-indigo-100",
    url: "https://indewild.com"
  },
  {
    id: 31,
    name: "Kama Ayurveda",
    category: "Self",
    tags: ["Luxury", "Wellness"],
    description: "The gold standard of Ayurvedic gifting. Pure, potent, and beautifully packaged.",
    price: "₹₹₹₹",
    color: "bg-orange-50",
    url: "https://kamaayurveda.in"
  },
  {
    id: 32,
    name: "Cosmix",
    category: "Self",
    tags: ["Nutrition", "Wellness"],
    description: "Functional plant-based nutrition mixes addressing gut health and sleep.",
    price: "₹₹",
    color: "bg-violet-100",
    url: "https://cosmix.in"
  }
];

const CATEGORIES = [
  { id: 'All', label: 'All Finds', icon: Sparkles },
  { id: 'Pantry', label: 'Tasty Treats', icon: Coffee },
  { id: 'Wardrobe', label: 'The Drip', icon: Shirt },
  { id: 'Living', label: 'Nest', icon: Home },
  { id: 'Play', label: 'Fun & Games', icon: Gamepad2 },
  { id: 'Self', label: 'Self Love', icon: Heart },
];

// --- 2. COMPONENTS ---

const BrandCard = ({ brand }) => (
  <div className="group relative flex flex-col bg-white border-2 border-black rounded-2xl overflow-hidden hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:-translate-y-1">
    {/* Card Header / Image Area */}
    <div className={`h-32 ${brand.color} border-b-2 border-black p-4 flex items-start justify-between relative overflow-hidden`}>
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
      <div className="z-10 bg-white border-2 border-black px-2 py-1 text-xs font-bold uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
        {brand.category}
      </div>
      <button className="z-10 p-2 bg-white border-2 border-black rounded-full hover:bg-pink-100 transition-colors" title="Add to Wishlist">
        <Heart size={16} className="text-black group-hover:fill-black" />
      </button>
    </div>

    {/* Content */}
    <div className="p-5 flex flex-col flex-grow">
      <div className="flex justify-between items-baseline mb-2">
        <h3 className="text-xl font-black text-black leading-tight">{brand.name}</h3>
        <span className="text-sm font-bold text-gray-500 font-mono">{brand.price}</span>
      </div>
      
      {/* Tags */}
      <div className="flex gap-2 mb-3 flex-wrap">
        {brand.tags.map(tag => (
          <span key={tag} className="text-[10px] font-bold uppercase px-2 py-1 bg-gray-100 text-gray-600 rounded-md">
            #{tag}
          </span>
        ))}
      </div>

      <p className="text-gray-700 text-sm font-medium leading-relaxed mb-6 flex-grow">
        {brand.description}
      </p>

      {/* Actions */}
      <div className="grid grid-cols-[1fr_auto] gap-3 mt-auto">
        <a 
          href={brand.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-black text-white font-bold py-3 px-4 rounded-xl hover:bg-gray-800 transition-colors border-2 border-black"
        >
          <ShoppingBag size={16} /> Shop Now
        </a>
        <button className="flex items-center justify-center p-3 bg-yellow-400 border-2 border-black rounded-xl hover:bg-yellow-300 transition-colors text-black" title="Gift This">
          <Gift size={20} />
        </button>
      </div>
    </div>
  </div>
);

// --- 3. MAIN APP COMPONENT ---

export default function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBrands = useMemo(() => {
    return STARTUPS.filter(brand => {
      const matchesCategory = activeCategory === 'All' || brand.category === activeCategory;
      const matchesSearch = 
        brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        brand.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FFF8F0] font-sans text-gray-900 pb-20">
      {/* Retro Navbar */}
      <nav className="sticky top-0 z-50 bg-[#FFF8F0]/90 backdrop-blur-sm border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pink-500 border-2 border-black rounded-lg flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Zap className="text-white fill-white" size={20} />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight uppercase italic">Indie Bazaar</h1>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <a href="#" className="font-bold hover:underline decoration-2 underline-offset-4">Our Story</a>
            <a href="#" className="font-bold hover:underline decoration-2 underline-offset-4">Gift Guide</a>
            <button className="bg-black text-white font-bold px-6 py-2 rounded-full hover:scale-105 transition-transform border-2 border-transparent">
              Submit Brand
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-12">
        <div className="bg-yellow-400 rounded-3xl border-2 border-black p-8 md:p-16 relative overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          {/* Decorative Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#000_1px,transparent_0)] bg-[length:20px_20px]"></div>
          
          <div className="relative z-10 max-w-3xl">
            <div className="inline-block bg-white border-2 border-black px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              The New Nostalgia
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-black leading-[0.9] mb-6">
              DITCH THE <br/>
              <span className="text-white text-stroke-black">GENERIC.</span><br/>
              GIFT THE <span className="italic text-pink-600">DARING.</span>
            </h2>
            <p className="text-xl font-bold text-gray-800 mb-8 max-w-xl">
              A curated collection of India's most interesting consumer startups. 
              From artisanal chocolates to streetwear that tells a story.
            </p>
            
            {/* Search Bar Integrated in Hero */}
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
          
          {/* Abstract decoration */}
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

      {/* Grid */}
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
            <button className="bg-white text-black font-black px-8 py-4 rounded-xl border-2 border-black hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all flex items-center gap-2 mx-auto">
              Submit Your Brand <ArrowRight size={20} />
            </button>
          </div>
        </div>
        <div className="text-center mt-12 text-sm font-bold text-gray-400 uppercase tracking-widest">
          © 2024 Indie Bazaar • Made for the daring
        </div>
      </div>
    </div>
  );
}