import { Suspense } from "react";
import BookingSuccessClient from "./BookingSuccessClient";

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingSuccessClient />
    </Suspense>
  );
}