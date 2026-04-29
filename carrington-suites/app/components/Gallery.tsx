"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";

export default function Gallery() {

  const slides = [
    {
      src: "/suite-modern-1.png",
      title: "3-bed Premium Residence",
      description: "Elegant living spaces designed for refined comfort."
    },
    {
      src: "/suite-dark-1.png",
      title: "2-bed PentHouse Residence",
      description: "Luxury interiors crafted for a premium stay."
    },
    {
      src: "/suite-wood-2.png",
      title: "1-bed Penthouse Signature Residence",
      description: "A private sanctuary in Victoria Island."
    },
    {
      src: "/tv-wall.png",
      title: "Modern Interiors",
      description: "Contemporary design with luxuriouscomfort."
    }
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

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6">

        {slides.map((img, i) => (

          <motion.div
            key={i}
            className="relative overflow-hidden rounded group cursor-pointer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
          >

            <img
              src={img.src}
              className="w-full h-[220px] md:h-[260px] object-cover group-hover:scale-110 transition duration-700"
              alt={img.title}
              loading="lazy"
            />

            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">

              <span className="text-white text-sm tracking-widest">
                VIEW
              </span>

            </div>

          </motion.div>

        ))}

      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        plugins={[Zoom, Captions]}
        carousel={{ preload: 2 }}
        animation={{ zoom: 500 }}
        controller={{ closeOnBackdropClick: true }}
      />

    </section>
  );
}