import express from 'express';
import cors from 'cors';
import emailRouter from './email.js';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000', // Assurez-vous que le frontend est bien sur ce port
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

app.use('/api', emailRouter);  // Le chemin de l'API est "/api/send-email"

app.listen(5000, () => {
  console.log('Backend démarré sur http://localhost:5000');
});
