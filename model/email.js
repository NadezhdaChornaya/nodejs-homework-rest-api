const sgMail = require('@sendgrid/mail')

require('dotenv').config()

const { SENDGRID_API_KEY } = process.env
sgMail.setApiKey(SENDGRID_API_KEY)

const msg = {
    to: email,
    from: 'nadezhdachornaya188@gmail.com',
    subject: 'Sending with SendGrid is Fun',
    text: 'Hello! We are testing email seding'
    html: '<strong>Hello! We are testing email seding</strong>',
}

sgMail.send(msg)
    .then(() => console.log('Email sent'))
    .catch(error => console.log(error))