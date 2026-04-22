"use client";

import { motion } from "framer-motion";

export default function Intro() {
  return (
    <section className="bg-[#F8F6F2]">

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center px-6 md:px-12">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >

          <h2 className="text-3xl md:text-4xl mb-6 font-light text-[#0B2C5F]">
            Refined Private Living
          </h2>

          <div className="divider"></div>

          <p className="text-lg text-gray-700 leading-relaxed">
            The Carrington Suites offers a curated collection of refined private
            residences designed for discerning travellers seeking an elevated
            living experience in Lagos.
          </p>

        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="overflow-hidden"
        >
          <img
            src="/living-1.png"
            className="w-full h-[420px] object-cover rounded"
          />
        </motion.div>

      </div>

    </section>
  );
}