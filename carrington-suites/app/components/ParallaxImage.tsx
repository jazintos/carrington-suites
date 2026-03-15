"use client";

import { motion } from "framer-motion";

export default function ParallaxImage() {
  return (
    <section
      className="relative h-[420px] md:h-[600px] bg-fixed bg-center bg-cover"
      style={{ backgroundImage: "url('/living-1.png')" }}
    >
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative h-full flex items-center justify-center text-white text-center px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >

          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Designed for refined living
          </h2>

          <p className="max-w-xl mx-auto text-lg">
            A private sanctuary of elegance and comfort in the heart of
            Victoria Island.
          </p>

        </motion.div>

      </div>
    </section>
  );
}