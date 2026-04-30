"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";

export default function Gallery() {

  // 🔥 NEW: Structured slides from your folders
  const slides = [
    // 🛋️ Living
    {
      src: "/gallery/living/living-0.jpg",
      title: "Living Room",
      description: "Spacious and elegantly styled living area."
    },
    {
      src: "/gallery/living/living-1.jpg",
      title: "Modern Lounge",
      description: "Designed for comfort and sophistication."
    },

    // 🍳 Kitchen
    {
      src: "/gallery/kitchen/kitchen-1a.jpg",
      title: "Modern Kitchen",
      description: "Fully equipped with premium appliances."
    },
    {
      src: "/gallery/kitchen/kitchen-3.jpg",
      title: "Kitchen Detail",
      description: "Clean lines, refined finishes."
    },

    // 🛏️ Bedroom
    {
      src: "/gallery/bedroom/bedroom-2.jpg",
      title: "Luxury Bedroom",
      description: "A calm, private retreat."
    },
    {
      src: "/gallery/bedroom/bedroom-deluxe.jpg",
      title: "Deluxe Suite",
      description: "Elevated comfort with premium styling."
    },

    // 🌇 Balcony / View
    {
      src: "/gallery/details/balcony-main-1.jpg",
      title: "Balcony View",
      description: "Waterfront views from your residence."
    },
    {
      src: "/gallery/details/balcony-main-2.jpg",
      title: "Outdoor Experience",
      description: "Relax and unwind with scenic views."
    },

    // 👗 Lifestyle (your shoot)
    {
      src: "/gallery/lifestyle/lifestyle-portrait-1.jpg",
      title: "Carrington Lifestyle",
      description: "Where elegance meets everyday living."
    },
    {
      src: "/gallery/lifestyle/lifestyle-portrait-2.jpg",
      title: "Premium Experience",
      description: "Curated living at its finest."
    },
  ];

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <section className="bg-[#EEF2F1] py-20 md:py-28">

      <div className="text-center mb-16 px-6">

        <h2 className="text-3xl md:text-4xl font-light text-[#0B2C5F]">
          Moments at Carrington
        </h2>

        <div className="divider"></div>

      </div>

      {/* 🔥 IMPROVED GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-6">

        {slides.map((img, i) => (

          <motion.div
            key={i}
            className="relative overflow-hidden rounded-xl group cursor-pointer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
          >

            <img
              src={img.src}
              className="w-full h-[200px] sm:h-[220px] md:h-[240px] object-cover group-hover:scale-110 transition duration-700"
              alt={img.title}
              loading="lazy"
            />

            {/* 🔥 BETTER OVERLAY */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center text-center px-3">

              <span className="text-white text-xs tracking-widest mb-1">
                VIEW
              </span>

              <span className="text-white text-sm font-medium">
                {img.title}
              </span>

            </div>

          </motion.div>

        ))}

      </div>

      {/* 🔥 LIGHTBOX */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        plugins={[Zoom, Captions]}
        carousel={{ preload: 3 }}
        animation={{ zoom: 500 }}
        controller={{ closeOnBackdropClick: true }}
      />

    </section>
  );
}