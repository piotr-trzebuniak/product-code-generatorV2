import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

const app = express();


const port = process.env.PORT || 3000

// Middleware
app.use(cors()); // Rozwiązuje problem CORS
app.use(bodyParser.json()); // Pozwala na odbieranie JSON w ciele żądania

// Endpoint do przesyłania danych do Google Apps Script
app.post('/submit', async (req, res) => {
  try {
    const data = req.body; // Pobierz dane przesłane z frontendu
    console.log('Received data:', data);

    // Wyślij dane do Google Apps Script
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbz2Cd3yG4DEumedadL7j_jl1MgR3E1tUx9Dz7l_Wa6DUSdpdv55ezD8abrZ14CuNTVr/exec';

    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log('Response from Google Apps Script:', result);

    res.json(result); // Zwróć odpowiedź do aplikacji React
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ status: 'error', message: 'Something went wrong' });
  }
});

// Uruchom serwer
app.listen(port, () => {
  console.log('Server listening on port 3000!');
});


