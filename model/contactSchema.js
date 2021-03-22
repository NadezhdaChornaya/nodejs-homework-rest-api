const mongoose = require('mongoose')
const { Schema } = mongoose

const contactSchema = new Schema(
    {
        name: { type: String, required: [true, 'Name is required'] },
        email: { type: String, required: [true, 'Email is required'] },
        phone: { type: String, required: [true, 'Phone is required'] },
        subscription: { type: String },
        password: {},
        token: { type: String },
    },
    { versionKey: false, timestamps: true }
)

// eslint-disable-next-line no-undef
const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact
