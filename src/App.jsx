import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoyaltyApp() {
  const [view, setView] = useState('stamps'); 
  const [stamps, setStamps] = useState(0); 
  const [customerId] = useState(`CUST-${Math.floor(Math.random() * 9000) + 1000}`);
  
  const maxStamps = 10;

  const menuItems = [
    { id: 1, name: "Double Cheese", price: "$9.99", img: "🍔", desc: "Two beef patties with cheddar" },
    { id: 2, name: "Veggie Burger", price: "$8.50", img: "🥗", desc: "Plant-based patty with fresh greens" },
    { id: 3, name: "Chicken Wings", price: "$7.50", img: "🍗", desc: "6pc spicy or mild wings" },
    { id: 4, name: "French Fries", price: "$3.99", img: "🍟", desc: "Sea salt seasoned crispy fries" }
  ];

  return (
    <div className="min-h-screen bg-white flex justify-center font-sans text-slate-900 overflow-x-hidden">
      <div className="w-full max-w-[430px] bg-white min-h-screen shadow-2xl relative flex flex-col pb-24">
        
        {/* BRAND HEADER */}
        <div className="p-8 pt-10 text-center">
          <h1 className="text-3xl font-black italic tracking-tighter uppercase text-red-600">FoodGo</h1>
          <div className="h-1 w-12 bg-red-100 mx-auto mt-2 rounded-full" />
        </div>

        {/* VIEW: STAMP CARD */}
        {view === 'stamps' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="px-6 flex-1">
            <div className="bg-slate-50 rounded-[2.5rem] p-6 border border-slate-100 shadow-sm mb-6">
              <h2 className="text-center font-extrabold text-sm text-slate-400 uppercase tracking-widest mb-6">Your Stamp Card</h2>
              
              {/* 10 STAMP GRID */}
              <div className="grid grid-cols-5 gap-3 mb-8">
                {[...Array(maxStamps)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`aspect-square rounded-2xl flex items-center justify-center text-xl border-2 transition-all duration-300 ${
                      i < stamps 
                      ? 'bg-red-500 border-red-500 text-white shadow-md' 
                      : 'bg-white border-slate-100 text-slate-100'
                    }`}
                  >
                    {i < stamps ? '🍆' : ''}
                  </div>
                ))}
              </div>

              {/* QR CODE FOR STAFF SCANNING */}
              <div className="bg-white p-6 rounded-[2rem] shadow-inner flex flex-col items-center border border-slate-100 relative overflow-hidden">
                {/* Moving Scan Line Animation */}
                <motion.div 
                  animate={{ top: ['0%', '100%', '0%'] }} 
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-0.5 bg-red-400/30 z-10"
                />
                
                <QRCodeSVG value={customerId} size={140} fgColor="#1e293b" />
                <p className="mt-4 font-mono text-[10px] font-bold text-slate-400 tracking-[0.3em] uppercase">{customerId}</p>
              </div>
              
              <p className="text-center text-[11px] font-bold text-slate-400 mt-6 leading-relaxed">
                Show this code to a staff member <br /> to receive your stamp.
              </p>
            </div>
          </motion.div>
        )}

        {/* VIEW: MENU */}
        {view === 'menu' && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="px-6 flex-1">
            <h2 className="font-black text-xl mb-6 ml-2">Digital Menu</h2>
            <div className="space-y-4">
              {menuItems.map(item => (
                <div key={item.id} className="bg-slate-50 rounded-[2rem] p-4 flex items-center border border-slate-50">
                  <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm mr-4">
                    {item.img}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm">{item.name}</h4>
                    <p className="text-[10px] text-slate-400 font-medium">{item.desc}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-red-500 font-black text-sm">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 2-BUTTON BOTTOM NAVIGATION */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] h-20 bg-white border-t border-slate-100 flex items-center z-50 shadow-[0_-10px_20px_-5px_rgba(0,0,0,0.05)]">
          <button 
            onClick={() => setView('stamps')}
            className={`flex-1 flex flex-col items-center gap-1.5 transition-all ${view === 'stamps' ? 'text-red-500 scale-110' : 'text-slate-300'}`}
          >
            <span className="text-xl">{view === 'stamps' ? '🎟️' : '🎫'}</span>
            <span className="text-[9px] font-black uppercase tracking-widest">Stamps</span>
          </button>
          
          <div className="w-px h-8 bg-slate-100" /> {/* Divider */}

          <button 
            onClick={() => setView('menu')}
            className={`flex-1 flex flex-col items-center gap-1.5 transition-all ${view === 'menu' ? 'text-red-500 scale-110' : 'text-slate-300'}`}
          >
            <span className="text-xl">{view === 'menu' ? '🍔' : '🍴'}</span>
            <span className="text-[9px] font-black uppercase tracking-widest">Menu</span>
          </button>
        </div>

      </div>
    </div>
  );
}