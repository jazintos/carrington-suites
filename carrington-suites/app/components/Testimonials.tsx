export default function Testimonials() {

    const testimonials = [
      {
        quote:
          "An exceptional residence. Elegant interiors and complete privacy.",
        guest: "Guest from London"
      },
      {
        quote:
          "Beautifully designed apartments and outstanding service.",
        guest: "Guest from Dubai"
      },
      {
        quote:
          "One of the finest luxury residences in Victoria Island.",
        guest: "Guest from Johannesburg"
      }
    ];
  
    return (
      <section className="text-center px-6">
  
        <h2 className="text-3xl md:text-4xl mb-12 font-light">
          Guest Experiences
        </h2>
  
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10">
  
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-10 shadow rounded">
  
              <div className="star-rating mb-4">★★★★★</div>
  
              <p className="italic text-gray-700 mb-6">
                "{t.quote}"
              </p>
  
              <p className="text-sm tracking-widest text-gray-500">
                {t.guest}
              </p>
  
            </div>
          ))}
  
        </div>
  
      </section>
    );
  }