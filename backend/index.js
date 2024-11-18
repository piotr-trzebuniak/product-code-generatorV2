const express = require("express");
const path = require("path");
const app = express();

// Obsługa statycznych plików React
app.use(express.static(path.join(__dirname, "build")));

// Endpoint API
app.get("/api/example", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

// Obsługa frontendu React
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});