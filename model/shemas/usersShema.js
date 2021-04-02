const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { Schema } = mongoose
const SALT_WORK_FACTOR = 6

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            validate(value) {
                const regex = /\S+@\S+\.\S+/
                return regex.test(String(value).toLowerCase())
            },
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        subscription: {
            type: String,
            enum: ['free', 'pro', 'premium'],
            default: 'free'
        },
        token: {
            type: String,
            default: null,
        },
    },
    { versionKey: false, timestamps: true }
)

userSchema.methods.setPassword = (password) => {
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(6))
}

userSchema.methods.validPassword = (password) => {
    return bcrypt.compareSync(password, this.password)
}

const User = mongoose.model('user', userSchema)

module.exports = User
