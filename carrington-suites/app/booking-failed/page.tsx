export default function BookingFailed() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F6F2]">
        <div className="text-center bg-white p-8 rounded-xl shadow-xl">
  
          <h1 className="text-2xl font-semibold text-red-600 mb-3">
            Payment Failed
          </h1>
  
          <p className="text-gray-600 mb-6">
            Your payment could not be completed.
          </p>
  
          <a
            href="/booking"
            className="bg-[#0B2C5F] text-white px-6 py-3 hover:bg-[#C6A85B] transition"
          >
            Try Again
          </a>
  
        </div>
      </div>
    );
  }