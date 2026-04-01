export default function BookingPending() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F6F2]">
        <div className="text-center bg-white p-8 rounded-xl shadow-xl">
  
          <h1 className="text-2xl font-semibold text-yellow-600 mb-3">
            Payment Processing
          </h1>
  
          <p className="text-gray-600 mb-4">
            Your payment is being confirmed.
          </p>
  
          <p className="text-sm text-gray-500">
            This usually takes a few seconds. Please wait or refresh.
          </p>
  
        </div>
      </div>
    );
  }