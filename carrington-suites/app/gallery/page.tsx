"use client";

import { useState, useEffect } from "react";

export default function Gallery() {

  const images = [

    { src: "/suite-modern-1.png", title: "3-bed Suite Bedroom", category: "residences" },
    { src: "/suite-dark-1.png", title: "Premium Suite Bedroom", category: "residences" },
    { src: "/suite-wood-1.png", title: "Signature Residence Bedroom", category: "residences" },
    { src: "/suite-wood-2.png", title: "Signature Residence Living Area", category: "residences" },

    { src: "/living-1.png", title: "Luxury Living Room", category: "living" },
    { src: "/tv-wall.png", title: "Modern Entertainment Area", category: "living" },

    { src: "/balcony-1.png", title: "Balcony Waterfront View", category: "balcony" },
    { src: "/balcony-mini.png", title: "Balcony Seating Area", category: "balcony" }

  ];

  const categories = [
    { label: "All", value: "all" },
    { label: "Residences", value: "residences" },
    { label: "Living Areas", value: "living" },
    { label: "Balconies", value: "balcony" }
  ];

  const [activeCategory, setActiveCategory] = useState("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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
    <main className="pt-32 md:pt-40 bg-[#F8F6F2] min-h-screen">


{/* HERO */}

<section
  className="py-24 md:py-32 px-6 md:px-16 text-center text-white bg-cover bg-center relative"
  style={{ backgroundImage: "url('/hero-alt.png')" }}
>

<div className="absolute inset-0 bg-black/60"></div>

<div className="relative max-w-3xl mx-auto">

<h1 className="text-4xl md:text-6xl font-semibold mb-6">
Photo Gallery
</h1>

<p className="text-lg text-gray-200">
Explore the elegance and comfort of The Carrington Suites.
</p>

</div>

</section>



{/* FILTERS */}

<section className="px-6 md:px-16 pt-12 pb-6">

<div className="flex flex-wrap justify-center gap-6">

{categories.map((cat) => (

<button
key={cat.value}
onClick={() => setActiveCategory(cat.value)}
className={`px-5 py-2 border transition ${
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



{/* MASONRY GALLERY */}

<section className="px-6 md:px-16 pb-20">

<div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 max-w-7xl mx-auto">

{filteredImages.map((image, index) => (

<div
key={index}
onClick={() => setActiveIndex(index)}
className="relative cursor-pointer group overflow-hidden rounded-xl break-inside-avoid"
>

<img
src={image.src}
alt={image.title}
className="w-full object-cover group-hover:scale-110 transition duration-700"
/>

{/* HOVER OVERLAY */}

<div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">

<span className="text-white border border-white px-6 py-3 tracking-[3px] text-sm">
VIEW
</span>

</div>

</div>

))}

</div>

</section>



{/* FULLSCREEN VIEWER */}

{activeIndex !== null && (

<div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50">

<button
onClick={closeViewer}
className="absolute top-6 right-6 text-white text-3xl"
>
×
</button>

<button
onClick={prevImage}
className="absolute left-6 text-white text-3xl"
>
‹
</button>

<div className="max-w-6xl px-6">

<img
src={filteredImages[activeIndex].src}
className="max-h-[80vh] w-auto mx-auto rounded-lg"
/>

<p className="text-white text-center mt-6">
{filteredImages[activeIndex].title}
</p>

</div>

<button
onClick={nextImage}
className="absolute right-6 text-white text-3xl"
>
›
</button>

</div>

)}

</main>
  );
}