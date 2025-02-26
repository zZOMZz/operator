const mockData = {
  departure: {
    location: "PGF, France",
    time: "18:15",
    date: "Wed, 26 Feb",
  },
  arrival: {
    location: "BER, Germany",
    time: "10:50",
    date: "Thu, 27 Feb",
  },
  returnDeparture: {
    location: "BER, Germany",
    time: "17:00",
    date: "Wed, 05 Mar",
  },
  returnArrival: {
    location: "PGF, France",
    time: "17:30",
    date: "Thu, 06 Mar",
  },
  travelTime: "16h 35m",
  returnTravelTime: "24h 30m",
  stops: 1,
  price: 347,
  currency: "$",
  airline: "Transavia",
  agencies: [
    { name: "Mytrip", price: 384 },
    { name: "Gotogate", price: 384 },
  ],
};

const TicketCard = () => {
  return (
    <div className="w-[1000px] mx-auto border rounded-lg shadow-md bg-white grid grid-cols-[7fr_3fr]">
      {/* Left column */}
      <div className="p-4 space-y-3">
        {/* First flight details */}
        <div className="border-b pb-3">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-600">{mockData.departure.location}</p>
              <p className="text-xl font-bold">{mockData.departure.time}</p>
              <p className="text-gray-500">{mockData.departure.date}</p>
            </div>
            <div className="text-center">
              <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-md">
                {mockData.stops} stop
              </span>
              <p className="text-gray-600">Travel time: {mockData.travelTime}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-600">{mockData.arrival.location}</p>
              <p className="text-xl font-bold">{mockData.arrival.time}</p>
              <p className="text-gray-500">{mockData.arrival.date}</p>
            </div>
          </div>
        </div>
        {/* Return flight details */}
        <div className="border-b pb-3">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-600">{mockData.returnDeparture.location}</p>
              <p className="text-xl font-bold">{mockData.returnDeparture.time}</p>
              <p className="text-gray-500">{mockData.returnDeparture.date}</p>
            </div>
            <div className="text-center">
              <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-md">
                {mockData.stops} stop
              </span>
              <p className="text-gray-600">Travel time: {mockData.returnTravelTime}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-600">{mockData.returnArrival.location}</p>
              <p className="text-xl font-bold">{mockData.returnArrival.time}</p>
              <p className="text-gray-500">{mockData.returnArrival.date}</p>
            </div>
          </div>
        </div>
        {/* Agency pricing */}
        <div className="bg-gray-100 p-3 rounded-lg">
          {mockData.agencies.map((agency, index) => (
            <div key={index} className="flex justify-between py-1">
              <span className="font-semibold">{agency.name}</span>
              <span>{mockData.currency}{agency.price}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Right column */}
      <div className="flex flex-col items-center justify-center p-4 border-l">
        <p className="text-2xl font-bold">{mockData.currency}{mockData.price} <span className="text-sm">/person</span></p>
        <p className="text-green-600 font-semibold mb-2">{mockData.airline}</p>
        <button
          className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-md font-semibold"
          onClick={(() => {console.log('View deal');})}
        >
          View deal
        </button>
      </div>
    </div>
  );
};

export default TicketCard;
