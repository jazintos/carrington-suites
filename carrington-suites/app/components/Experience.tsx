export default function Experience() {

    const items = [
      "Private Residences",
      "24/7 Security",
      "Fully Serviced Apartments",
      "Prime Victoria Island Location",
      "Luxury Interiors",
      "Concierge Assistance",
      "High Speed WiFi",
      "Executive Comfort"
    ];
  
    return (
      <section className="bg-[#F3F5F4] text-center">
  
        <h2 className="text-3xl md:text-4xl mb-16 font-light">
          The Carrington Experience
        </h2>
  
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 px-6">
  
          {items.map((item, i) => (
            <div
              key={i}
              className="bg-white p-8 shadow-sm hover:shadow-xl transition rounded"
            >
              <div className="star-rating mb-3">★★★★★</div>
              <p>{item}</p>
            </div>
          ))}
  
        </div>
  
      </section>
    );
  }