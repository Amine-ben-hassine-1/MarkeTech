import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

// Configuration de nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ba4730899@gmail.com',
    pass: 'htxk jnsi fnkc yfgn', // Clé d'application Gmail
  },
  tls: {
    rejectUnauthorized: false, // Désactive la vérification SSL
  },
});

router.post('/send-email', async (req, res) => { // Le chemin est /send-email
  try {
    const { userEmail } = req.body;

    const htmlContent = `
      <html>
        <head>
          <style>
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">
              <h1>MarktTech</h1>
            </div>
            <div class="email-body">
              <p>Bonjour,</p>
              <p>Nous avons le plaisir de vous informer que votre paiement a été confirmé avec succès.</p>
            </div>
            <div class="email-footer">
              <p>Merci pour votre confiance !</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const mailOptions = {
      from: 'MarketTech <ba4730899@gmail.com>',
      to: userEmail,
      subject: 'Confirmation de paiement',
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email envoyé avec succès.' });
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email.' });
  }
});

export default router;
