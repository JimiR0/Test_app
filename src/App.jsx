import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion'; // For smooth "lively" animations

const companyConfig = {
  name: "Micky's Burgers",
  themeColor: "#DA291C",
  secondaryColor: "#FFC72C",
  backgroundImage: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80",
  coupons: [
    { id: 'c1', title: "Free Small Fries", sub: "With any $5 purchase", code: "MC-FRIES", image: "🍟" },
    { id: 'c2', title: "BOGO Big Burger", sub: "Buy one get one free", code: "MC-BOGO", image: "🍔" },
    { id: 'c3', title: "25% Off Total", sub: "Valid on mobile orders", code: "MC-25OFF", image: "✨" }
  ]
};

export default function LivelyApp() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex justify-center font-sans text-slate-900">
      <div className="w-full max-w-md bg-white min-h-screen shadow-2xl relative overflow-hidden">
        
        {/* Modern Glassmorphism Header */}
        <div className="relative h-64 overflow-hidden">
          <img src={companyConfig.backgroundImage} className="w-full h-full object-cover" alt="Hero" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6">
            <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">
              Feed Your <br /> <span style={{ color: companyConfig.secondaryColor }}>Cravings.</span>
            </h1>
          </div>
        </div>

        {/* Dynamic Navigation Pill */}
        <div className="flex justify-around p-2 m-4 bg-gray-100 rounded-2xl">
          <button className="px-6 py-2 bg-white rounded-xl shadow-sm font-bold text-sm">Deals</button>
          <button className="px-6 py-2 text-gray-500 font-bold text-sm">Menu</button>
          <button className="px-6 py-2 text-gray-500 font-bold text-sm">Recent</button>
        </div>

        {/* Coupons - Card Style */}
        <div className="px-4 space-y-4 pb-24">
          {companyConfig.coupons.map((coupon) => (
            <motion.div 
              whileTap={{ scale: 0.97 }}
              key={coupon.id} 
              onClick={() => setSelected(coupon)}
              className="group relative flex items-center bg-white border border-slate-100 rounded-[2rem] p-5 shadow-sm hover:shadow-xl transition-all cursor-pointer"
            >
              <div className="h-16 w-16 bg-orange-50 rounded-2xl flex items-center justify-center text-3xl mr-4 group-hover:rotate-12 transition-transform">
                {coupon.image}
              </div>
              <div className="flex-1">
                <h4 className="font-extrabold text-lg leading-tight">{coupon.title}</h4>
                <p className="text-xs text-slate-400 font-semibold">{coupon.sub}</p>
              </div>
              <div className="p-2 rounded-full bg-slate-50">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
              </div>
            </motion.div>
          ))}
        </div>

        {/* QR Pop-up with Framer Motion */}
        <AnimatePresence>
          {selected && (
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-md z-50 flex items-end"
            >
              <div className="bg-white w-full rounded-t-[3rem] p-10 flex flex-col items-center shadow-2xl">
                <div className="w-12 h-1.5 bg-gray-200 rounded-full mb-8" />
                <h2 className="text-3xl font-black mb-1">{selected.title}</h2>
                <p className="text-slate-400 font-bold text-sm mb-8 uppercase tracking-widest">Scan at Register</p>
                
                <div className="p-6 bg-white border-[10px] border-slate-50 rounded-[2.5rem] mb-6">
                  <QRCodeSVG value={selected.code} size={200} />
                </div>

                <button 
                  onClick={() => setSelected(null)}
                  className="w-full py-5 rounded-2xl font-black text-lg shadow-xl mb-4"
                  style={{ backgroundColor: companyConfig.themeColor, color: 'white' }}
                >
                  GOT IT
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}