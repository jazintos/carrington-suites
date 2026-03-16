"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import Link from "next/link";

export default function Apartments() {

  const apartments = [
    {
      name: "Executive 3-Bedroom Suite",
      price: "₦300,000 / Night",
      image: "/suite-modern-1.png",
      link: "/apartments/executive",
      description:
        "Spacious executive residence designed with refined interiors, expansive living areas, and modern comforts tailored for discerning guests.",
    },
    {
      name: "Premium 3-Bedroom Suite",
      price: "₦450,000 / Night",
      image: "/suite-dark-1.png",
      link: "/apartments/premium",
      description:
        "Elevated luxury living with sophisticated design, premium furnishings, and an executive atmosphere perfect for extended stays.",
    },
    {
      name: "Signature 3-Bedroom Residence",
      price: "₦600,000 / Night",
      image: "/suite-wood-1.png",
      link: "/apartments/signature",
      description:
        "Our most exclusive residence offering exceptional comfort, refined aesthetics, and a superior hospitality experience.",
    },
  ];

  return (
    <main className="pt-32 md:pt-36">


      {/* HERO */}
      <section
        className="relative h-[75vh] md:h-[90vh] flex items-center justify-center text-white"
        style={{
          backgroundImage: "url('/hero-alt.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative text-center max-w-4xl px-6">

          <h1 className="text-4xl md:text-7xl font-semibold mb-6 leading-tight">
            Luxury Private Residences
          </h1>

          <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
            Discover refined three-bedroom residences crafted for comfort,
            privacy, and elevated living in Victoria Island.
          </p>

        </div>

      </section>



      {/* INTRO */}
      <section className="bg-[#F7F5F0] py-20 md:py-24 px-6 md:px-16">

        <div className="max-w-3xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-semibold text-[#0B2C5F] mb-6">
            A Distinctive Residential Experience
          </h2>

          <p className="text-gray-700 leading-relaxed text-lg">
            At Carrington Suites, each residence is thoughtfully designed
            to deliver a harmonious blend of luxury, privacy, and comfort.
            Our carefully curated interiors, spacious layouts,
            and premium amenities create an environment
            where refined living becomes effortless.
          </p>

        </div>

      </section>



      {/* APARTMENTS GRID */}
      <section className="bg-white py-20 md:py-24 px-6 md:px-16">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {apartments.map((apt, index) => (
            <Link
              key={index}
              href={apt.link}
              className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition duration-500"
            >

              {/* IMAGE */}
              <div className="relative overflow-hidden">

                <img
                  src={apt.image}
                  alt={apt.name}
                  className="h-72 w-full object-cover group-hover:scale-110 transition duration-700"
                />

                {/* HOVER OVERLAY */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">

                  <span className="text-white text-sm tracking-[3px] border border-white px-6 py-3">
                    VIEW RESIDENCE
                  </span>

                </div>

              </div>


              {/* CONTENT */}
              <div className="p-8 text-center md:text-left">

                <h3 className="text-xl md:text-2xl font-semibold text-[#0B2C5F] mb-2">
                  {apt.name}
                </h3>

                <div className="w-12 h-[2px] bg-[#C6A85B] mb-5 mx-auto md:mx-0"></div>

                <p className="text-gray-700 mb-5 leading-relaxed">
                  {apt.description}
                </p>

                <p className="font-semibold text-lg mb-6 text-black">
                  {apt.price}
                </p>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.location.href = "/booking";
                  }}
                  className="bg-[#0B2C5F] text-white px-6 py-3 hover:bg-[#C6A85B] transition duration-300"
                >
                  BOOK NOW
                </button>

              </div>

            </Link>
          ))}

        </div>

      </section>



      {/* LIFESTYLE STRIP */}
      <section className="grid grid-cols-1 md:grid-cols-3">

        <img
          src="/balcony-mini.png"
          className="h-80 w-full object-cover"
        />

        <img
          src="/tv-wall.png"
          className="h-80 w-full object-cover"
        />

        <img
          src="/living-1.png"
          className="h-80 w-full object-cover"
        />

      </section>



      {/* STORY SECTION */}
      <section className="bg-[#0E1A2B] text-white py-20 md:py-24 px-6 md:px-16">

        <div className="grid md:grid-cols-2 gap-16 items-center">

          <img
            src="/living-1.png"
            className="rounded-xl shadow-lg w-full"
          />

          <div>

            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              Designed for Sophisticated Living
            </h2>

            <p className="text-gray-300 leading-relaxed mb-6">
              Carrington Suites represents a new standard of luxury
              residential hospitality in Victoria Island. Our residences
              combine elegant interior design with exceptional comfort,
              creating spaces that feel both exclusive and welcoming.
            </p>

            <p className="text-gray-300 leading-relaxed">
              Whether visiting Lagos for business or leisure,
              our residences provide a private sanctuary where
              refined living and premium hospitality meet seamlessly.
            </p>

          </div>

        </div>

      </section>



 {/* CTA */}
<section className="bg-[#F7F5F0] py-20 md:py-24 text-center px-6">

<h2 className="text-3xl md:text-5xl mb-8 font-semibold text-[#0B2C5F]">
  Reserve Your Luxury Stay
</h2>

<p className="text-gray-600 max-w-2xl mx-auto mb-10">
  Experience refined comfort and exceptional hospitality
  at Carrington Suites in the heart of Victoria Island.
</p>

<button
  onClick={() => (window.location.href = "/booking")}
  className="bg-[#0B2C5F] text-white px-10 py-4 font-semibold hover:bg-[#C6A85B] transition duration-300"
>
  BOOK YOUR RESIDENCE
</button>

</section>


    </main>
  );
}