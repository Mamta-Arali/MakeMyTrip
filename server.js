const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

/* Dummy Database */

let users = [
  { id: "U1", email: "user@gmail.com", password: "123456" }
];

let flights = [
  {
    flightId: "F101",
    airline: "Indigo",
    source: "Mumbai",
    destination: "Delhi",
    departure: "10:00",
    arrival: "12:00",
    price: 4500
  },
  {
    flightId: "F102",
    airline: "Air India",
    source: "Mumbai",
    destination: "Delhi",
    departure: "14:00",
    arrival: "16:00",
    price: 5200
  }
];

let bookings = [];



/* 1️⃣ User Login API */

app.post("/api/login", (req, res) => {

  const { email, password } = req.body;

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (user) {
    res.json({
      status: "success",
      userId: user.id,
      token: "abc123xyz"
    });
  } else {
    res.json({
      status: "failed",
      message: "Invalid credentials"
    });
  }

});



/* 2️⃣ Search Flights API */

app.get("/api/search", (req, res) => {

  const { source, destination } = req.query;

  const result = flights.filter(
    f => f.source === source && f.destination === destination
  );

  res.json({
    flights: result
  });

});



/* 3️⃣ Get Flight Details API */

app.get("/api/flight/:flightId", (req, res) => {

  const flightId = req.params.flightId;

  const flight = flights.find(f => f.flightId === flightId);

  if (flight) {
    res.json(flight);
  } else {
    res.json({
      message: "Flight not found"
    });
  }

});



/* 4️⃣ Booking API */

app.post("/api/book", (req, res) => {

  const { userId, flightId, passengerName, email, phone } = req.body;

  const bookingId = "B" + Math.floor(Math.random() * 10000);

  const booking = {
    bookingId,
    userId,
    flightId,
    passengerName,
    email,
    phone,
    status: "Booking Created"
  };

  bookings.push(booking);

  res.json({
    bookingId: bookingId,
    status: "Booking Created"
  });

});



/* 5️⃣ Payment API */

app.post("/api/payment", (req, res) => {

  const { bookingId, paymentMethod, amount } = req.body;

  res.json({
    paymentStatus: "Success",
    transactionId: "TX" + Math.floor(Math.random() * 10000)
  });

});



/* 6️⃣ Confirmation API */

app.get("/api/confirmation/:bookingId", (req, res) => {

  const bookingId = req.params.bookingId;

  const booking = bookings.find(b => b.bookingId === bookingId);

  if (booking) {
    res.json({
      bookingId: bookingId,
      status: "Confirmed",
      ticketNumber: "TK" + Math.floor(Math.random() * 10000)
    });
  } else {
    res.json({
      message: "Booking not found"
    });
  }

});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});