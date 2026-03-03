"use client";
import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus("Sending...");

    const formData = new FormData(e.target);

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/info@thecarringtonsuites.com",
        {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        }
      );

      if (response.ok) {
        setStatus("Message sent successfully. We will respond shortly.");
        e.target.reset();
      } else {
        setStatus("Something went wrong. Please try again.");
      }
    } catch {
      setStatus("Network error. Please try again.");
    }
  };

  return (
    <main className="pt-28 md:pt-36 bg-[#F8F6F2] min-h-screen">

      {/* HEADER */}
      <section className="py-20 md:py-32 px-6 md:px-16 text-center">

        <h1 className="text-4xl md:text-6xl font-semibold text-[#0B2C5F] mb-6">
          Contact Us
        </h1>

        <p className="max-w-2xl mx-auto text-gray-800 text-base md:text-lg">
          We’re here to assist you with reservations and inquiries.
        </p>

      </section>

      {/* CONTENT */}
      <section className="px-6 md:px-16 pb-24">

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* LEFT SIDE */}
          <div className="space-y-10 text-center lg:text-left">

            <div>
              <h3 className="text-xl font-semibold text-[#0B2C5F] mb-3">
                Address
              </h3>
              <p className="text-gray-900 leading-relaxed">
                Walter Carrington Crescent,<br />
                Victoria Island,<br />
                Lagos, Nigeria
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#0B2C5F] mb-3">
                Phone
              </h3>
              <p className="text-gray-900">
                +234 903 847 7748
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#0B2C5F] mb-3">
                Email
              </h3>
              <p className="text-gray-900">
                info@thecarringtonsuites.com
              </p>
            </div>

          </div>

          {/* RIGHT SIDE - FORM */}
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">

            <h3 className="text-2xl font-semibold text-[#0B2C5F] mb-8">
              Send Us a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">

              <div>
                <label className="block text-sm font-medium text-[#0B2C5F] mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full border border-gray-400 px-4 py-3 focus:outline-none focus:border-[#C6A85B] focus:ring-1 focus:ring-[#C6A85B]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0B2C5F] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full border border-gray-400 px-4 py-3 focus:outline-none focus:border-[#C6A85B] focus:ring-1 focus:ring-[#C6A85B]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0B2C5F] mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="w-full border border-gray-400 px-4 py-3 focus:outline-none focus:border-[#C6A85B] focus:ring-1 focus:ring-[#C6A85B]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0B2C5F] text-white py-3 font-medium hover:bg-[#C6A85B] transition duration-300"
              >
                SEND MESSAGE
              </button>

            </form>

            {status && (
              <p className="mt-6 text-center text-sm font-medium text-[#0B2C5F]">
                {status}
              </p>
            )}

          </div>

        </div>

      </section>

    </main>
  );
}