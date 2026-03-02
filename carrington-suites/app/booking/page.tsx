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
          headers: {
            Accept: "application/json",
          },
          body: formData,
        }
      );

      if (response.ok) {
        setStatus("Booking request sent successfully. We will contact you shortly.");
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
          Book Your Stay
        </h1>

        <p className="max-w-2xl mx-auto text-gray-600 text-base md:text-lg">
          Complete the form below and our team will confirm your reservation promptly.
        </p>

      </section>

      {/* FORM SECTION */}
      <section className="px-6 md:px-16 pb-24">

        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-8 md:p-12">

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              className="border border-gray-300 px-4 py-3 focus:outline-none focus:border-[#C6A85B]"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              className="border border-gray-300 px-4 py-3 focus:outline-none focus:border-[#C6A85B]"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              required
              className="border border-gray-300 px-4 py-3 focus:outline-none focus:border-[#C6A85B]"
            />

            <select
              name="apartment"
              required
              className="border border-gray-300 px-4 py-3 focus:outline-none focus:border-[#C6A85B]"
            >
              <option value="">Select Apartment Type</option>
              <option>Executive 3-Bedroom Suite</option>
              <option>Premium 3-Bedroom Suite</option>
              <option>Signature 3-Bedroom Residence</option>
            </select>

            <div className="flex flex-col">
              <label className="text-sm mb-1">Check-In Date</label>
              <input
                type="date"
                name="checkin"
                required
                className="border border-gray-300 px-4 py-3 focus:outline-none focus:border-[#C6A85B]"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm mb-1">Check-Out Date</label>
              <input
                type="date"
                name="checkout"
                required
                className="border border-gray-300 px-4 py-3 focus:outline-none focus:border-[#C6A85B]"
              />
            </div>

            <textarea
              name="notes"
              placeholder="Additional Requests (Optional)"
              rows={4}
              className="md:col-span-2 border border-gray-300 px-4 py-3 focus:outline-none focus:border-[#C6A85B]"
            ></textarea>

            <button
              type="submit"
              className="md:col-span-2 bg-[#0B2C5F] text-white py-4 hover:bg-[#C6A85B] transition duration-300"
            >
              SUBMIT BOOKING REQUEST
            </button>

          </form>

          {status && (
            <p className="mt-8 text-center text-sm text-[#0B2C5F]">
              {status}
            </p>
          )}

        </div>

      </section>

    </main>
  );
}