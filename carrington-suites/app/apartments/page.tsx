export default function Apartments() {

    const apartments = [
      {
        name: "Executive 3-Bedroom Suite",
        price: "₦300,000 / Night",
        description: "Spacious executive residence with refined interiors and premium comfort.",
      },
      {
        name: "Premium 3-Bedroom Suite",
        price: "₦450,000 / Night",
        description: "Elevated luxury with enhanced finishes and executive ambience.",
      },
      {
        name: "Signature 3-Bedroom Residence",
        price: "₦600,000 / Night",
        description: "Our most exclusive offering with superior detailing and refined elegance.",
      },
    ];
  
    return (
      <main className="pt-28 md:pt-36 bg-[#F8F6F2] min-h-screen">
  
        {/* ================= HEADER ================= */}
        <section className="py-20 md:py-32 px-6 md:px-16 text-center">
  
          <h1 className="text-4xl md:text-6xl font-semibold text-[#0B2C5F] mb-6">
            Our Luxury Apartments
          </h1>
  
          <p className="max-w-3xl mx-auto text-gray-600 text-base md:text-lg">
            Discover premium 3-bedroom residences crafted for comfort,
            privacy, and executive living in Victoria Island.
          </p>
  
        </section>
  
  
        {/* ================= APARTMENT GRID ================= */}
        <section className="px-6 md:px-16 pb-24">
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
  
            {apartments.map((apt, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden"
              >
  
                {/* Image */}
                <img
                  src="/room1.jpg"
                  alt={apt.name}
                  className="h-64 w-full object-cover"
                />
  
                {/* Content */}
                <div className="p-8 text-center md:text-left">
  
                  <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#0B2C5F]">
                    {apt.name}
                  </h2>
  
                  <p className="text-gray-600 mb-6">
                    {apt.description}
                  </p>
  
                  <p className="font-medium text-lg mb-6">
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
  
      </main>
    );
  }