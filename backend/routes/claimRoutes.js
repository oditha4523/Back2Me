const express = require('express');
const router = express.Router();
const Twilio = require('twilio');
const ItemModel = require('../models/itemModel');

// Load Twilio credentials from .env
const { TWILIO_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE, NODE_ENV } = process.env;

let twilioClient = null;
if (TWILIO_SID && TWILIO_AUTH_TOKEN) {
    twilioClient = new Twilio(TWILIO_SID, TWILIO_AUTH_TOKEN);
} else {
    console.warn('Twilio credentials are missing in .env! SMS will not be sent.');
}

// POST /claim/submit-answer
router.post('/submit-answer', async (req, res) => {
    try {
        const { itemId, answer } = req.body;

        if (!itemId || !answer) {
            return res.status(400).json({ success: false, error: 'itemId and answer are required' });
        }

        const item = await ItemModel.findById(itemId);
        if (!item) return res.status(404).json({ success: false, error: 'Item not found' });

        if (!item.reporter || !item.reporter.phone) {
            return res.status(400).json({ success: false, error: 'Reporter phone number not found for this item.' });
        }

        // Ensure the number is in E.164 format (required by Twilio)
        let toNumber = item.reporter.phone;
        console.log('Original phone from DB:', toNumber);
        if (toNumber.startsWith('0')) {
            toNumber = '+94' + toNumber.slice(1); // Sri Lanka country code
        }
        console.log('Formatted phone to send to Twilio:', toNumber);

        // Development/testing: log the message instead of sending
        if (NODE_ENV === 'development' || !twilioClient || !TWILIO_PHONE) {
            console.log(`\n[DEV MODE] SMS Preview\n--------------------------\nTo: ${toNumber}\nItem: "${item.name}"\nQuestion: "${item.verifyInfo}"\nAnswer: "${answer}"\n--------------------------\n`);
            return res.json({
                success: true,
                message: `Answer for "${item.name}" submitted successfully. (SMS previewed in development mode)`
            });
        }

        // Production: send SMS via Twilio
        await twilioClient.messages.create({
            body: `Hello! Someone answered your verification question for "${item.name}".\nQuestion: "${item.verifyInfo}"\nAnswer: "${answer}"`,
            from: TWILIO_PHONE,
            to: toNumber
        });

        console.log(`SMS sent to ${toNumber} for item "${item.name}"`);


        res.json({ success: true, message: 'Answer sent to reporter!' });

    } catch (err) {
        console.error('Error in /submit-answer:', err);
        res.status(500).json({ success: false, error: err.message || 'Failed to send answer' });
    }
});

module.exports = router;
