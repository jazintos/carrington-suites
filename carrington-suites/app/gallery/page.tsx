"use client";

import { useState, useEffect } from "react";

export default function Gallery() {

  const images = [

    // ✅ ORIGINAL
    { src: "/suite-modern-1.png", title: "3-bed Suite Bedroom", category: "residences" },
    { src: "/suite-dark-1.png", title: "Premium Suite Bedroom", category: "residences" },
    { src: "/suite-wood-1.png", title: "Signature Residence Bedroom", category: "residences" },
    { src: "/suite-wood-2.png", title: "Signature Residence Living Area", category: "residences" },

    // 🛋️ Living
    { src: "/living-1.png", category: "living" },
    { src: "/tv-wall.png", category: "living" },
    { src: "/gallery/living/living-0.jpg", category: "living" },
    { src: "/gallery/living/living-1.jpg", category: "living" },
    { src: "/gallery/living/living-2.jpg", category: "living" },
    { src: "/gallery/living/living-wide.jpg", category: "living" },
    { src: "/gallery/living/living-alt1.jpg", category: "living" },
    { src: "/gallery/living/living-console.jpg", category: "living" },

    // 🍳 Kitchen
    { src: "/gallery/kitchen/kichen-1a.jpg", category: "kitchen" },
    { src: "/gallery/kitchen/kitchen-2.jpg", category: "kitchen" },
    { src: "/gallery/kitchen/kitchen-detail.jpg", category: "kitchen" },

    // 🛏️ Bedroom
    { src: "/gallery/bedroom/bedroom-2.jpg", category: "bedroom" },
    { src: "/gallery/bedroom/bedroom1a.jpg", category: "bedroom" },
    { src: "/gallery/bedroom/bedroom-3.jpg", category: "bedroom" },
    { src: "/gallery/bedroom/bedroom-4.jpg", category: "bedroom" },
    { src: "/gallery/bedroom/bedroom-5.jpg", category: "bedroom" },
    { src: "/gallery/bedroom/bedroom-red.jpg", category: "bedroom" },
    { src: "/gallery/bedroom/bedroom-deluxe.jpg", category: "bedroom" },

    // 🌇 Balcony
    { src: "/balcony-1.png", category: "balcony" },
    { src: "/balcony-mini.png", category: "balcony" },
    { src: "/gallery/details/balcony-main-1.jpg", category: "balcony" },
    { src: "/gallery/details/balcony-main-2.jpg", category: "balcony" },

    // 👗 Lifestyle
    { src: "/gallery/living/living-lamp.jpg", category: "lifestyle" },
    { src: "/gallery/living/living-lady-1.jpg", category: "lifestyle" },
    { src: "/gallery/living/living-lady-2.jpg", category: "lifestyle" },
    { src: "/gallery/living/living-lady-3.jpg", category: "lifestyle" },
    { src: "/gallery/living/living-lady-4.jpg", category: "lifestyle" },
    { src: "/gallery/living/living-lady-5.jpg", category: "lifestyle" },
    { src: "/gallery/living/living-lady-6.jpg", category: "lifestyle" },

    // 🍽️ Dining
    { src: "/gallery/dining/dining-3.jpg", category: "dining" },

    // 🎮 Leisure
    { src: "/gallery/leisure/game-room.jpg", category: "leisure" },

    // 🛋 Lounge + Corridor (MERGED)
    { src: "/gallery/lounge/lounge-1.jpg", category: "lounge-corridor" },
    { src: "/gallery/lounge/lounge-2.jpg", category: "lounge-corridor" },
    { src: "/gallery/corridor2.jpg", category: "lounge-corridor" },
    { src: "/gallery/corridor3.jpg", category: "lounge-corridor" },
  ];

  // ✅ UPDATED CATEGORY LIST
  const categories = [
    { label: "All", value: "all" },
    { label: "Residences", value: "residences" },
    { label: "Living Areas", value: "living" },
    { label: "Kitchen", value: "kitchen" },
    { label: "Bedroom", value: "bedroom" },
    { label: "Balconies", value: "balcony" },
    { label: "Lifestyle", value: "lifestyle" },
    { label: "Dining", value: "dining" },
    { label: "Leisure", value: "leisure" },
    { label: "Lounge/Corridor", value: "lounge-corridor" },
  ];

  const [activeCategory, setActiveCategory] = useState("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const heroImages = [
    "/hero-alt.png",
    "/gallery/living/living-wide.jpg",
    "/gallery/bedroom/bedroom-deluxe.jpg",
    "/gallery/kitchen/kitchen-2.jpg"
  ];

  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const filteredImages =
    activeCategory === "all"
      ? images
      : images.filter((img) => img.category === activeCategory);

  const closeViewer = () => setActiveIndex(null);

  const nextImage = () => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % filteredImages.length);
  };

  const prevImage = () => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex - 1 + filteredImages.length) % filteredImages.length);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (e.key === "Escape") closeViewer();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex]);

  return (
    <main className="pt-28 md:pt-32 bg-[#F8F6F2] min-h-screen">

      {/* HERO */}
      <section
        className="py-6 md:py-8 px-6 md:px-16 text-center text-white bg-cover bg-center relative transition-all duration-1000"
        style={{ backgroundImage: `url(${heroImages[heroIndex]})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-semibold mb-4">
            Photo Gallery
          </h1>
          <p className="text-lg text-gray-200">
            Explore the elegance and comfort of The Carrington Suites.
          </p>
        </div>
      </section>

      {/* FILTERS */}
      <section className="px-6 md:px-16 pt-2 md:pt-3 pb-1">
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-3 max-w-5xl mx-auto">

          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-1.5 border transition ${
                activeCategory === cat.value
                  ? "bg-[#0B2C5F] text-white border-[#0B2C5F]"
                  : "border-gray-300 text-gray-700 hover:border-[#C6A85B]"
              }`}
            >
              {cat.label}
            </button>
          ))}

        </div>
      </section>

      {/* MASONRY */}
      <section className="px-6 md:px-16 pb-16 -mt-4 md:-mt-6">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 max-w-7xl mx-auto">

          {filteredImages.map((image, index) => (
            <div
              key={index}
              onClick={() => setActiveIndex(index)}
              className="relative cursor-pointer group overflow-hidden rounded-xl break-inside-avoid"
            >
              <img
                src={image.src}
                className="w-full object-cover group-hover:scale-110 transition duration-700"
              />

              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <span className="text-white border border-white px-6 py-3 tracking-[3px] text-sm">
                  VIEW
                </span>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* VIEWER */}
      {activeIndex !== null && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50">

          <button onClick={closeViewer} className="absolute top-6 right-6 text-white text-3xl">×</button>
          <button onClick={prevImage} className="absolute left-6 text-white text-3xl">‹</button>

          <div className="max-w-6xl px-6">
            <img src={filteredImages[activeIndex].src} className="max-h-[80vh] mx-auto rounded-lg" />
          </div>

          <button onClick={nextImage} className="absolute right-6 text-white text-3xl">›</button>

        </div>
      )}

    </main>
  );
}