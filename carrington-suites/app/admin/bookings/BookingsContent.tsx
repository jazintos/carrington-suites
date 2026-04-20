'use client';

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState<any>({});

  const searchParams = useSearchParams();
  const statusFilter = searchParams.get("status");

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [bookings, search, statusFilter]);

  const fetchBookings = async () => {
    const res = await fetch("/api/admin/bookings");
    const data = await res.json();
    setBookings(data);
  };

  const applyFilters = () => {
    let data = [...bookings];

    if (statusFilter) {
      data = data.filter(
        (b) => b.status?.toUpperCase() === statusFilter
      );
    }

    if (search) {
      const q = search.toLowerCase();

      data = data.filter((b) =>
        b.name?.toLowerCase().includes(q) ||
        b.email?.toLowerCase().includes(q) ||
        (b.reference || "").toLowerCase().includes(q)
      );
    }

    setFiltered(data);
  };

  // 🔥 STATUS UPDATE
  const updateStatus = async (id: number, status: string) => {
    await fetch("/api/bookings/update-status", {
      method: "POST",
      body: JSON.stringify({ bookingId: id, status }),
    });

    fetchBookings();
  };

  // 🔥 DELETE
  const deleteBooking = async (id: number) => {
    if (!confirm("Delete this booking permanently?")) return;

    await fetch("/api/bookings/delete", {
      method: "POST",
      body: JSON.stringify({ bookingId: id }),
    });

    fetchBookings();
  };

  // 🔥 CREATE
  const createBooking = async () => {
    await fetch("/api/bookings/create", {
      method: "POST",
      body: JSON.stringify(form),
    });

    setShowCreate(false);
    setForm({});
    fetchBookings();
  };

  const badge = (status: string) => {
    const s = status?.toUpperCase();

    if (s === "PENDING") return "bg-yellow-100 text-yellow-700";
    if (s === "CONFIRMED") return "bg-green-100 text-green-700";
    if (s === "CANCELLED") return "bg-red-100 text-red-700";
    if (s === "COMPLETED") return "bg-gray-200 text-gray-700";

    return "bg-gray-100";
  };

  return (
    <div>

      <h1 className="text-2xl mb-6 text-[var(--carrington-gold)]">
        Bookings Management
      </h1>

      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-6 gap-4">

        <input
          placeholder="Search name, email or reference..."
          className="w-full md:w-1/2 p-3 border rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={() => setShowCreate(true)}
          className="btn-primary whitespace-nowrap"
        >
          + New Booking
        </button>

      </div>

      {/* TABLE */}
      <div className="admin-card overflow-x-auto">

        <table className="w-full text-sm border-collapse">

          <thead className="border-b text-left text-gray-600">
            <tr>
              <th className="py-3">Guest</th>
              <th>Reference</th>
              <th>Dates</th>
              <th>Amount</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>

          <tbody>

            {filtered.map((b) => (
              <tr key={b.id} className="border-b hover:bg-gray-50">

                {/* GUEST */}
                <td className="py-3">
                  <p className="font-medium">{b.name}</p>
                  <p className="text-xs text-gray-500">{b.email}</p>
                </td>

                {/* REF */}
                <td className="font-mono text-xs">
                  {b.reference || "—"}
                </td>

                {/* DATES */}
                <td>
                  <div className="text-xs">
                    <div>{new Date(b.checkIn).toDateString()}</div>
                    <div className="text-gray-400">
                      → {new Date(b.checkOut).toDateString()}
                    </div>
                  </div>
                </td>

                {/* AMOUNT */}
                <td className="font-medium">
                  ₦{Number(b.totalPrice).toLocaleString()}
                </td>

                {/* STATUS */}
                <td>
                  <span className={`px-2 py-1 text-xs rounded ${badge(b.status)}`}>
                    {b.status}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="text-right space-x-2">

                  {b.status !== "CONFIRMED" && (
                    <button
                      onClick={() => updateStatus(b.id, "CONFIRMED")}
                      className="text-green-600 text-xs"
                    >
                      Confirm
                    </button>
                  )}

                  {b.status !== "CANCELLED" && (
                    <button
                      onClick={() => updateStatus(b.id, "CANCELLED")}
                      className="text-red-600 text-xs"
                    >
                      Cancel
                    </button>
                  )}

                  {b.status !== "COMPLETED" && (
                    <button
                      onClick={() => updateStatus(b.id, "COMPLETED")}
                      className="text-gray-600 text-xs"
                    >
                      Complete
                    </button>
                  )}

                  <button
                    onClick={() => deleteBooking(b.id)}
                    className="text-red-500 text-xs ml-2"
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {/* ================= MODAL ================= */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-xl p-6 w-[520px] shadow-xl">

            <h2 className="text-lg font-semibold mb-4">
              Create New Booking
            </h2>

            <div className="grid grid-cols-2 gap-4">

              <input
                placeholder="Full Name"
                className="p-3 border rounded-lg"
                onChange={e => setForm({...form, name: e.target.value})}
              />

              <input
                placeholder="Email"
                className="p-3 border rounded-lg"
                onChange={e => setForm({...form, email: e.target.value})}
              />

              <input
                placeholder="Phone"
                className="p-3 border rounded-lg col-span-2"
                onChange={e => setForm({...form, phone: e.target.value})}
              />

              <input
                placeholder="Apartment Type (e.g Executive)"
                className="p-3 border rounded-lg col-span-2"
                onChange={e => setForm({...form, apartment: e.target.value})}
              />

              <div>
                <label className="text-xs text-gray-500">Check-in</label>
                <input
                  type="date"
                  className="p-3 border rounded-lg w-full"
                  onChange={e => setForm({...form, checkin: e.target.value})}
                />
              </div>

              <div>
                <label className="text-xs text-gray-500">Check-out</label>
                <input
                  type="date"
                  className="p-3 border rounded-lg w-full"
                  onChange={e => setForm({...form, checkout: e.target.value})}
                />
              </div>

            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => setShowCreate(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={createBooking}
                className="btn-primary px-6"
              >
                Create Booking
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}