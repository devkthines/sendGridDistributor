const fs = require('fs');
const path = require('path');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Function to send email with image attachment
function sendEmailWithImageAttachment(email, imagePath) {
    const msg = {
        to: email,
        from: 'your@example.com',
        subject: 'New Image Added',
        text: 'A new image has been added!',
        attachments: [
            {
                path: imagePath,
            },
        ],
    };
    sgMail.send(msg)
        .then(() => console.log('Email sent successfully!'))
        .catch(error => console.error('Error sending email:', error));
}

// Example usage:
const userEmail = 'recipient@example.com';
const imageFilePath = '/path/to/image.jpg'; // Path to your image file
sendEmailWithImageAttachment(userEmail, imageFilePath);
