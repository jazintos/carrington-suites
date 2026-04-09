"use client";

import { useState } from "react";

const residences = [
  {
    name: "Executive Residence",
    price: "₦300,000 / Night",
    image: "/suite-modern-1.png",
    link: "/apartments/executive"
  },
  {
    name: "Premium Residence",
    price: "₦450,000 / Night",
    image: "/suite-dark-1.png",
    link: "/apartments/premium"
  },
  {
    name: "Signature Residence",
    price: "₦600,000 / Night",
    image: "/suite-wood-1.png",
    link: "/apartments/signature"
  }
];

export default function ResidencesSlider() {

  const [index, setIndex] = useState(0);

  const next = () => setIndex((index + 1) % residences.length);
  const prev = () =>
    setIndex((index - 1 + residences.length) % residences.length);

  const residence = residences[index];

  return (
    <section className="bg-white text-center">

      <h2 className="text-3xl md:text-4xl font-light mb-16">
        Signature Residences
      </h2>

      <div className="max-w-5xl mx-auto px-6">

        <div className="overflow-hidden">

          <img
            src={residence.image}
            className="w-full h-[480px] md:h-[560px] object-cover"
          />

        </div>

        <h3 className="text-2xl mt-8 mb-2">
          {residence.name}
        </h3>

        <p className="text-gray-600 mb-8">
          {residence.price}
        </p>

        <div className="flex justify-center gap-6">

          <button
            onClick={prev}
            className="btn-outline"
          >
            Previous
          </button>

          <button
            onClick={next}
            className="btn-primary"
          >
            Next
          </button>

        </div>

      </div>

    </section>
  );
}