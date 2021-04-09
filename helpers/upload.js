const path = require('path')
const dotenv = require('dotenv')
dotenv.config()

const multer = require('multer')

const { UPLOAD_DIR } = process.env

const tempDirectory = path.join(process.cwd(), UPLOAD_DIR)

const uploadOptions = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, tempDirectory)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
    limits: {
        fileSize: 1200000,
    },
})

const upload = multer({
    storage: uploadOptions,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.includes('image')) {
            cb(null, true)
            return
        }
        cb(null, false)
    },
});

module.exports = upload