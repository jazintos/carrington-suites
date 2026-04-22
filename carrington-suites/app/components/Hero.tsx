"use client";

export default function Hero() {
  return (
    <section
      className="min-h-screen flex items-end bg-cover bg-center relative"
      style={{ backgroundImage: "url('/hero-main.png')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70"></div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 pb-24 text-white">

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-6">
          The Carrington Suites
        </h1>

        <p className="text-lg md:text-xl max-w-xl mb-10">
          Private luxury residences in Victoria Island designed for guests
          who value elegance, privacy and quiet sophistication.
        </p>

        <a
          href="/booking"
          className="border border-white px-10 py-4 tracking-widest hover:bg-white hover:text-black transition"
        >
          RESERVE YOUR STAY
        </a>

      </div>
    </section>
  );
}