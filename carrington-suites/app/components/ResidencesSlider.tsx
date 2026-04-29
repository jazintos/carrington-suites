"use client";

import { useState } from "react";

const residences = [
  {
    name: "One-Bedroom Penthouse Residence",
    originalPrice: 450000,
    salePrice: 300000,
    description:
      "A refined private retreat designed for comfort, privacy, and effortless living.",
    image: "/suite-modern-1.png",
    link: "/apartments/one-bedroom",
  },
  {
    name: "Two-Bedroom Signature Penthouse",
    originalPrice: 600000,
    salePrice: 350000,
    description:
      "Spacious, elegant, and perfectly suited for elevated shared living.",
    image: "/suite-dark-1.png",
    link: "/apartments/two-bedroom",
  },
  {
    name: "Three-Bedroom Premium Residence",
    originalPrice: 800000,
    salePrice: 450000,
    description:
      "Expansive living designed for those who value space, privacy, and refined comfort.",
    image: "/suite-wood-1.png",
    link: "/apartments/three-bedroom",
  },
];

export default function ResidencesSlider() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((index + 1) % residences.length);
  const prev = () =>
    setIndex((index - 1 + residences.length) % residences.length);

  const residence = residences[index];

  return (
    <section className="bg-white text-center py-16 md:py-20">

      {/* Heading */}
      <h2 className="text-2xl md:text-4xl font-light mb-4">
        Our Residences
      </h2>

      <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto mb-12 md:mb-16 px-6">
        Thoughtfully designed spaces that blend comfort, privacy, and understated elegance in the heart of Victoria Island.
      </p>

      <div className="max-w-5xl mx-auto px-4 md:px-6">

        {/* Image */}
        <div className="overflow-hidden rounded-lg">
          <img
            src={residence.image}
            className="w-full h-[320px] sm:h-[400px] md:h-[560px] object-cover"
          />
        </div>

        {/* Name */}
        <h3 className="text-xl md:text-2xl mt-6 md:mt-8 mb-2 px-2">
          {residence.name}
        </h3>

        {/* Pricing */}
        <div className="mb-4 md:mb-6">

          <p className="text-gray-400 line-through text-xs md:text-sm">
            ₦{residence.originalPrice.toLocaleString()} / Night
          </p>

          <p className="text-lg md:text-xl text-black">
            ₦{residence.salePrice.toLocaleString()} / Night
          </p>

          <p className="text-[10px] md:text-xs text-[#D4AF37] mt-1 tracking-wide">
            Limited Offer
          </p>

        </div>

        {/* Description */}
        <p className="text-gray-500 text-sm md:text-base max-w-md mx-auto mb-8 md:mb-10 px-4">
          {residence.description}
        </p>

        {/* Navigation */}
        <div className="flex justify-center gap-8 md:gap-10 text-sm tracking-widest">

          <button
            onClick={prev}
            className="text-gray-400 hover:text-black transition"
          >
            ←
          </button>

          <button
            onClick={next}
            className="text-gray-400 hover:text-black transition"
          >
            →
          </button>

        </div>

      </div>

    </section>
  );
}