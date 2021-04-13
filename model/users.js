const User = require('./shema/user')
// =========================================================
// const EmailService = require("./emailSrvs")
// const { ErrorHandler } = require("../helpers/errorHandler")
// const dotenv = require('dotenv')
// dotenv.config()
// const { SENDGRID_API_KEY } = process.env
// const emailService = new EmailService(process.env.SENDGRID_API_KEY)

const verifyServ = async ({ token }) => {
    const user = await User.findOne({
        verifyToken: token,
    })
    if (user) {
        await user.updateOne({ isVerify: true, verifyToken: null })
        return true
    }
    return false
}
// =========================================================
const findUserById = async (id) => {
    const userById = await User.findById(id)
    return userById
}

const findUserByEmail = async (email) => {
    const userByEmail = await User.findOne(email)
    return userByEmail
}

const addUser = async (body) => {
    const newUser = await new User(body).save()
    return newUser
}

const updateToken = async (id, token) => {
    const newToken = await User.updateOne({ _id: id }, { token })
    return newToken
}
// ===========================================
const patchSub = async (id, sub) => {
    const user = await User.findByIdAndUpdate(id, { subscription: sub }, { new: true })
    return user
}

const patchAvatar = async (id, avatar) => {
    const user = await User.findByIdAndUpdate(id, { avatarURL: avatar }, { new: true })
    return user
}
// ============================================
const findByVerifyToken = async (verifyToken) => {
    return await User.findOne({ verifyToken })
}

const updateVerifyToken = async (id, verify, verifyToken) => {
    return await User.findByIdAndUpdate(id, { verify, verifyToken })
}
// ============================================

module.exports = {
    findUserById,
    findUserByEmail,
    addUser,
    updateToken,
    patchSub,
    patchAvatar,
    findByVerifyToken,
    updateVerifyToken
}