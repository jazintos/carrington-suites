"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function BookingSuccessClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reference = searchParams.get("reference");

  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!reference) return;

    const fetchBooking = async () => {
      try {
        const res = await fetch(`/api/bookings/${reference}`);
        const data = await res.json();

        if (res.ok) {
          if (data.status !== "CONFIRMED") {
            router.push(`/booking-pending?reference=${reference}`);
            return;
          }

          setBooking(data);
        }
      } catch (error) {
        console.error("Failed to fetch booking");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [reference, router]);

  return (
    <main className="min-h-screen bg-[#F8F6F2] px-4 sm:px-6 md:px-8 pt-28 sm:pt-32 md:pt-40">
      <div className="max-w-xl mx-auto">
        <div className="bg-white shadow-xl rounded-xl p-6 sm:p-8 md:p-10 text-center mt-6 sm:mt-10">

          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#0B2C5F] mb-4">
            Payment Confirmed
          </h1>

          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            Your booking has been successfully secured.
          </p>

          {loading && (
            <p className="text-gray-500 text-sm">Loading booking details...</p>
          )}

          {!loading && booking && (
            <>
              <div className="space-y-2 text-sm sm:text-base text-gray-700">
                <p><strong>Reference:</strong> {booking.reference}</p>
                <p><strong>Apartment:</strong> {booking.unit.apartmentType.name}</p>
                <p><strong>Unit:</strong> {booking.unit.name}</p>

                <p>
                  <strong>Check-In:</strong>{" "}
                  {new Date(booking.checkIn).toLocaleDateString()}
                </p>

                <p>
                  <strong>Check-Out:</strong>{" "}
                  {new Date(booking.checkOut).toLocaleDateString()}
                </p>

                <p><strong>Nights:</strong> {booking.nights}</p>

                <p className="text-lg sm:text-xl font-semibold text-[#C6A85B] mt-4">
                  ₦{booking.totalPrice.toLocaleString()}
                </p>
              </div>

              <p className="text-sm text-gray-500 mt-6">
                A confirmation email will be sent shortly.
              </p>
            </>
          )}

          {!loading && !booking && (
            <p className="text-red-500 text-sm">
              Unable to load booking details.
            </p>
          )}

          <a
            href="/"
            className="mt-8 inline-block bg-[#0B2C5F] text-white px-6 py-3 text-sm sm:text-base hover:bg-[#C6A85B] transition"
          >
            Back to Home
          </a>

        </div>
      </div>
    </main>
  );
}