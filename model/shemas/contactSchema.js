const mongoose = require('mongoose')
const { Schema, SchemaTypes } = mongoose
const mongoosePaginate = require('mongoose-paginate-v2')

const contactSchema = new Schema(
    {
        name: { type: String, required: [true, 'Name is required'] },
        email: { type: String, required: [true, 'Email is required'], unique: true, },
        phone: { type: String, required: [true, 'Phone is required'] },
        owner: {
            type: SchemaTypes.ObjectId,
            ref: 'user',
        },
        subscription: { type: String },
        password: {
            type: String,
            required: true,
        },
        token: { type: String },
    },
    { versionKey: false, timestamps: true }
)
contactSchema.plugin(mongoosePaginate)
// eslint-disable-next-line no-undef
const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact
