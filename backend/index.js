import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import path from "path";
import * as deepl from 'deepl-node';

const authKey = "b886f845-d582-4aca-b09e-dd6c37b62744:fx";
const translator = new deepl.Translator(authKey);
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

// Endpoint do przesyłania danych do tłumaczenia DeepL

app.post("/translate", async (req, res) => {
  try {
    const { text, targetLang } = req.body;

    if (!text || !targetLang) {
      return res.status(400).json({ status: "error", message: "Brak tekstu lub języka docelowego" });
    }

    const result = await translator.translateText(text, null, targetLang);

    res.json({ translatedText: result.text });
  } catch (error) {
    console.error("DeepL Translation Error:", error);
    res.status(500).json({ status: "error", message: "Błąd tłumaczenia" });
  }
});


// Endpoint do przesyłania danych do Google Apps Script
// app.post("/submit", async (req, res) => {
//   try {
//     const data = req.body; // Pobierz dane przesłane z frontendu
//     console.log("Received data:", data);

//     // Wyślij dane do Google Apps Script
//     const scriptUrl =
//       "https://script.google.com/macros/s/AKfycbx2SkHGFVaNGz9iBxgeeANTsAUkPbgy_4n-MXGvXm55ED2C05CMWgjGNE1eR44WyQaqhw/exec";

//     const response = await fetch(scriptUrl, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     });

//     const result = await response.json();
//     console.log("Response from Google Apps Script:", result);

//     res.json(result); // Zwróć odpowiedź do aplikacji React
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ status: "error", message: "Something went wrong" });
//   }
// });

app.post("/submit", async (req, res) => {
  try {
    const data = req.body;
    const { target } = data;

    console.log("Received data for:", target);

    let scriptUrl;

    switch (target) {
      case "baselinker":
        scriptUrl = "https://script.google.com/macros/s/AKfycbx2SkHGFVaNGz9iBxgeeANTsAUkPbgy_4n-MXGvXm55ED2C05CMWgjGNE1eR44WyQaqhw/exec";
        break;
      case "ebay-de":
        scriptUrl = "https://script.google.com/macros/s/AKfycbyR624zWGnO4QRMrjx1-tPU9OyT4ZvVZqR2mdqCkEMt4jzi-_C-VrqbJvXnNu1TN23T/exec";
        break;
      case "ebay-en":
        scriptUrl = "https://script.google.com/macros/s/AKfycbzEyVf_K9wiWskoVDq51ZZOPeOcc5VhQdUU_rNWjytKx6_5JWoIwQqtm1Dt9IOBYQIH/exec";
        break;
      case "ebay-fr":
        scriptUrl = "https://script.google.com/macros/s/AKfycbybS-ERS-Q_RPyRqOYdQVyb3hpAg0-MU_EqH61f6jVc36rSLgYqQdplZ8s6kOewMwge/exec";
        break;
      case "ebay-it":
        scriptUrl = "https://script.google.com/macros/s/AKfycby9ZNMbPLMUMFFOjSxeIH4uujjME7zw67hqL3kGngujlMwP2y1F9dzavh9_nMga9cZTXQ/exec";
        break;
      default:
        return res.status(400).json({ status: "error", message: "Nieznany typ celu (target)" });
    }

    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    res.json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: "error", message: "Coś poszło nie tak" });
  }
});



// Uruchomienie serwer
app.listen(port, () => {
  console.log("Server listening on port 3000!");
});
