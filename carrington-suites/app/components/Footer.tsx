import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0B2C5F] text-white">

      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">

        {/* BRAND */}
        <div>

          <h3 className="text-2xl font-semibold text-[#C6A85B] mb-6">
            The Carrington Suites
          </h3>

          <p className="text-gray-200 leading-relaxed">
            A curated collection of refined private residences designed for
            discerning guests seeking elegant living in Victoria Island,
            Lagos.
          </p>

        </div>


        {/* EXPLORE */}
        <div>

          <h4 className="text-lg tracking-widest text-[#C6A85B] mb-6">
            EXPLORE
          </h4>

          <div className="space-y-3 text-gray-200">

            <Link href="/" className="block hover:text-[#C6A85B] transition">
              Home
            </Link>

            <Link href="/apartments" className="block hover:text-[#C6A85B] transition">
              Residences
            </Link>

            <Link href="/gallery" className="block hover:text-[#C6A85B] transition">
              Gallery
            </Link>

            <Link href="/contact" className="block hover:text-[#C6A85B] transition">
              Contact
            </Link>

            <Link href="/booking" className="block hover:text-[#C6A85B] transition">
              Book Your Stay
            </Link>

          </div>

        </div>


        {/* CONCIERGE */}
        <div>

          <h4 className="text-lg tracking-widest text-[#C6A85B] mb-6">
            CONCIERGE
          </h4>

          <div className="space-y-3 text-gray-200">

            <p>8, 9 and 10, Walter Carrington Crescent, Victoria Island, Lagos</p>

            <a
              href="tel:+2349030009716"
              className="block hover:text-[#C6A85B] transition"
            >
              +234 903 000 9716
            </a>

            <a
              href="https://wa.me/2349030009716"
              className="block hover:text-[#C6A85B] transition"
            >
              WhatsApp Concierge
            </a>

          </div>

        </div>


        {/* LEGAL */}
        <div>

          <h4 className="text-lg tracking-widest text-[#C6A85B] mb-6">
            LEGAL
          </h4>

          <div className="space-y-3 text-gray-200">

            <Link href="/terms" className="block hover:text-[#C6A85B] transition">
              Terms & Conditions
            </Link>

            <Link href="/privacy" className="block hover:text-[#C6A85B] transition">
              Privacy Policy
            </Link>

            <Link href="/security" className="block hover:text-[#C6A85B] transition">
              Security Policy
            </Link>

            <Link href="/booking-policy" className="block hover:text-[#C6A85B] transition">
              Booking Policy
            </Link>

          </div>

        </div>

      </div>


      {/* DIVIDER */}
      <div className="border-t border-white/20"></div>


      {/* BOTTOM BAR */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-300 gap-4">

        <p>© 2026 The Carrington Suites. All rights reserved.</p>

        <p className="text-center md:text-right">
          Developed by <span className="text-[#C6A85B]">YVES | ENZO Tech Ltd.</span>
        </p>

      </div>

    </footer>
  );
}