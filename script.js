require('dotenv').config();
const fs = require('fs');
const path = require('path');
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


// Step 1: gathering active users
// step 2: sending for new sign-ups
// step 3: promotional sending




// const msg = {
//   to: 'cwhite@paqinc.com', // Change to your recipient
//   from: 'dev.kthines@gmail.com', // Change to your verified sender
//   subject: '(TESTING)Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }

// sgMail
//   .send(msg)
//   .then((response) => {
//     console.log(response[0].statusCode)
//     console.log(response[0].headers)
//   })
//   .catch((error) => {
//     console.error(error)
//   })
// Function to send email with image attachment

function sendEmailWithImageAttachment(email, imagePath) {
  // Read the content of the image file
  const imageContent = fs.readFileSync(imagePath, { encoding: 'base64' });
  const msg = {
    to: email,
    from: 'dev.kthines@gmail.com',
    subject: 'New Image Added',
    text: 'A new image has been added!',
    attachments: [
      {
        content: imageContent,
        filename: path.basename(imagePath), // Set filename
        type: 'image/jpeg', // Set appropriate MIME type
        disposition: 'attachment', // Set as attachment
      },
    ],
  };
  sgMail.send(msg)
    .then(() => console.log('Email sent successfully!'))
    .catch(error => console.error('Error sending email:', error));
}

// Example usage:
const userEmail = 'sblack@paqinc.com';
const imageFilePath = 'assets/images/Screenshot 2024-06-07 075604.png'; // Path to your image file
sendEmailWithImageAttachment(userEmail, imageFilePath);