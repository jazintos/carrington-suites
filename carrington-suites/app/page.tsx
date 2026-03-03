export default function Home() {
  return (
    <main className="pt-32 md:pt-40">

      {/* ================= HERO SECTION ================= */}
      <section
        className="min-h-screen flex items-center justify-center relative px-6"
        style={{
          backgroundImage: "url('/room1.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>

        <div className="relative text-center text-white max-w-4xl px-6 md:px-12 flex flex-col items-center justify-center">

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight tracking-tight mb-6">
            Luxury 3-Bedroom Executive Residences
          </h1>

          <p className="text-base sm:text-lg md:text-xl mb-8 text-gray-200">
            Premium Living in the Heart of Victoria Island
          </p>

          <a
            href="/booking"
            className="inline-block bg-[#C6A85B] text-black px-8 py-4 font-semibold tracking-wide hover:bg-white transition duration-300"
          >
            RESERVE YOUR STAY
          </a>

        </div>
      </section>


      {/* ================= ABOUT SECTION ================= */}
      <section className="py-16 sm:py-20 lg:py-32 px-6 md:px-16 bg-white text-center">

        <h2 className="text-3xl md:text-5xl font-semibold mb-8 text-[#0B2C5F]">
          Experience Refined Comfort
        </h2>

        <p className="max-w-3xl mx-auto text-base md:text-lg text-gray-800 leading-relaxed">
          The Carrington Suites offers a premium short-stay experience
          designed for executives and travelers seeking elegance,
          privacy, and comfort in the heart of Victoria Island.
        </p>

      </section>


      {/* ================= APARTMENTS ================= */}
      <section className="py-20 md:py-32 px-6 md:px-16 bg-[#F3F4F6]">

        <h2 className="text-3xl md:text-5xl text-center mb-16 text-[#0B2C5F] font-semibold">
          Our Luxury Apartments
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {[
            { name: "Executive 3-Bedroom Suite", price: "₦300,000 / Night" },
            { name: "Premium 3-Bedroom Suite", price: "₦450,000 / Night" },
            { name: "Signature 3-Bedroom Residence", price: "₦600,000 / Night" },
          ].map((apt, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300"
            >

              <img
                src="/room1.jpg"
                className="h-64 w-full object-cover"
                alt={apt.name}
              />

              <div className="p-8 text-center md:text-left">

                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-[#0B2C5F]">
                  {apt.name}
                </h3>

                <p className="mb-6 text-gray-900 font-medium">
                  {apt.price}
                </p>

                <a
                  href="/booking"
                  className="inline-block bg-[#0B2C5F] text-white px-6 py-3 hover:bg-[#C6A85B] transition duration-300"
                >
                  BOOK NOW
                </a>

              </div>

            </div>
          ))}

        </div>

      </section>


      {/* ================= AMENITIES ================= */}
      <section className="py-20 md:py-32 px-6 md:px-16 bg-white text-center">

        <h2 className="text-3xl md:text-5xl mb-16 text-[#0B2C5F] font-semibold">
          Amenities
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 text-base md:text-lg">

          {[
            "High Speed WiFi",
            "24/7 Security",
            "Fully Serviced Apartments",
            "Smart TVs",
            "Air Conditioning",
            "Housekeeping",
            "Executive Comfort",
            "Prime Location",
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-center md:justify-start gap-3 text-gray-900 font-medium">
              <span className="text-[#C6A85B] text-xl">✔</span>
              <span>{item}</span>
            </div>
          ))}

        </div>

      </section>


      {/* ================= CALL TO ACTION ================= */}
      <section className="py-20 md:py-28 text-center bg-[#0B2C5F] text-white px-6">

        <h2 className="text-3xl md:text-5xl mb-8 font-semibold">
          Ready To Experience Carrington Suites?
        </h2>

        <a
          href="/booking"
          className="inline-block bg-[#C6A85B] text-black px-10 py-4 font-semibold hover:bg-white transition duration-300"
        >
          RESERVE YOUR STAY
        </a>

      </section>


      {/* ================= WHATSAPP BUTTON ================= */}
      <a
        href="https://wa.me/2349038477748"
        target="_blank"
        className="fixed bottom-6 right-6 bg-green-500 text-white px-5 py-3 rounded-full shadow-lg text-sm md:text-base"
      >
        WhatsApp
      </a>

    </main>
  );
}