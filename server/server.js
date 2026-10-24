
import express from "express";

const app = express();
app.use(express.json());


const workshops = {
  "web-dev": { seats: 30 },
  "ui-ux": { seats: 25 },
  "git-github": { seats: 20 },
};


const registrations = [];

app.get("/api/health", (req, res) => {
  res.json({ status: "Backend running" });
});

app.post("/api/workshops/:id/register", (req, res) => {
  const { name, email } = req.body;
  const workshop = workshops[req.params.id];

  if (!workshop) {
    return res.status(404).json({ message: "Workshop not found" });
  }

  if (!name?.trim() || !email?.trim()) {
    return res.status(400).json({
      message: "Name and email are required",
    });
  }

  if (workshop.seats <= 0) {
    return res.status(400).json({ message: "Workshop is full" });
  }

  const registration = {
    id: registrations.length + 1,
    workshopId: req.params.id,
    name: name.trim(),
    email: email.trim(),
  };

  registrations.push(registration);
  workshop.seats--;

  res.status(201).json({
    success: true,
    message: "Registration successful!",
    registration,
    seatsRemaining: workshop.seats,
  });
});

app.listen(3001, () => {
  console.log("Backend running at http://localhost:3001");
});
