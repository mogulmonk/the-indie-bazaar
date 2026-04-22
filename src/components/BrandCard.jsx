import { ShoppingBag } from 'lucide-react';

const CATEGORY_LABELS = {
  Pantry: 'TASTY TREATS',
  Wardrobe: 'THE DRIP',
  Living: 'NEST',
  Play: 'FUN & GAMES',
  Self: 'SELF LOVE',
};

const BrandCard = ({ brand }) => (
  <div className="group relative flex flex-col bg-white border-2 border-black rounded-2xl overflow-hidden hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:-translate-y-1">
    <div className={`h-32 ${brand.color} border-b-2 border-black p-4 flex items-start justify-between relative overflow-hidden`}>
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
      <div className="z-10 bg-white border-2 border-black px-2 py-1 text-xs font-bold uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
        {CATEGORY_LABELS[brand.category] || brand.category.toUpperCase()}
      </div>
    </div>

    <div className="p-5 flex flex-col flex-grow">
      <div className="flex justify-between items-baseline mb-2">
        <h3 className="text-xl font-black text-black leading-tight">{brand.name}</h3>
        <span className="text-sm font-bold text-gray-500 font-mono">{brand.price}</span>
      </div>
      <div className="flex gap-2 mb-3 flex-wrap">
        {brand.tags.slice(0, 3).map(tag => (
          <span key={tag} className="text-[10px] font-bold uppercase px-2 py-1 bg-gray-100 text-gray-600 rounded-md">
            #{tag}
          </span>
        ))}
      </div>
      <p className="text-gray-700 text-sm font-medium leading-relaxed mb-6 flex-grow">
        {brand.description}
      </p>
      <div className="mt-auto">
        <a href={brand.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-black text-white font-bold py-3 px-4 rounded-xl hover:bg-gray-800 transition-colors border-2 border-black w-full">
          <ShoppingBag size={16} /> Shop Now
        </a>
      </div>
    </div>
  </div>
);

export default BrandCard;
