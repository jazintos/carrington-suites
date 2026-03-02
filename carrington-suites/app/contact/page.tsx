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
          headers: {
            Accept: "application/json",
          },
          body: formData,
        }
      );

      if (response.ok) {
        setStatus("Message sent successfully!");
        e.target.reset();
      } else {
        setStatus("Something went wrong. Please try again.");
      }
    } catch (error) {
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

        <p className="max-w-2xl mx-auto text-gray-600 text-base md:text-lg">
          We’re here to assist you with reservations and inquiries.
        </p>

      </section>

      {/* CONTENT */}
      <section className="px-6 md:px-16 pb-24">

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* LEFT */}
          <div className="space-y-8 text-center md:text-left">

            <div>
              <h3 className="text-xl font-semibold text-[#0B2C5F] mb-2">
                Address
              </h3>
              <p className="text-gray-600">
                Walter Carrington Crescent,<br />
                Victoria Island,<br />
                Lagos, Nigeria
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#0B2C5F] mb-2">
                Phone
              </h3>
              <p className="text-gray-600">
                +234 903 847 7748
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#0B2C5F] mb-2">
                Email
              </h3>
              <p className="text-gray-600">
                info@thecarringtonsuites.com
              </p>
            </div>

          </div>

          {/* RIGHT - FORM */}
          <div className="bg-white rounded-xl shadow-lg p-8">

            <h3 className="text-2xl font-semibold text-[#0B2C5F] mb-6">
              Send Us a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-[#C6A85B]"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-[#C6A85B]"
              />

              <textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                required
                className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-[#C6A85B]"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-[#0B2C5F] text-white py-3 hover:bg-[#C6A85B] transition duration-300"
              >
                SEND MESSAGE
              </button>

            </form>

            {status && (
              <p className="mt-6 text-center text-sm text-[#0B2C5F]">
                {status}
              </p>
            )}

          </div>

        </div>

      </section>

    </main>
  );
}