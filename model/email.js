const sgMail = require('@sendgrid/mail')

require('dotenv').config()

const { SENDGRID_API_KEY, EMAIL_SENDER } = process.env

const sendMail = async (verifyToken, email = 'nadezhdachornaya188@gmail.com') => {
    sgMail.setApiKey(SENDGRID_API_KEY)

    const msg = {
        to: email,
        from: EMAIL_SENDER,
        subject: 'Sending with SendGrid is Fun',
        text: 'Hello! We are testing email seding',
        html: '<strong>Hello! We are testing email seding</strong>',
    }

    sgMail.send(msg)
        .then(() => console.log('Email sent'))
        .catch(error => console.log(error))
}

module.exports = sendMail