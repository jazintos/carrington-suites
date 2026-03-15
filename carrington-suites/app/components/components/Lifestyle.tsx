"use client";

import { motion } from "framer-motion";

export default function Lifestyle() {
  return (
    <section className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center px-6 md:px-12">

      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9 }}
      >

        <h2 className="text-3xl md:text-4xl font-light mb-6">
          In the heart of Victoria Island
        </h2>

        <p className="text-gray-700 leading-relaxed">
          Carrington Suites places guests moments away from Lagos’ finest
          restaurants, business districts and waterfront experiences.
          A perfect balance between vibrant city life and private comfort.
        </p>

      </motion.div>

      <motion.img
        src="/balcony-1.png"
        className="w-full h-[420px] object-cover rounded"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

    </section>
  );
}