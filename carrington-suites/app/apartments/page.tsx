export default function Apartments() {

    const apartments = [
      {
        name: "Executive 3-Bedroom Suite",
        price: "₦300,000 / Night",
        image: "/suite-modern-1.png",
        description:
          "Spacious executive residence designed with refined interiors, expansive living areas, and modern comforts tailored for discerning guests.",
      },
      {
        name: "Premium 3-Bedroom Suite",
        price: "₦450,000 / Night",
        image: "/suite-dark-1.png",
        description:
          "Elevated luxury living with sophisticated design, premium furnishings, and an executive atmosphere perfect for extended stays.",
      },
      {
        name: "Signature 3-Bedroom Residence",
        price: "₦600,000 / Night",
        image: "/suite-wood-1.png",
        description:
          "Our most exclusive residence offering exceptional comfort, refined aesthetics, and a superior hospitality experience.",
      },
    ];
  
    return (
      <main className="pt-32 md:pt-40 bg-[#F8F6F2] min-h-screen">
  
  
        {/* ================= HERO HEADER ================= */}
        <section
          className="py-24 md:py-32 px-6 md:px-16 text-center text-white bg-cover bg-center relative"
          style={{
            backgroundImage: "url('/hero-alt.png')",
          }}
        >
  
          <div className="absolute inset-0 bg-black/60"></div>
  
          <div className="relative max-w-4xl mx-auto">
  
            <h1 className="text-4xl md:text-6xl font-semibold mb-6">
              Our Luxury Apartments
            </h1>
  
            <p className="text-lg text-gray-200">
              Discover premium 3-bedroom residences crafted for comfort,
              privacy, and executive living in Victoria Island.
            </p>
  
          </div>
  
        </section>
  
  
  
        {/* ================= APARTMENT GRID ================= */}
        <section className="px-6 md:px-16 py-20 md:py-28">
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
  
            {apartments.map((apt, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden"
              >
  
                {/* IMAGE */}
                <img
                  src={apt.image}
                  alt={apt.name}
                  className="h-72 w-full object-cover"
                />
  
                {/* CONTENT */}
                <div className="p-8 text-center md:text-left">
  
                  <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#0B2C5F]">
                    {apt.name}
                  </h2>
  
                  <p className="text-gray-700 mb-6">
                    {apt.description}
                  </p>
  
                  <p className="font-semibold text-lg mb-6 text-black">
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
  
  
  
        {/* ================= LIFESTYLE STRIP ================= */}
        <section className="grid md:grid-cols-3">
  
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
  
  
  
        {/* ================= CTA ================= */}
        <section className="py-20 md:py-28 text-center bg-[#0B2C5F] text-white px-6">
  
          <h2 className="text-3xl md:text-5xl mb-8 font-semibold">
            Reserve Your Luxury Stay Today
          </h2>
  
          <a
            href="/booking"
            className="inline-block bg-[#C6A85B] text-black px-10 py-4 font-semibold hover:bg-white transition duration-300"
          >
            BOOK YOUR STAY
          </a>
  
        </section>
  
      </main>
    );
  }