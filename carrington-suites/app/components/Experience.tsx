"use client";

import {
  Home,
  ShieldCheck,
  Building2,
  MapPin,
  Sparkles,
  ConciergeBell,
  Wifi,
  BedDouble
} from "lucide-react";

export default function Experience() {

  const items = [
    { label: "Private Residences", icon: <Home className="text-[#C6A85B]" size={28}/> },
    { label: "24/7 Security", icon: <ShieldCheck className="text-[#C6A85B]" size={28}/> },
    { label: "Fully Serviced Apartments", icon: <Building2 className="text-[#C6A85B]" size={28}/> },
    { label: "Prime Victoria Island Location", icon: <MapPin className="text-[#C6A85B]" size={28}/> },
    { label: "Luxury Interiors", icon: <Sparkles className="text-[#C6A85B]" size={28}/> },
    { label: "Concierge Assistance", icon: <ConciergeBell className="text-[#C6A85B]" size={28}/> },
    { label: "High Speed WiFi", icon: <Wifi className="text-[#C6A85B]" size={28}/> },
    { label: "Prestige Comfort", icon: <BedDouble className="text-[#C6A85B]" size={28}/> }
  ];

  return (
    <section className="bg-[#F3F5F4] text-center">

      <h2 className="text-3xl md:text-4xl mb-16 font-light">
        The Carrington Experience
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 px-6">

        {items.map((item, i) => (
          <div
            key={i}
            className="bg-white p-8 shadow-sm hover:shadow-xl transition rounded"
          >

            <div className="mb-4 flex justify-center">
              {item.icon}
            </div>

            <p>{item.label}</p>

          </div>
        ))}

      </div>

    </section>
  );
}