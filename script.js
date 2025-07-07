const flights = [
  { id: 1, from: "New York", to: "London", date: "2025-07-20", totalSeats: 10, bookedSeats: [] },
  { id: 2, from: "Paris", to: "Tokyo", date: "2025-07-21", totalSeats: 8, bookedSeats: [] },
];

// Show available flights
function loadFlights() {
  const flightsDiv = document.getElementById('flights');
  flightsDiv.innerHTML = '<h2>Select a Flight</h2>';
  flights.forEach(f => {
    const availableSeats = f.totalSeats - f.bookedSeats.length;
    flightsDiv.innerHTML += `
      <div class="card">
        <b>${f.from} → ${f.to}</b><br>
        Date: ${f.date} <br>
        Seats Available: ${availableSeats}<br>
        <button onclick="showBookingForm(${f.id})" ${availableSeats === 0 ? "disabled" : ""}>Book</button>
      </div>
    `;
  });
}

window.showBookingForm = function(flightId) {
  const flight = flights.find(f => f.id === flightId);
  if (!flight) return;
  const availableSeats = [];
  for (let i = 1; i <= flight.totalSeats; i++) {
    if (!flight.bookedSeats.includes(i)) availableSeats.push(i);
  }
  document.getElementById('booking').innerHTML = `
    <h2>Book Your Seat</h2>
    <form onsubmit="bookSeat(event,${flightId})">
      Your Name: <input type="text" id="name" required><br>
      Seat Number: 
      <select id="seat" required>
        ${availableSeats.map(seat => `<option value="${seat}">${seat}</option>`).join('')}
      </select><br>
      <button type="submit">Book</button>
    </form>
  `;
}

window.bookSeat = function(e, flightId) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const seat = parseInt(document.getElementById('seat').value);
  const flight = flights.find(f => f.id === flightId);
  if (!flight) return;
  if (flight.bookedSeats.includes(seat)) {
    alert("Sorry, seat already booked.");
    return;
  }
  flight.bookedSeats.push(seat);
  document.getElementById('booking').innerHTML = `
    <h2>Booking Confirmed!</h2>
    <p>Thank you, ${name}. Your seat (${seat}) is booked on flight from ${flight.from} to ${flight.to} on ${flight.date}.</p>
    <button onclick="loadFlights();document.getElementById('booking').innerHTML=''">Book Another</button>
  `;
  loadFlights();
}

loadFlights();
