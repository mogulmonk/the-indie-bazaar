import React, { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import { Search, ExternalLink, Gift, ShoppingBag, Sparkles, Heart, Coffee, Shirt, Gamepad2, Home, Zap, ArrowRight, ArrowLeft, Smile, Star } from 'lucide-react';

// --- 1. DATASET ---
const STARTUPS = [
// --- PANTRY --- 
{
  id: 1,
  name: "Subko Coffee",
  category: "Pantry",
  tags: [
    "Coffee",
    "Specialty Coffee",
    "Artisanal Coffee",
    "Indian Coffee",
    "Mumbai Coffee",
    "Roastery",
    "Coffee Beans",
    "Ground Coffee",
    "Filter Coffee",
    "Espresso",
    "Pour Over",
    "Cold Brew",
    "Brew At Home",
    "Cafe",
    "Bakery",
    "Bakes",
    "Gift Worthy",
    "Gifting",
    "Coffee Gift Box",
    "Aesthetic Packaging",
    "Designer Packaging",
    "Third Wave Coffee",
    "Premium",
    "Pantry Essentials",
    "Brunch",
    "Coffee Lover"
  ],
  description: "Experimental specialty coffee & bakehouse. The packaging alone makes it a perfect gift.",
  price: "₹₹₹",
  color: "bg-emerald-100",
  url: "https://www.subko.coffee"
},
{
  id: 2,
  name: "The Whole Truth",
  category: "Pantry",
  tags: [
    "Healthy",
    "Snacks",
    "Protein Bars",
    "Energy Bars",
    "Granola",
    "Muesli",
    "Clean Label",
    "No Added Sugar",
    "No Preservatives",
    "High Protein",
    "Fitness Snacks",
    "Gym Snacks",
    "Breakfast",
    "On The Go",
    "Indian D2C Brand",
    "Healthy Gifting",
    "Pantry Essentials",
    "Nutrition",
    "Diet Friendly",
    "Guilt Free"
  ],
  description: "Clean label bars and muesli. Ideal for the fitness freak friend who hates chemicals.",
  price: "₹₹",
  color: "bg-orange-100",
  url: "https://thewholetruthfoods.com"
},
{
  id: 3,
  name: "Manam Chocolates",
  category: "Pantry",
  tags: [
    "Luxury",
    "Sweets",
    "Chocolate",
    "Artisanal Chocolate",
    "Craft Chocolate",
    "Bean To Bar",
    "Single Origin",
    "Dark Chocolate",
    "Milk Chocolate",
    "Premium",
    "Gourmet",
    "Gift Box",
    "Chocolate Gift",
    "Dessert",
    "Hyderabad Brand",
    "Indian Chocolate",
    "Occasion Gifting",
    "Festive Gifting",
    "Indulgent",
    "Fine Chocolate"
  ],
  description: "Premium craft chocolate from Hyderabad. A sophisticated alternative to generic boxes.",
  price: "₹₹₹",
  color: "bg-amber-100",
  url: "https://manamchocolates.com"
},
{
  id: 4,
  name: "Svami Drinks",
  category: "Pantry",
  tags: [
    "Party",
    "Mixers",
    "Tonic Water",
    "Soda",
    "Ginger Ale",
    "Cocktail Mixers",
    "Mocktail Mixers",
    "Non Alcoholic",
    "Home Bar",
    "Bar Cart",
    "Host Gifting",
    "House Party",
    "Gin and Tonic",
    "Premium Mixers",
    "Indian Mixers",
    "Craft Beverage",
    "Brunch Drinks",
    "Pantry Drinks",
    "Sparkling Drinks"
  ],
  description: "Progressive mixers for the home bartender. Cucumber tonic, ginger ale, and more.",
  price: "₹₹",
  color: "bg-lime-100",
  url: "https://svamidrinks.com"
},
{
  id: 5,
  name: "Pista Barfi",
  category: "Pantry",
  tags: [
    "Mithai",
    "Nostalgia",
    "Indian Sweets",
    "Traditional Sweets",
    "Barfi",
    "Pistachio",
    "Festival",
    "Festive Gifting",
    "Rakhi",
    "Diwali",
    "Wedding Sweets",
    "Dessert",
    "Sweet Box",
    "Old School",
    "Retro",
    "90s Nostalgia",
    " mithai Gift",
    "Desi Dessert",
    "Classic Indian",
    "Comfort Food"
  ],
  description: "Old school mithai with a new school cool. The design is pure 90s nostalgia.",
  price: "₹₹",
  color: "bg-rose-100",
  url: "https://pistabarfi.com"
},
{
  id: 6,
  name: "Mossant Kombucha",
  category: "Pantry",
  tags: [
    "Gut Health",
    "Artisanal",
    "Kombucha",
    "Fermented Drink",
    "Probiotic",
    "Healthy Drinks",
    "Functional Beverage",
    "Low Sugar",
    "Vegan",
    "Mumbai Brand",
    "Craft Beverage",
    "Detox",
    "Wellness Drink",
    "Pantry Drinks",
    "Refreshing",
    "Small Batch",
    "Lifestyle",
    "Modern India"
  ],
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
  tags: [
    "Streetwear",
    "Cool",
    "Indian Streetwear",
    "Urban Wear",
    "Graphic Tees",
    "Oversized T-Shirt",
    "Hoodie",
    "Caps",
    "Sneakerhead",
    "Youth Fashion",
    "Indie Brand",
    "Local Brand",
    "Culture",
    "Hip Hop",
    "Casual Wear",
    "Everyday Wear",
    "Gen Z",
    "Unisex Clothing",
    "Desi Street",
    "Subculture"
  ],
  description: "Street culture aesthetics for the one who collects sneakers and stories.",
  price: "₹₹₹",
  color: "bg-yellow-100",
  url: "https://gullylabs.com"
},
{
  id: 12,
  name: "Jaipur Watch Co.",
  category: "Wardrobe",
  tags: [
    "Luxury",
    "Heirloom",
    "Watches",
    "Luxury Watches",
    "Heritage",
    "Coin Watches",
    "Collectible",
    "Made in India",
    "Premium Gifting",
    "Gift For Dad",
    "Gift For Him",
    "Wedding Gift",
    "Anniversary Gift",
    "Statement Piece",
    "Classic Style",
    "Timeless",
    "Indian Luxury Brand",
    "Men’s Accessories",
    "Formal Wear"
  ],
  description: "Watches made with real British-era coins. A timeless gift for dads and collectors.",
  price: "₹₹₹₹",
  color: "bg-blue-100",
  url: "https://jaipur.watch"
},
{
  id: 13,
  name: "Gul Jaipur",
  category: "Wardrobe",
  tags: [
    "Ethnic",
    "Breezy",
    "Indian Wear",
    "Jaipur",
    "Block Print",
    "Handblock",
    "Kurta",
    "Kurti",
    "Co-ord Set",
    "Summer Clothing",
    "Cotton Wear",
    "Resort Wear",
    "Boho",
    "Easy Dressing",
    "Everyday Ethnic",
    "Modern Indian",
    "Slow Fashion",
    "Comfort Clothing",
    "Vacation Wear"
  ],
  description: "Modern block prints that feel like a summer afternoon in Jaipur.",
  price: "₹₹",
  color: "bg-pink-100",
  url: "https://www.guljaipur.com"
},
{
  id: 14,
  name: "Argos Watches",
  category: "Wardrobe",
  tags: [
    "Mechanical",
    "Minimal",
    "Watches",
    "Mechanical Watch",
    "Automatic Watch",
    "Microbrand",
    "Indian Watch Brand",
    "Everyday Watch",
    "Minimal Design",
    "Clean Dial",
    "Watch Enthusiast",
    "Affordable Luxury",
    "Gift For Him",
    "Office Wear",
    "Classic Accessory",
    "Men’s Style",
    "Timeless Design",
    "Collector"
  ],
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
  tags: [
    "Board Game",
    "Strategy",
    "Political Game",
    "Tabletop",
    "Complex Board Game",
    "Story Driven",
    "Long Game Night",
    "Game For Adults",
    "Indian Board Game",
    "Multiplayer",
    "Social Strategy",
    "Tactical",
    "Debate",
    "Game Night",
    "Gift For Nerds",
    "Gift For Gamers",
    "Kickstarter Game",
    "Party Game",
    "Advanced Gamers"
  ],
  description: "The ultimate political strategy game. Ruin friendships over policy, not Monopoly.",
  price: "₹₹₹",
  color: "bg-red-100",
  url: "https://shasnthegame.com"
},
{
  id: 21,
  name: "Jigsaw Nation",
  category: "Play",
  tags: [
    "Art",
    "Relaxing",
    "Jigsaw Puzzle",
    "Puzzles",
    "Art Puzzle",
    "Indian Illustrators",
    "Wall Art",
    "Slow Living",
    "Mindfulness",
    "Digital Detox",
    "Indoor Activity",
    "Gifting",
    "Home Time",
    "Creative Hobby",
    "Cozy",
    "Aesthetic",
    "Calming",
    "Thoughtful Gift"
  ],
  description: "Stunning art puzzles by Indian artists. For the friend who needs a digital detox.",
  price: "₹₹",
  color: "bg-purple-100",
  url: "https://jigsawnation.com"
},
{
  id: 22,
  name: "Mudgar Club",
  category: "Play",
  tags: [
    "Fitness",
    "Desi",
    "Indian Fitness",
    "Traditional Training",
    "Mudgar",
    "Gada",
    "Strength Training",
    "Functional Training",
    "Home Workout",
    "Minimal Equipment",
    "Primitive Strength",
    "Athletic Training",
    "Old School Gym",
    "Indian Culture",
    "Ethnic Fitness",
    "Decor + Fitness",
    "Living Room Workout",
    "Conversation Starter"
  ],
  description: "Traditional Indian strength training clubs. Looks cool in a living room, builds serious muscle.",
  price: "₹₹",
  color: "bg-stone-100",
  url: "https://www.mudgarclub.com"
},
{
  id: 23,
  name: "Shuffle Games",
  category: "Play",
  tags: [
    "Card Game",
    "Party",
    "Family Game",
    "House Party",
    "Indian Card Game",
    "Quick Game",
    "Easy To Learn",
    "Icebreaker",
    "Game Night",
    "Drinking Game",
    "Friends",
    "Travel Friendly",
    "Portable Game",
    "Casual",
    "Fun",
    "Group Activity",
    "Social Game"
  ],
  description: "Fast-paced, easy-to-learn card games designed specifically for Indian house parties.",
  price: "₹",
  color: "bg-indigo-100",
  url: "https://shufflegames.co.in"
},

// --- LIVING ---
{
  id: 24,
  name: "Phool.co",
  category: "Living",
  tags: [
    "Sustainable",
    "Fragrance",
    "Incense",
    "Temple Flowers",
    "Upcycled",
    "Eco Friendly",
    "Home Fragrance",
    "Agarbatti",
    "Dhoop",
    "Gifting",
    "Pooja Essentials",
    "Home Decor",
    "Sacred",
    "Meditation",
    "Calm",
    "Made in India",
    "Social Impact",
    "Conscious Living"
  ],
  description: "Incense made from temple flowers. Smells divine, saves the river. A classic gift.",
  price: "₹",
  color: "bg-teal-100",
  url: "https://phool.co"
},
{
  id: 25,
  name: "Claymen",
  category: "Living",
  tags: [
    "Decor",
    "Art",
    "Sculpture",
    "Clay Figures",
    "Minimalist",
    "Quirky",
    "Conversation Piece",
    "Living Room Decor",
    "Bookshelf Decor",
    "Desk Decor",
    "Indian Artist",
    "Handcrafted",
    "Collectible",
    "Art Object",
    "Modern Home",
    "Gift For Creatives",
    "Aesthetic Home"
  ],
  description: "Minimalist clay sculptures that have more personality than most people.",
  price: "₹₹₹",
  color: "bg-gray-100",
  url: "https://claymen.in"
},
{
  id: 26,
  name: "Nurturing Green",
  category: "Living",
  tags: [
    "Plants",
    "Life",
    "Indoor Plants",
    "Gifting Plants",
    "Succulents",
    "Desk Plant",
    "Home Office",
    "Green Gifting",
    "Sustainable Gifting",
    "Housewarming Gift",
    "Low Maintenance",
    "Planter",
    "Urban Jungle",
    "Home Decor",
    "Fresh",
    "Nature At Home"
  ],
  description: "Gift a living plant. Because bouquets die, but succulents (hopefully) survive.",
  price: "₹₹",
  color: "bg-green-100",
  url: "https://nurturinggreen.in"
},
{
  id: 27,
  name: "Saphed",
  category: "Living",
  tags: [
    "Linen",
    "Comfort",
    "Bedsheets",
    "Duvet",
    "Cushion Covers",
    "Table Linen",
    "Minimal Home",
    "Neutral Tones",
    "Soft Furnishings",
    "Premium Bedding",
    "Made in India",
    "Slow Living",
    "Minimalist Decor",
    "Scandi Vibes",
    "Cozy Home",
    "Everyday Luxury",
    "Clean Aesthetic"
  ],
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
  tags: [
    "Skincare",
    "Ayurveda",
    "Ayurvedistry",
    "Serum",
    "Face Oil",
    "SPF",
    "Indian Skincare",
    "Influencer Brand",
    "Glow",
    "Hyperpigmentation",
    "Acne Care",
    "Modern Ayurveda",
    "Clean Beauty",
    "Vegan",
    "Cruelty Free",
    "Self Care",
    "Daily Routine",
    "Gift For Her",
    "Beauty Gift"
  ],
  description: "Ayurvedistry—ancient wisdom meets modern chemistry. For the skincare obsessive.",
  price: "₹₹₹",
  color: "bg-indigo-100",
  url: "https://indewild.com"
},
{
  id: 31,
  name: "Kama Ayurveda",
  category: "Self",
  tags: [
    "Luxury",
    "Wellness",
    "Skincare",
    "Haircare",
    "Bodycare",
    "Ayurvedic",
    "Herbal",
    "Spa At Home",
    "Essential Oils",
    "Gifting",
    "Gift Box",
    "Wedding Hamper",
    "Bridal",
    "Self Care Ritual",
    "Pamper",
    "Premium Brand",
    "Made in India",
    "Traditional Recipes",
    "Clean Beauty"
  ],
  description: "The gold standard of Ayurvedic gifting. Pure, potent, and beautifully packaged.",
  price: "₹₹₹₹",
  color: "bg-orange-50",
  url: "https://kamaayurveda.in"
},
{
  id: 32,
  name: "Cosmix",
  category: "Self",
  tags: [
    "Nutrition",
    "Wellness",
    "Supplements",
    "Plant Based",
    "Adaptogens",
    "Gut Health",
    "Sleep",
    "Hormone Balance",
    "Women’s Health",
    "Functional Mixes",
    "Superfoods",
    "Healthy Habits",
    "Daily Routine",
    "Holistic Health",
    "Stir In Drinks",
    "Smoothie Add On",
    "Self Care",
    "Inside Out Beauty"
  ],
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

// --- CONFIGURING THE SEARCH ENGINE ---
const fuseOptions = {
  keys: [
    { name: 'name', weight: 0.5 },
    { name: 'tags', weight: 0.3 },
    { name: 'description', weight: 0.2 },
    { name: 'category', weight: 0.1 }
  ],
  threshold: 0.4, // <--- CHANGED: 0.4 allows for more "fuzzy" typos
};

// --- 2. SUB-COMPONENTS ---

const BrandCard = ({ brand }) => (
  <div className="group relative flex flex-col bg-white border-2 border-black rounded-2xl overflow-hidden hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:-translate-y-1">
    <div className={`h-32 ${brand.color} border-b-2 border-black p-4 flex items-start justify-between relative overflow-hidden`}>
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
      <div className="z-10 bg-white border-2 border-black px-2 py-1 text-xs font-bold uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
        {brand.category}
      </div>
      <button className="z-10 p-2 bg-white border-2 border-black rounded-full hover:bg-pink-100 transition-colors" title="Add to Wishlist">
        <Heart size={16} className="text-black group-hover:fill-black" />
      </button>
    </div>

    <div className="p-5 flex flex-col flex-grow">
      <div className="flex justify-between items-baseline mb-2">
        <h3 className="text-xl font-black text-black leading-tight">{brand.name}</h3>
        <span className="text-sm font-bold text-gray-500 font-mono">{brand.price}</span>
      </div>
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
      <div className="grid grid-cols-[1fr_auto] gap-3 mt-auto">
        <a href={brand.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-black text-white font-bold py-3 px-4 rounded-xl hover:bg-gray-800 transition-colors border-2 border-black">
          <ShoppingBag size={16} /> Shop Now
        </a>
        <button className="flex items-center justify-center p-3 bg-yellow-400 border-2 border-black rounded-xl hover:bg-yellow-300 transition-colors text-black" title="Gift This">
          <Gift size={20} />
        </button>
      </div>
    </div>
  </div>
);

// --- NEW: Story View ---
const StoryView = ({ onBack }) => (
  <div className="max-w-3xl mx-auto px-4 pt-10 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black mb-8">
      <ArrowLeft size={16} /> Back to Bazaar
    </button>
    
    <div className="bg-white border-2 border-black rounded-3xl p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100 rounded-full blur-3xl -mr-32 -mt-32 opacity-50"></div>
      
      <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10">
        WE WERE TIRED OF <br/>
        <span className="text-pink-500">BORING GIFTS.</span>
      </h2>
      
      <div className="space-y-6 text-lg font-medium text-gray-800 relative z-10 leading-relaxed">
        <p>
          You know the drill. The generic voucher. The mass-produced mug. The shirt that shrinks after one wash.
        </p>
        <p>
          India is teeming with makers who pour their soul into what they build. We wanted to give them a stage that wasn't buried under a thousand sponsored ads or generic dropshipping stores.
        </p>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 my-8">
          <p className="text-sm font-bold uppercase text-yellow-600 mb-2 tracking-widest">Our Mission</p>
          <p className="text-xl font-black italic">
            "To make gifting daring again."
          </p>
        </div>
        <p>
          Indie Bazaar is a collection of the weird, the wonderful, and the exceptionally well-made. Every brand here is Indian-owned, design-led, and worth your time.
        </p>
      </div>
      
      <div className="mt-12 pt-8 border-t-2 border-gray-100 flex items-center gap-4">
        <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white text-xl">👋</div>
        <div>
          <p className="font-bold text-black">Curated by Yash</p>
          <p className="text-sm text-gray-500">Building in public.</p>
        </div>
      </div>
    </div>
  </div>
);

// --- NEW: Gift Guide View ---
const GiftGuideView = ({ onBack }) => {
  const personas = [
    { title: "The Coffee Snob", desc: "Thinks Starbucks is 'burnt water'. Needs beans with a backstory.", color: "bg-emerald-100", icon: Coffee },
    { title: "The Aesthetic Chaser", desc: "If it's not on Instagram, did it even happen?", color: "bg-pink-100", icon: Sparkles },
    { title: "The Homebody", desc: "Cancels plans to stay in. Needs incense, clay, and comfort.", color: "bg-orange-100", icon: Home },
    { title: "The Cool Kid", desc: "Wears brands you've never heard of. Yet.", color: "bg-yellow-100", icon: Zap },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 pt-10 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black mb-8">
        <ArrowLeft size={16} /> Back to Bazaar
      </button>

      <div className="text-center mb-16">
        <div className="inline-block bg-black text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">The Cheat Sheet</div>
        <h2 className="text-4xl md:text-6xl font-black text-black mb-6">WHO ARE YOU <br/><span className="text-purple-500 italic">SHOPPING FOR?</span></h2>
        <p className="text-xl font-medium text-gray-600 max-w-2xl mx-auto">
          Don't panic. We've categorized the best of Indie India by personality type.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {personas.map((p, i) => (
          <div key={i} className={`p-8 rounded-3xl border-2 border-black ${p.color} hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:-translate-y-1 cursor-pointer`}>
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-white border-2 border-black rounded-xl">
                <p.icon size={24} />
              </div>
              <ArrowRight size={24} className="opacity-20" />
            </div>
            <h3 className="text-2xl font-black mb-2">{p.title}</h3>
            <p className="font-medium opacity-75">{p.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center bg-white border-2 border-black rounded-3xl p-12 relative overflow-hidden">
         <div className="relative z-10">
            <h3 className="text-2xl font-black mb-4">Still stuck?</h3>
            <p className="text-lg text-gray-600 mb-8">Get the "Mystery Box" and let fate decide.</p>
            <button className="bg-black text-white font-bold px-8 py-3 rounded-xl hover:bg-gray-800 transition-colors">
              Coming Soon
            </button>
         </div>
         <div className="absolute -right-10 -bottom-10 text-9xl opacity-10 rotate-12">🎁</div>
      </div>
    </div>
  );
};

// --- 3. MAIN APP COMPONENT ---

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'story', 'guide'
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

 // Initialize Fuse Search Engine
 const fuse = useMemo(() => new Fuse(STARTUPS, fuseOptions), []);

 const filteredBrands = useMemo(() => {
   let results = STARTUPS;

   // 1. Fuzzy Search (Only if typing)
   if (searchQuery.length > 0) {
     results = fuse.search(searchQuery).map(result => result.item);
   }

   // 2. Category Filter (Applied AFTER search)
   if (activeCategory !== 'All') {
     results = results.filter(brand => brand.category === activeCategory);
   }

   return results;
 }, [activeCategory, searchQuery, fuse]);

  // Function to render the main content based on view state
  const renderContent = () => {
    if (currentView === 'story') return <StoryView onBack={() => setCurrentView('home')} />;
    if (currentView === 'guide') return <GiftGuideView onBack={() => setCurrentView('home')} />;

    return (
      <>
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 pt-16 pb-12">
          <div className="bg-yellow-400 rounded-3xl border-2 border-black p-8 md:p-16 relative overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
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
              <a href="https://tally.so/r/rjj9kL" target="_blank" rel="noreferrer" className="bg-white text-black font-black px-8 py-4 rounded-xl border-2 border-black hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all flex items-center gap-2 mx-auto">
                Submit Your Brand <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] font-sans text-gray-900 pb-20">
      {/* Retro Navbar */}
      <nav className="sticky top-0 z-50 bg-[#FFF8F0]/90 backdrop-blur-sm border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setCurrentView('home')}
          >
            <div className="w-10 h-10 bg-pink-500 border-2 border-black rounded-lg flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Zap className="text-white fill-white" size={20} />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight uppercase italic">Indie Bazaar</h1>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => setCurrentView('story')}
              className={`font-bold hover:underline decoration-2 underline-offset-4 ${currentView === 'story' ? 'text-pink-600' : ''}`}
            >
              Our Story
            </button>
            <button 
              onClick={() => setCurrentView('guide')}
              className={`font-bold hover:underline decoration-2 underline-offset-4 ${currentView === 'guide' ? 'text-pink-600' : ''}`}
            >
              Gift Guide
            </button>
            <a href="https://tally.so/r/rjj9kL" target="_blank" rel="noreferrer" className="bg-black text-white font-bold px-6 py-2 rounded-full hover:scale-105 transition-transform border-2 border-transparent">
              Submit Brand
            </a>
          </div>
        </div>
      </nav>

      {/* Render Dynamic Content */}
      {renderContent()}

      {currentView === 'home' && (
        <div className="text-center mt-12 text-sm font-bold text-gray-400 uppercase tracking-widest">
          © 2024 Indie Bazaar • Made for the daring
        </div>
      )}
    </div>
  );
}