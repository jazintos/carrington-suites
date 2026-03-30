"use client";
import { useState } from "react";

export default function Booking() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus("Processing booking...");

    const formData = new FormData(e.target);

    try {
      const response = await fetch("/api/bookings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          apartment: formData.get("apartment"),
          checkin: formData.get("checkin"),
          checkout: formData.get("checkout"),
          notes: formData.get("notes"),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus(`Booking received. Ref: ${data.bookingReference}`);
        e.target.reset();
      } else {
        setStatus(data.error || "Something went wrong.");
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
            Reserve Your Stay
          </h1>

          <p className="text-lg text-gray-200">
            Submit your reservation request and our team will confirm your stay promptly.
          </p>

        </div>
      </section>



      {/* ================= BOOKING SECTION ================= */}
      <section className="px-6 md:px-16 py-20 md:py-28">

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE IMAGE */}
          <div className="hidden lg:block">
            <img
              src="/balcony-mini.png"
              alt="Carrington Suites Balcony"
              className="rounded-xl shadow-xl"
            />
          </div>



          {/* RIGHT SIDE FORM */}
          <div className="bg-white shadow-xl rounded-xl p-8 md:p-12">

            <h2 className="text-2xl font-semibold text-[#0B2C5F] mb-8">
              Booking Details
            </h2>

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
                  <option value="">Select  Type</option>
                  <option value="Executive">Executive</option>
                  <option value="Premium">Premium</option>
                  <option value="Signature">Signature</option>
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

        </div>

      </section>

    </main>
  );
}