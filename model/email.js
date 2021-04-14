const sgMail = require('@sendgrid/mail')
const Mailgen = require('mailgen')
require('dotenv').config()

const { SENDGRID_API_KEY, EMAIL_SENDER } = process.env

const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name: 'Developer of this server',
        link: 'https://localhost:3000/',
    },
})

const sendMail = async (verifyToken, email) => {
    sgMail.setApiKey(SENDGRID_API_KEY)

    const template = {
        body: {
            name: email,
            intro: 'Email verification needed',
            action: {
                instructions: 'To complete the registration process please press the button:',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Confirm email',
                    link: `http://localhost:3000/api/users/verify/${verifyToken}`,
                },
            },
            outro: "Need help, or have questions? Please figure it out yourselves, we can't be bothered to help you",
        },
    }

    const verificationMail = mailGenerator.generate(template)

    const msg = {
        to: email,
        from: EMAIL_SENDER,
        subject: 'Sending with SendGrid is Fun',
        text: 'Hello! We are testing email seding',
        html: verificationMail,
    }

    sgMail.send(msg)
        .then(() => console.log('Email sent'))
        .catch(error => console.log(error))
}

module.exports = sendMail