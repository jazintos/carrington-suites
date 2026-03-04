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
    <main className="pt-32 md:pt-40 bg-[#F8F6F2] min-h-screen">

      {/* ================= HERO HEADER ================= */}
      <section
        className="py-24 md:py-32 px-6 md:px-16 text-center text-white bg-cover bg-center relative"
        style={{
          backgroundImage: "url('/hero-alt.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative max-w-3xl mx-auto">

          <h1 className="text-4xl md:text-6xl font-semibold mb-6">
            Contact Carrington Suites
          </h1>

          <p className="text-lg text-gray-200">
            Our team is available to assist with reservations,
            special requests, and general inquiries.
          </p>

        </div>
      </section>


      {/* ================= CONTACT SECTION ================= */}
      <section className="px-6 md:px-16 py-20 md:py-28">

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE - INFO */}
          <div className="space-y-10 text-center lg:text-left">

            <div>
              <h3 className="text-xl font-semibold text-[#0B2C5F] mb-3">
                Address
              </h3>

              <p className="text-gray-900 leading-relaxed">
                Walter Carrington Crescent<br />
                Victoria Island<br />
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


            {/* IMAGE PANEL */}
            <div className="hidden lg:block pt-10">
              <img
                src="/balcony-mini.png"
                alt="Carrington Suites Balcony View"
                className="rounded-xl shadow-xl"
              />
            </div>

          </div>


          {/* RIGHT SIDE - FORM */}
          <div className="bg-white rounded-xl shadow-xl p-8 md:p-10">

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