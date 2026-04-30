'use client';

import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import RefreshButton from "@/app/components/RefreshButton"; 

export default function ApartmentsPage() {
  const [units, setUnits] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    fetchUnits();
  }, []);

// ✅ Fixed — guard against error responses and non-array data
const fetchUnits = () => {
    fetch("/api/units")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setUnits(data);
        } else {
          console.error("Unexpected /api/units response:", data);
          setUnits([]);
        }
      })
      .catch(err => {
        console.error("Failed to fetch units:", err);
        setUnits([]);
      });
  };

  // 🔥 Fetch bookings when unit is selected
  useEffect(() => {
    if (!selected) return;

    fetch(`/api/admin/bookings?unitId=${selected.id}`)
      .then(res => res.json())
      .then(setBookings);
  }, [selected]);

  // 🔥 Check if a date is booked
  const isDateBooked = (date: Date) => {
    return bookings.some((b: any) => {
      const start = new Date(b.checkIn);
      const end = new Date(b.checkOut);

      return date >= start && date <= end;
    });
  };

  return (
    <div>

      <div className="flex items-center justify-between mb-6">

        <h1 className="text-2xl text-[var(--carrington-gold)]">
          Unit Availability
        </h1>

        <RefreshButton /> {/* ✅ NEW */}

      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-4 gap-4">

        {units.map((unit) => {
          let color = "bg-green-100";

          if (unit.status === "occupied") color = "bg-red-100";

          return (
            <div
              key={unit.id}
              onClick={() => setSelected(unit)}
              className={`p-4 rounded-lg cursor-pointer ${color}`}
            >
              <p className="font-medium">{unit.name}</p>
              <p className="text-sm text-gray-500">
                {unit.status}
              </p>
            </div>
          );
        })}

      </div>

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-lg w-[500px]">

            <h2 className="text-lg mb-4">{selected.name}</h2>

            {/* 🔥 BOOKING DETAILS */}
            {selected.activeBooking ? (
              <div className="mb-4">

                <p><strong>Name:</strong> {selected.activeBooking.name}</p>
                <p><strong>Email:</strong> {selected.activeBooking.email}</p>
                <p><strong>Status:</strong> {selected.activeBooking.status}</p>

                <p>
                  <strong>Dates:</strong>{" "}
                  {new Date(selected.activeBooking.checkIn).toDateString()} -{" "}
                  {new Date(selected.activeBooking.checkOut).toDateString()}
                </p>

                <p>
                  <strong>Total:</strong> ₦{selected.activeBooking.totalPrice}
                </p>

                {/* CANCEL BUTTON */}
                <button
                  onClick={async () => {
                    await fetch("/api/bookings/cancel", {
                      method: "POST",
                      body: JSON.stringify({
                        bookingId: selected.activeBooking.id,
                      }),
                    });

                    setSelected(null);
                    fetchUnits();
                  }}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                >
                  Cancel Booking
                </button>

              </div>
            ) : (
              <p className="mb-4">No active booking</p>
            )}

            {/* 🔥 CALENDAR */}
            <div className="mt-4">
              <Calendar
                tileClassName={({ date }) =>
                  isDateBooked(date) ? "bg-red-200" : ""
                }
              />
            </div>

            <button
              onClick={() => setSelected(null)}
              className="mt-4 text-sm text-gray-500"
            >
              Close
            </button>

          </div>

        </div>
      )}

    </div>
  );
}