import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Story = () => (
  <div className="max-w-3xl mx-auto px-4 pt-10 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <Link to="/" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black mb-8">
      <ArrowLeft size={16} /> Back to Bazaar
    </Link>

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

export default Story;
