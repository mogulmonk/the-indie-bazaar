import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Coffee, Sparkles, Home, Zap } from 'lucide-react';

const personas = [
  { title: "The Coffee Snob", desc: "Thinks Starbucks is 'burnt water'. Needs beans with a backstory.", color: "bg-emerald-100", icon: Coffee },
  { title: "The Aesthetic Chaser", desc: "If it's not on Instagram, did it even happen?", color: "bg-pink-100", icon: Sparkles },
  { title: "The Homebody", desc: "Cancels plans to stay in. Needs incense, clay, and comfort.", color: "bg-orange-100", icon: Home },
  { title: "The Cool Kid", desc: "Wears brands you've never heard of. Yet.", color: "bg-yellow-100", icon: Zap },
];

const GiftGuide = () => (
  <div className="max-w-5xl mx-auto px-4 pt-10 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <Link to="/" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black mb-8">
      <ArrowLeft size={16} /> Back to Bazaar
    </Link>

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

export default GiftGuide;
