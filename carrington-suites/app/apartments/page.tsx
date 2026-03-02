const apartments = [
    {
      name: "3 Bedroom Executive Suite",
      price: "₦300,000 / Night",
    },
    {
      name: "3 Bedroom Premium Suite",
      price: "₦600,000 / Night",
    },
  ];
  
  export default function Apartments() {
    return (
      <div className="p-10">
        <h1 className="text-4xl mb-6">
          Our Apartments
        </h1>
  
        {apartments.map((apt, index) => (
          <div key={index} className="border p-5 mb-4">
            <h2>{apt.name}</h2>
            <p>{apt.price}</p>
          </div>
        ))}
      </div>
    );
  }