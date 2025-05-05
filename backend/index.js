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

// Definiujemy dozwolone pochodzenia (origins)
const allowedOrigins = [
  'https://product-code-generator-v2-frontend.vercel.app', 
  'http://localhost:5173'
];

// Konfiguracja CORS
app.use(cors({
  origin: function(origin, callback) {
    // Zezwalaj na żądania bez origin (np. z Postman lub bezpośrednich żądań fetch)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Obsługa preflight requests
app.options('*', cors());

app.use(bodyParser.json()); // Pozwala na odbieranie JSON w ciele żądania

// USUNIĘTO dodatkowe middleware dla nagłówków CORS, które powodowało konflikt

app.use(express.static(path.join(__dirname, "/frontend/dist")));

// Specyficzna obsługa OPTIONS dla endpointu submit
app.options('/submit', cors());


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

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Uruchomienie serwera
app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});