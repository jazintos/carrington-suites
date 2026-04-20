'use client';

import { Suspense } from "react";
import BookingsContent from "./BookingsContent";

export default function BookingsPage() {
  return (
    <Suspense fallback={<p className="p-6">Loading bookings...</p>}>
      <BookingsContent />
    </Suspense>
  );
}