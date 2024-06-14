// 1. Set up a Node.js project
const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 2. Install necessary dependencies (`express`, `@sendgrid/mail`)
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// 3. Create routes for handling user sign-up and sending promotional emails
app.use(bodyParser.json());

app.post('/signup', (req, res) => {
    const { email } = req.body;
    // Code for user sign-up logic
    res.send('Signed up successfully!');
});

app.post('/send-promotion', (req, res) => {
    const { email, promotion } = req.body;
    const msg = {
        to: email,
        from: 'your@example.com', // your verified sender
        subject: 'New Promotion!',
        text: promotion,
    };
    sgMail.send(msg);
    res.send('Promotion sent successfully!');
});

// 4. Set up a periodic task scheduler to send promotional emails periodically
cron.schedule('0 0 * * 0', () => {
    // This runs every Sunday at midnight
    const promotion = 'Special promotion for this week! Check it out!';
    // Fetch user emails from database or wherever you store them
    const users = ['user1@example.com', 'user2@example.com']; // Dummy data
    users.forEach(user => {
        sgMail.send({
            to: user,
            from: 'your@example.com',
            subject: 'Weekly Promotion',
            text: promotion,
        });
    });
}, {
    timezone: 'America/New_York', // Set your timezone
});

// 5. Monitor a folder for new files and trigger sending emails based on the new files
const folderPath = '/path/to/folder'; // Path to the folder
fs.watch(folderPath, (eventType, filename) => {
    if (eventType === 'rename') {
        // New file added
        const fileFullPath = path.join(folderPath, filename);
        // Send email with attachment
        const msg = {
            to: 'recipient@example.com',
            from: 'your@example.com',
            subject: 'New File Added',
            text: 'A new file has been added!',
            attachments: [
                {
                    path: fileFullPath,
                },
            ],
        };
        sgMail.send(msg);
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
