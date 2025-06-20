// // // BACKEND LOCALHOST

// import dotenv from 'dotenv';
// dotenv.config();
// import express from "express";
// import cors from "cors";
// import bodyParser from "body-parser";
// import fetch from "node-fetch";
// import path from "path";
// import * as deepl from 'deepl-node';
// import { splitHtml } from './splitHtml.js';


// const authKey = process.env.DEEPL_AUTH_KEY;
// const translator = new deepl.Translator(authKey);
// const __dirname = path.resolve();
// const app = express();
// const port = process.env.PORT || 3000;

// // Definiujemy dozwolone pochodzenia (origins)
// const allowedOrigins = [
//   'https://product-code-generator-v2-frontend.vercel.app', 
//   'http://localhost:5173'
// ];

// // Konfiguracja CORS
// app.use(cors({
//   origin: function(origin, callback) {
//     // Zezwalaj na żądania bez origin (np. z Postman lub bezpośrednich żądań fetch)
//     if (!origin) return callback(null, true);
    
//     if (allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// // Obsługa preflight requests
// app.options('*', cors());

// app.use(bodyParser.json()); // Pozwala na odbieranie JSON w ciele żądania

// // USUNIĘTO dodatkowe middleware dla nagłówków CORS, które powodowało konflikt

// app.use(express.static(path.join(__dirname, "/frontend/dist")));

// // Specyficzna obsługa OPTIONS dla endpointu submit
// app.options('/submit', cors());


// // Endpoint do przesyłania danych do tłumaczenia DeepL
// app.post("/translate", async (req, res) => {
//   try {
//     const { text, targetLang } = req.body;

//     if (!text || !targetLang) {
//       return res.status(400).json({ status: "error", message: "Brak tekstu lub języka docelowego" });
//     }

//     const result = await translator.translateText(text, null, targetLang);

//     res.json({ translatedText: result.text });
//   } catch (error) {
//     console.error("DeepL Translation Error:", error);
//     res.status(500).json({ status: "error", message: "Błąd tłumaczenia" });
//   }
// });

// app.post("/submit", async (req, res) => {
//   try {
//     const data = req.body;
//     const { target } = data;

//     console.log("Received data for:", target);

//     let scriptUrl;

//     switch (target) {
//       case "baselinker":
//         scriptUrl = "https://script.google.com/macros/s/AKfycbwjUP2ECcn5Jjo5yjIwWUEvz0Ivj9alyy8QUr4RjDko1sRKIOroYS4WSxwP9Z7MOlIqyg/exec";
//         break;
//       case "ebay-de":
//         scriptUrl = "https://script.google.com/macros/s/AKfycbz5j-Z9732r3ZseaG8eN9MprsbE4E59f8tRIVnJzerlD2qkdiUCf1WAVjMBMy1gwONn/exec";
//         break;
//       case "ebay-en":
//         scriptUrl = "https://script.google.com/macros/s/AKfycbxfENaLTzO8F6Ceh5A_2BmfRpP3v5q4sfpNXEw7oZzVAMwZO5FAhmjKYvr6tYIKtWfP/exec";
//         break;
//       case "ebay-fr":
//         scriptUrl = "https://script.google.com/macros/s/AKfycbztzGZDycgRWOSpruN8Vtq3deUc7YqHrwMAr07hZW4Fd0fPV7wXJJza2-uvKL3QPv6f/exec";
//         break;
//       case "ebay-it":
//         scriptUrl = "https://script.google.com/macros/s/AKfycby6GtBmtdMeMmp8vjfCyWEkItA6kffDZeXnjrMq4NkQpBkwwzrEPGz-dTTtYI4n_FoY1A/exec";
//         break;
//       default:
//         return res.status(400).json({ status: "error", message: "Nieznany typ celu (target)" });
//     }

//     const response = await fetch(scriptUrl, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     });

//     const result = await response.json();
//     res.json(result);
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ status: "error", message: "Coś poszło nie tak" });
//   }
// });

// // SPLIT HTML START

// app.post("/split-html", (req, res) => {
//   try {
//     const { html } = req.body;

//     if (!html) {
//       return res.status(400).json({ error: "Brak danych HTML" });
//     }

//     const result = splitHtml(html);
//     res.json(result);
//   } catch (error) {
//     console.error("Błąd splitHtml:", error);
//     res.status(500).json({ error: "Wewnętrzny błąd serwera" });
//   }
// });

// // SPLIT HTML FINISH

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
// });

// // Uruchomienie serwera
// app.listen(port, () => {
//   console.log(`Server listening on port ${port}!`);
// });

// BACKEND RENDER.COM

import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import path from "path";
import * as deepl from 'deepl-node';
import { splitHtml } from './splitHtml.js';

const authKey = process.env.DEEPL_AUTH_KEY;
const translator = new deepl.Translator(authKey);
const __dirname = path.resolve();
const app = express();
const port = process.env.PORT || 3000;

// Skonfigurowany CORS, aby zezwalać na żądania z frontendu na Vercel
app.use(cors({
  origin: ['https://product-code-generator-v2-frontend.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Obsługa preflight requests
app.options('*', cors());

app.use(bodyParser.json()); // Pozwala na odbieranie JSON w ciele żądania

// Dodatkowe middleware dla nagłówków CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://product-code-generator-v2-frontend.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

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
        scriptUrl = "https://script.google.com/macros/s/AKfycbwjUP2ECcn5Jjo5yjIwWUEvz0Ivj9alyy8QUr4RjDko1sRKIOroYS4WSxwP9Z7MOlIqyg/exec";
        break;
      case "ebay-de":
        scriptUrl = "https://script.google.com/macros/s/AKfycbz5j-Z9732r3ZseaG8eN9MprsbE4E59f8tRIVnJzerlD2qkdiUCf1WAVjMBMy1gwONn/exec";
        break;
      case "ebay-en":
        scriptUrl = "https://script.google.com/macros/s/AKfycbxfENaLTzO8F6Ceh5A_2BmfRpP3v5q4sfpNXEw7oZzVAMwZO5FAhmjKYvr6tYIKtWfP/exec";
        break;
      case "ebay-fr":
        scriptUrl = "https://script.google.com/macros/s/AKfycbztzGZDycgRWOSpruN8Vtq3deUc7YqHrwMAr07hZW4Fd0fPV7wXJJza2-uvKL3QPv6f/exec";
        break;
      case "ebay-it":
        scriptUrl = "https://script.google.com/macros/s/AKfycby6GtBmtdMeMmp8vjfCyWEkItA6kffDZeXnjrMq4NkQpBkwwzrEPGz-dTTtYI4n_FoY1A/exec";
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

// SPLIT HTML START

app.post("/split-html", (req, res) => {
  try {
    const { html } = req.body;

    if (!html) {
      return res.status(400).json({ error: "Brak danych HTML" });
    }

    const result = splitHtml(html);
    res.json(result);
  } catch (error) {
    console.error("Błąd splitHtml:", error);
    res.status(500).json({ error: "Wewnętrzny błąd serwera" });
  }
});

// SPLIT HTML FINISH

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Uruchomienie serwera
app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});