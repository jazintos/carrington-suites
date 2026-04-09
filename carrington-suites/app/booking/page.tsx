"use client";
import { useState } from "react";

export default function Booking() {

  const [status, setStatus] = useState("");
  const [bookingData, setBookingData] = useState<any>(null);
  const [pricePreview, setPricePreview] = useState<any>(null);

  const PRICES: any = {
    Executive: 800000,
    Premium: 600000,
    Signature: 500000,
  };

  const calculatePrice = (apartment: string, checkin: string, checkout: string) => {
    if (!apartment || !checkin || !checkout) {
      setPricePreview(null);
      return;
    }

    const checkInDate = new Date(checkin);
    const checkOutDate = new Date(checkout);

    if (checkOutDate <= checkInDate) {
      setPricePreview(null);
      return;
    }

    const nights =
      (checkOutDate.getTime() - checkInDate.getTime()) /
      (1000 * 60 * 60 * 24);

    const pricePerNight = PRICES[apartment];
    if (!pricePerNight) return;

    const total = nights * pricePerNight;

    setPricePreview({ nights, total });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus("Processing booking...");
    setBookingData(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

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
        setStatus("Booking confirmed");
        setBookingData(data);
        setPricePreview(null);
        form.reset();
      } else {
        setStatus(data.error || "Something went wrong.");
      }

    } catch {
      setStatus("Network error. Please try again.");
    }
  };

  return (
    <main className="pt-32 md:pt-40 bg-[#F8F6F2] min-h-screen">

      {/* HERO */}
      <section
        className="py-24 md:py-32 px-6 md:px-16 text-center text-white bg-cover bg-center relative"
        style={{ backgroundImage: "url('/hero-alt.png')" }}
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

      {/* BOOKING */}
      <section className="px-6 md:px-16 py-20 md:py-28">

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div className="hidden lg:block">
            <img
              src="/balcony-mini.png"
              alt="Carrington Suites Balcony"
              className="rounded-xl shadow-xl"
            />
          </div>

          <div className="bg-white shadow-xl rounded-xl p-8 md:p-12">

            <h2 className="text-2xl font-semibold text-[#0B2C5F] mb-8">
              Booking Details
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">

              <input type="text" name="name" placeholder="Full Name" required className="border px-4 py-3" />
              <input type="email" name="email" placeholder="Email" required className="border px-4 py-3" />
              <input type="text" name="phone" placeholder="Phone" required className="border px-4 py-3" />

              <select
                name="apartment"
                required
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  const form = e.currentTarget.form;
                  if (!form) return;

                  const checkin = (form.elements.namedItem("checkin") as HTMLInputElement)?.value;
                  const checkout = (form.elements.namedItem("checkout") as HTMLInputElement)?.value;

                  calculatePrice(e.currentTarget.value, checkin, checkout);
                }}
                className="border px-4 py-3"
              >
                <option value="">Select Type</option>
                <option value="Executive">Executive</option>
                <option value="Premium">Premium</option>
                <option value="Signature">Signature</option>
              </select>

              <input
                type="date"
                name="checkin"
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const form = e.currentTarget.form;
                  if (!form) return;

                  const apartment = (form.elements.namedItem("apartment") as HTMLSelectElement)?.value;
                  const checkout = (form.elements.namedItem("checkout") as HTMLInputElement)?.value;

                  calculatePrice(apartment, e.currentTarget.value, checkout);
                }}
                className="border px-4 py-3"
              />

              <input
                type="date"
                name="checkout"
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const form = e.currentTarget.form;
                  if (!form) return;

                  const apartment = (form.elements.namedItem("apartment") as HTMLSelectElement)?.value;
                  const checkin = (form.elements.namedItem("checkin") as HTMLInputElement)?.value;

                  calculatePrice(apartment, checkin, e.currentTarget.value);
                }}
                className="border px-4 py-3"
              />

              {pricePreview && (
                <div className="md:col-span-2 text-center border p-4">
                  <p>{pricePreview.nights} nights</p>
                  <p className="font-bold">₦{pricePreview.total.toLocaleString()}</p>
                </div>
              )}

              <textarea name="notes" rows={3} className="md:col-span-2 border px-4 py-3" />

              <button className="md:col-span-2 bg-[#0B2C5F] text-white py-4">
                SUBMIT BOOKING REQUEST
              </button>

            </form>

            {status && !bookingData && (
              <p className="mt-6 text-center">{status}</p>
            )}

            {bookingData && (
              <div className="mt-8 text-center border p-6">

                <h3 className="font-bold text-lg mb-4">Booking Confirmed</h3>

                <p>Ref: {bookingData.bookingReference}</p>
                <p>Unit: {bookingData.unitAssigned}</p>
                <p>{bookingData.nights} nights</p>
                <p className="font-bold">₦{bookingData.totalPrice.toLocaleString()}</p>

                <button
                  onClick={async () => {
                    const res = await fetch("/api/payments/initialize", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        reference: bookingData.bookingReference,
                      }),
                    });

                    const data = await res.json();

                    console.log("FRONTEND RESPONSE:", data);

                    if (data.authorization_url) {
                      window.location.href = data.authorization_url;
                    } else {
                      alert("Payment failed");
                    }
                  }}
                  className="mt-6 bg-[#C6A85B] text-white px-6 py-3"
                >
                  Proceed to Payment
                </button>

              </div>
            )}

          </div>

        </div>

      </section>

    </main>
  );
}