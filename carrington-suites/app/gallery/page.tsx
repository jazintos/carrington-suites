export default function Gallery() {

    const images = [
  
      {
        src: "/suite-modern-1.png",
        title: "Executive Suite Bedroom",
      },
  
      {
        src: "/suite-dark-1.png",
        title: "Premium Suite Bedroom",
      },
  
      {
        src: "/suite-wood-1.png",
        title: "Signature Residence Bedroom",
      },
  
      {
        src: "/suite-wood-2.png",
        title: "Signature Residence Living Area",
      },
  
      {
        src: "/living-1.png",
        title: "Luxury Living Room",
      },
  
      {
        src: "/tv-wall.png",
        title: "Modern Entertainment Area",
      },
  
      {
        src: "/balcony-1.png",
        title: "Balcony Waterfront View",
      },
  
      {
        src: "/balcony-mini.png",
        title: "Balcony Seating Area",
      }
  
    ];
  
  
    return (
      <main className="pt-32 md:pt-40 bg-[#F8F6F2] min-h-screen">
  
  
        {/* HERO HEADER */}
        <section
          className="py-24 md:py-32 px-6 md:px-16 text-center text-white bg-cover bg-center relative"
          style={{
            backgroundImage: "url('/hero-alt.png')",
          }}
        >
  
          <div className="absolute inset-0 bg-black/60"></div>
  
          <div className="relative max-w-3xl mx-auto">
  
            <h1 className="text-4xl md:text-6xl font-semibold mb-6">
              Photo Gallery
            </h1>
  
            <p className="text-lg text-gray-200">
              Explore the elegance and comfort of Carrington Suites.
            </p>
  
          </div>
  
        </section>
  
  
  
        {/* GALLERY GRID */}
        <section className="px-6 md:px-16 py-20 md:py-28">
  
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
  
            {images.map((image, index) => (
  
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
              >
  
                <img
                  src={image.src}
                  alt={image.title}
                  className="h-72 w-full object-cover"
                />
  
                <div className="p-5">
  
                  <p className="text-[#0B2C5F] font-medium">
                    {image.title}
                  </p>
   
                </div>
  
              </div>
  
            ))}
  
          </div>
  
        </section>
  
      </main>
    );
  }