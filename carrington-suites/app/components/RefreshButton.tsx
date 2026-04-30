"use client";

import { RefreshCcw } from "lucide-react";

export default function RefreshButton() {
  return (
    <button
      onClick={() => window.location.reload()}
      className="flex items-center gap-2 text-sm px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
    >
      <RefreshCcw size={16} />
      Refresh
    </button>
  );
}