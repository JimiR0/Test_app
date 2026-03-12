import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

// This is the data your "Builder" would provide
const companyConfig = {
  name: "Jimmy's Hamburgerr",
  themeColor: "hsl(183, 81%, 48%)", 
  secondaryColor: "#e7f30a",
  locations: [
    { id: 1, address: "Kirkkokatu 12", openTime: "06:00", closeTime: "23:00" }
  ],
  coupons: [
    { id: 'c1', title: "Ilmainen Topi Burger ostoksen yhteydessä", code: "JB-TOPIBURG-99", expiry: "Exp: Tonight" },
    { id: 'c2', title: "2€ ISO Burger", code: "JB-BURGER-02", expiry: "Exp: 3 Days" },
    { id: 'c3', title: "Osta 1 Shake, toinen kaupan päälle", code: "MC-BOGO-SHAKE", expiry: "Exp: Sunday" }
  ]
};

export default function App() {
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 font-sans pb-10 flex justify-center">
      {/* Container to mimic a mobile screen on desktop */}
      <div className="w-full max-w-md bg-white min-h-screen shadow-2xl relative">
        
        {/* Header */}
        <header 
          className="p-8 text-center"
          style={{ backgroundColor: companyConfig.themeColor }}
        >
          <h1 className="text-3xl font-black italic text-white" style={{ color: companyConfig.secondaryColor }}>
            {companyConfig.name}
          </h1>
        </header>

        {/* Location Info */}
        <div className="p-4 bg-white -mt-4 rounded-t-3xl shadow-sm">
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Closest Location</p>
            <h2 className="text-md font-bold text-gray-800">{companyConfig.locations[0].address}</h2>
            <p className="text-xs text-green-600 font-semibold mt-1">
              Open: {companyConfig.locations[0].openTime} - {companyConfig.locations[0].closeTime}
            </p>
          </div>
        </div>

        {/* Coupons List */}
        <div className="px-4 space-y-4 mt-2">
          <h3 className="text-lg font-bold text-gray-800">Your Rewards</h3>
          {companyConfig.coupons.map((coupon) => (
            <div key={coupon.id} className="flex items-center bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
              <div className="flex-1">
                <h4 className="font-bold text-gray-900">{coupon.title}</h4>
                <p className="text-xs text-gray-500 font-medium">{coupon.expiry}</p>
              </div>
              <button 
                onClick={() => setSelectedCoupon(coupon)}
                className="px-6 py-2 rounded-full font-bold text-sm transition-transform active:scale-95 shadow-md"
                style={{ backgroundColor: companyConfig.secondaryColor, color: companyConfig.themeColor }}
              >
                REDEEM
              </button>
            </div>
          ))}
        </div>

        {/* QR MODAL (The Pop-up) */}
        {selectedCoupon && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-6 z-50 animate-in fade-in duration-200">
            <div className="bg-white w-full rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl">
              <h2 className="text-2xl font-black mb-2">{selectedCoupon.title}</h2>
              <p className="text-gray-500 text-sm mb-6">Show this code to the cashier</p>
              
              {/* QR Code Graphic */}
              <div className="p-4 bg-white border-4 rounded-xl mb-4" style={{ borderColor: companyConfig.themeColor }}>
                <QRCodeSVG value={selectedCoupon.code} size={180} />
              </div>

              <p className="font-mono text-lg font-bold tracking-widest mb-8">{selectedCoupon.code}</p>

              <button 
                onClick={() => setSelectedCoupon(null)}
                className="w-full py-4 rounded-2xl font-bold text-white shadow-lg"
                style={{ backgroundColor: companyConfig.themeColor }}
              >
                DONE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
