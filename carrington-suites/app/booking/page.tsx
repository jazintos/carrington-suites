export default function Booking() {
    return (
      <div className="p-10">
        <h1 className="text-4xl mb-5">
          Book Your Stay
        </h1>
  
        {/* BOOKING FORM STARTS HERE */}
        <form
          action="https://formsubmit.co/timi@spectrometerltd.com"
          method="POST"
          className="flex flex-col gap-4 max-w-md"
        >
  
          {/* disables captcha */}
          <input type="hidden" name="_captcha" value="false" />
  
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="border p-2"
            required
          />
  
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border p-2"
            required
          />
  
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="border p-2"
            required
          />
  
          <label>Check-In Date</label>
          <input type="date" name="checkin" className="border p-2" />
  
          <label>Check-Out Date</label>
          <input type="date" name="checkout" className="border p-2" />
  
          <button
            type="submit"
            className="bg-black text-white p-3"
          >
            Submit Booking
          </button>
  
        </form>
        {/* BOOKING FORM ENDS HERE */}
  
      </div>
    );
  }