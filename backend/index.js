import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import path from "path";

const __dirname = path.resolve();

const app = express();

const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Rozwiązuje problem CORS
app.use(bodyParser.json()); // Pozwala na odbieranie JSON w ciele żądania

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Endpoint do przesyłania danych do Google Apps Script
app.post("/submit", async (req, res) => {
  try {
    const data = req.body; // Pobierz dane przesłane z frontendu
    console.log("Received data:", data);

    // Wyślij dane do Google Apps Script
    const scriptUrl =
      "https://script.google.com/macros/s/AKfycbx2SkHGFVaNGz9iBxgeeANTsAUkPbgy_4n-MXGvXm55ED2C05CMWgjGNE1eR44WyQaqhw/exec";

    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("Response from Google Apps Script:", result);

    res.json(result); // Zwróć odpowiedź do aplikacji React
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: "error", message: "Something went wrong" });
  }
});

// Uruchom serwer
app.listen(port, () => {
  console.log("Server listening on port 3000!");
});
