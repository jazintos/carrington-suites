"use client";
import { useState } from "react";

export default function Booking() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus("Processing booking...");

    const formData = new FormData(e.target);

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/timi@spectrometerltd.com",
        {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        }
      );

      if (response.ok) {
        setStatus("Booking request sent successfully. We will contact you shortly.");
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

      {/* HEADER */}
      <section className="py-20 md:py-32 px-6 md:px-16 text-center">

        <h1 className="text-4xl md:text-6xl font-semibold text-[#0B2C5F] mb-6">
          Book Your Stay
        </h1>

        <p className="max-w-2xl mx-auto text-gray-800 text-base md:text-lg">
          Complete the form below and our team will confirm your reservation promptly.
        </p>

      </section>

      {/* FORM SECTION */}
      <section className="px-6 md:px-16 pb-24">

        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-8 md:p-12">

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* FULL NAME */}
            <div>
              <label className="block text-sm font-semibold text-[#0B2C5F] mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full border border-gray-400 px-4 py-3 focus:outline-none focus:border-[#C6A85B] focus:ring-1 focus:ring-[#C6A85B]"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-semibold text-[#0B2C5F] mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full border border-gray-400 px-4 py-3 focus:outline-none focus:border-[#C6A85B] focus:ring-1 focus:ring-[#C6A85B]"
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="block text-sm font-semibold text-[#0B2C5F] mb-2">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                required
                className="w-full border border-gray-400 px-4 py-3 focus:outline-none focus:border-[#C6A85B] focus:ring-1 focus:ring-[#C6A85B]"
              />
            </div>

            {/* APARTMENT */}
            <div>
              <label className="block text-sm font-semibold text-[#0B2C5F] mb-2">
                Apartment Type
              </label>
              <select
                name="apartment"
                required
                className="w-full border border-gray-400 px-4 py-3 bg-white focus:outline-none focus:border-[#C6A85B] focus:ring-1 focus:ring-[#C6A85B]"
              >
                <option value="">Select Apartment Type</option>
                <option>Executive 3-Bedroom Suite</option>
                <option>Premium 3-Bedroom Suite</option>
                <option>Signature 3-Bedroom Residence</option>
              </select>
            </div>

            {/* CHECK-IN */}
            <div>
              <label className="block text-sm font-semibold text-[#0B2C5F] mb-2">
                Check-In Date
              </label>
              <input
                type="date"
                name="checkin"
                required
                className="w-full border border-gray-400 px-4 py-3 focus:outline-none focus:border-[#C6A85B] focus:ring-1 focus:ring-[#C6A85B]"
              />
            </div>

            {/* CHECK-OUT */}
            <div>
              <label className="block text-sm font-semibold text-[#0B2C5F] mb-2">
                Check-Out Date
              </label>
              <input
                type="date"
                name="checkout"
                required
                className="w-full border border-gray-400 px-4 py-3 focus:outline-none focus:border-[#C6A85B] focus:ring-1 focus:ring-[#C6A85B]"
              />
            </div>

            {/* NOTES */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-[#0B2C5F] mb-2">
                Additional Requests (Optional)
              </label>
              <textarea
                name="notes"
                rows={4}
                className="w-full border border-gray-400 px-4 py-3 focus:outline-none focus:border-[#C6A85B] focus:ring-1 focus:ring-[#C6A85B]"
              ></textarea>
            </div>

            {/* BUTTON */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-[#0B2C5F] text-white py-4 font-medium hover:bg-[#C6A85B] transition duration-300"
              >
                SUBMIT BOOKING REQUEST
              </button>
            </div>

          </form>

          {status && (
            <p className="mt-8 text-center text-sm font-medium text-[#0B2C5F]">
              {status}
            </p>
          )}

        </div>

      </section>

    </main>
  );
}