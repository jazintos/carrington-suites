"use client";

import { BedDouble, Tv, Wifi, ParkingCircle, AirVent, CookingPot, ShieldCheck, Sparkles, Users } from "lucide-react";

export default function PremiumResidence() {

  const gallery = [
    "/suite-dark-1.png",
    "/living-1.png",
    "/balcony-mini.png",
    "/tv-wall.png",
    "/suite-modern-1.png"
  ];

  return (
    <main className="pt-32 md:pt-36">

      {/* HERO */}
      <section
        className="relative h-[80vh] md:h-[92vh] flex items-center text-white"
        style={{
          backgroundImage: "url('/suite-dark-1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >

        <div className="absolute inset-0 bg-black/55"></div>

        <div className="relative max-w-6xl px-6 md:px-16">

          <h1 className="text-4xl md:text-7xl font-semibold mb-6">
            Premium Residence
          </h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-xl">
            An elevated two-bedroom residence offering refined interiors,
            generous living spaces, and sophisticated comfort for guests
            seeking a superior stay.
          </p>

          {/* KEY DETAILS */}
          <div className="mt-6 flex flex-wrap gap-6 text-sm md:text-base text-gray-200">

            <div className="flex items-center gap-2">
              <BedDouble size={18} /> 2 Bedrooms
            </div>

            <div className="flex items-center gap-2">
              <Users size={18} /> Up to 4 Guests
            </div>

            <div className="flex items-center gap-2 text-red-300 font-semibold">
              <ShieldCheck size={18} /> Only 1 Unit Available
            </div>

          </div>

          {/* PRICE */}
          <div className="mt-8 text-2xl md:text-3xl font-semibold">
            ₦600,000 <span className="text-base font-normal">/ Night</span>
          </div>

        </div>

      </section>



      {/* INTRO */}
      <section className="bg-gradient-to-b from-[#F8F6F2] to-white py-16 md:py-20 px-6 md:px-16">

        <div className="max-w-3xl">

          <h2 className="text-3xl md:text-4xl font-semibold text-[#0B2C5F] mb-4">
            Premium Comfort & Sophistication
          </h2>

          <div className="w-16 h-[2px] bg-[#C6A85B] mb-6"></div>

          <p className="text-gray-700 leading-relaxed text-lg">
            The Premium Residence offers a refined environment where
            modern elegance meets exceptional comfort. Designed with
            carefully curated interiors and spacious layouts, this residence
            delivers a luxurious yet welcoming atmosphere.
          </p>

        </div>

      </section>



      {/* FEATURES */}
      <section className="bg-white py-16 md:py-20 px-6 md:px-16">

        <div className="grid md:grid-cols-3 gap-10">

          <div className="bg-[#F8F6F2] p-8 rounded-lg text-center">
            <BedDouble className="mx-auto mb-4 text-[#C6A85B]" size={36}/>
            <h3 className="text-xl font-semibold mb-2 text-[#0B2C5F]">Spacious Interiors</h3>
            <p className="text-gray-600">Large living areas designed for relaxation and style.</p>
          </div>

          <div className="bg-[#F8F6F2] p-8 rounded-lg text-center">
            <Sparkles className="mx-auto mb-4 text-[#C6A85B]" size={36}/>
            <h3 className="text-xl font-semibold mb-2 text-[#0B2C5F]">Luxury Finishes</h3>
            <p className="text-gray-600">Elegant materials and modern architectural design.</p>
          </div>

          <div className="bg-[#F8F6F2] p-8 rounded-lg text-center">
            <ShieldCheck className="mx-auto mb-4 text-[#C6A85B]" size={36}/>
            <h3 className="text-xl font-semibold mb-2 text-[#0B2C5F]">Private Balcony</h3>
            <p className="text-gray-600">Enjoy tranquil moments overlooking Victoria Island.</p>
          </div>

        </div>

      </section>



      {/* GALLERY */}
      <section className="bg-[#F8F6F2] py-16 md:py-20 px-6 md:px-16">

        <h2 className="text-3xl md:text-4xl font-semibold text-[#0B2C5F] mb-10 text-center">
          Residence Gallery
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <img src={gallery[0]} className="rounded-lg object-cover h-[320px] w-full"/>
          <img src={gallery[1]} className="rounded-lg object-cover h-[320px] w-full"/>
          <img src={gallery[2]} className="rounded-lg object-cover h-[320px] w-full"/>

          <img src={gallery[3]} className="rounded-lg object-cover h-[320px] w-full md:col-span-2"/>
          <img src={gallery[4]} className="rounded-lg object-cover h-[320px] w-full"/>

        </div>

      </section>



      {/* AMENITIES */}
      <section className="bg-[#0E1A2B] text-white py-16 md:py-20 px-6 md:px-16">

        <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center">
          Residence Amenities
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">

          <div><Wifi className="mx-auto mb-3 text-[#C6A85B]" /><p>High-Speed WiFi</p></div>
          <div><Tv className="mx-auto mb-3 text-[#C6A85B]" /><p>Smart Television</p></div>
          <div><AirVent className="mx-auto mb-3 text-[#C6A85B]" /><p>Air Conditioning</p></div>
          <div><CookingPot className="mx-auto mb-3 text-[#C6A85B]" /><p>Fully Equipped Kitchen</p></div>
          <div><BedDouble className="mx-auto mb-3 text-[#C6A85B]" /><p>Luxury Bedding</p></div>
          <div><ParkingCircle className="mx-auto mb-3 text-[#C6A85B]" /><p>Secure Parking</p></div>
          <div><Sparkles className="mx-auto mb-3 text-[#C6A85B]" /><p>Daily Housekeeping</p></div>
          <div><ShieldCheck className="mx-auto mb-3 text-[#C6A85B]" /><p>24hr Security</p></div>

        </div>

      </section>



      {/* CTA */}
      <section className="bg-[#F7F5F0] py-16 text-center px-6">

        <h2 className="text-3xl md:text-5xl mb-6 font-semibold text-[#0B2C5F]">
          Book the Premium Residence
        </h2>

        <button
          onClick={() => (window.location.href = "/booking")}
          className="bg-[#0B2C5F] text-white px-10 py-4 font-semibold hover:bg-[#C6A85B] transition duration-300"
        >
          RESERVE THIS RESIDENCE
        </button>

      </section>

    </main>
  );
}