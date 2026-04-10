"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import jsPDF from "jspdf";
import { QRCodeSVG } from "qrcode.react";
import { Suspense } from "react";

function CheckBookingContent() {
  const [reference, setReference] = useState("");
  const [booking, setBooking] = useState<any>(null);
  const [error, setError] = useState("");

  const searchParams = useSearchParams();

  // ✅ AUTO FETCH FROM URL
  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) {
      setReference(ref);
      handleAutoFetch(ref);
    }
  }, []);

  const handleAutoFetch = async (ref: string) => {
    try {
      const res = await fetch(`/api/bookings/${ref}`);
      const data = await res.json();
      if (res.ok) setBooking(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCheck = async () => {
    setError("");
    setBooking(null);

    if (!reference) {
      setError("Please enter your booking reference");
      return;
    }

    if (!reference.startsWith("TCS-")) {
      setError("Invalid reference format (e.g. TCS-12345)");
      return;
    }

    try {
      const res = await fetch(`/api/bookings/${reference}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Booking not found");
        return;
      }

      setBooking(data);
    } catch (err) {
      console.error(err);
      setError("Unable to connect. Please try again.");
    }
  };

  // ✅ PDF DOWNLOAD
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`Booking Ref: ${booking.reference}`, 10, 10);
    doc.text(`Name: ${booking.name}`, 10, 20);
    doc.text(`Total: ₦${booking.totalPrice}`, 10, 30);
    doc.save("booking.pdf");
  };

  return (
    <div className="min-h-screen pt-32 px-4 md:px-6 flex justify-center">
        
      <div className="max-w-xl w-full bg-white shadow-lg p-6 md:p-8 rounded-lg text-center">
      <p>&nbsp;</p> 
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">  <p>&nbsp;</p> 
          Check Your Booking
        </h2>

        <input
          type="text"
          placeholder="Enter booking reference (e.g. TCS-123456)"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          className="w-full border p-3 mb-4 rounded-md"
        />

        <button
          onClick={handleCheck}
          className="bg-[#3F6A64] text-white px-6 py-3 rounded-md w-full hover:opacity-90 transition"
        >
          Check Booking
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {booking && (
          <div className="mt-6 text-left border-t pt-6">

            <h3 className="text-lg md:text-xl font-semibold mb-3">
              Booking Details
            </h3>

            <div className="space-y-2 text-sm md:text-base">
              <p><strong>Status:</strong> {booking.status}</p>
              <p><strong>Name:</strong> {booking.name}</p>
              <p><strong>Email:</strong> {booking.email}</p>
              <p><strong>Apartment:</strong> {booking.unit.apartmentType.name}</p>
              <p><strong>Unit:</strong> {booking.unit.name}</p>
              <p><strong>Check-in:</strong> {new Date(booking.checkIn).toDateString()}</p>
              <p><strong>Check-out:</strong> {new Date(booking.checkOut).toDateString()}</p>
              <p className="font-semibold text-lg text-[#3F6A64]">
                Total: ₦{booking.totalPrice.toLocaleString()}
              </p>
            </div>

            {/* ✅ QR CODE */}
            <div className="mt-4 flex justify-center">
            {typeof window !== "undefined" && (
             <QRCodeSVG
                value={`${window.location.origin}/booking/check?ref=${booking.reference}`}
                size={120}
             />
            )} </div>

            {/* ✅ ACTION BUTTONS */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">

              <button
                onClick={() => window.print()}
                className="w-full border border-[#3F6A64] text-[#3F6A64] py-3 rounded-md hover:bg-[#3F6A64] hover:text-white transition"
              >
                Print
              </button>

              <button
                onClick={downloadPDF}
                className="w-full border py-3 rounded-md"
              >
                Download PDF
              </button>

              <button
                onClick={() => (window.location.href = "/")}
                className="w-full bg-[#0B2C5F] text-white py-3 rounded-md hover:opacity-90 transition"
              >
                Done
              </button>

            </div>

            {/* ✅ EXTRA ACTIONS */}
            <div className="mt-4 flex flex-col gap-3">

              <button
                onClick={async () => {
                  await fetch("/api/bookings/resend", {
                    method: "POST",
                    body: JSON.stringify({ reference }),
                  });
                  alert("Email sent!");
                }}
                className="w-full border py-3 rounded-md"
              >
                Resend Confirmation Email
              </button>

              <button
                onClick={async () => {
                  if (!confirm("Cancel booking?")) return;

                  await fetch("/api/bookings/cancel", {
                    method: "POST",
                    body: JSON.stringify({ reference }),
                  });

                  alert("Booking cancelled");
                  window.location.reload();
                }}
                className="w-full bg-red-500 text-white py-3 rounded-md"
              >
                Cancel Booking
              </button>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default function CheckBookingPage() {
    return (
      <Suspense fallback={<div className="pt-32 text-center">Loading...</div>}>
        <CheckBookingContent />
      </Suspense>
    );
  }