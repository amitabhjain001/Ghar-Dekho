const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 5000;
const DATA_FILE = path.join(__dirname, 'data', 'properties.json');

app.use(cors());
app.use(bodyParser.json());

// Helper to read data
const readData = async () => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

// Helper to write data
const writeData = async (data) => {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
};

// GET /api/properties
app.get('/api/properties', async (req, res) => {
    try {
        const properties = await readData();
        res.json(properties);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch properties' });
    }
});

// POST /api/properties
app.post('/api/properties', async (req, res) => {
    try {
        const newProperty = { ...req.body, id: Date.now() };
        const properties = await readData();
        properties.push(newProperty);
        await writeData(properties);
        res.status(201).json(newProperty);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add property' });
    }
});

// POST /api/book
app.post('/api/book', async (req, res) => {
    const { propertyId, propertyTitle, name, email, date, message } = req.body;

    // Create Transporter (Mock for now, replace with real credentials)
    // To use Gmail:
    // 1. Enable 2-Step Verification
    // 2. Generate App Password
    // 3. Use user: 'your-email@gmail.com', pass: 'your-app-password'
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'amitabhjain001@gmail.com', // User provided email
            pass: 'kibpdosqoeemkocu' // App Password
        }
    });

    const mailOptions = {
        from: 'amitabhjain001@gmail.com',
        to: email, // Send to the user who booked
        subject: `Booking Confirmation: ${propertyTitle}`,
        text: `
      Hi ${name},

      Your booking for ${propertyTitle} on ${date} has been received!
      
      Message: ${message}

      We will contact you shortly to confirm the details.

      Best,
      Ghar Dekho Team
    `
    };

    try {
        // Log for debugging
        console.log('--- SENDING EMAIL ---');
        console.log(`To: ${email}`);

        // Send actual email
        await transporter.sendMail(mailOptions);
        console.log('--- EMAIL SENT SUCCESSFULLY ---');

        res.json({ success: true, message: 'Booking request received' });
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
