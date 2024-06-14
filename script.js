require('dotenv').config();
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


// Step 1: gathering active users
// step 2: sending for new sign-ups
// step 3: promotional sending




const msg = {
  to: 'cwhite@paqinc.com', // Change to your recipient
  from: 'dev.kthines@gmail.com', // Change to your verified sender
  subject: '(TESTING)Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}

sgMail
  .send(msg)
  .then((response) => {
    console.log(response[0].statusCode)
    console.log(response[0].headers)
  })
  .catch((error) => {
    console.error(error)
  })
