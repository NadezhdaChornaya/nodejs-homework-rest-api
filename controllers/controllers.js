const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../model/index')

const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await listContacts(req.user.id, req.query)
        res.json({
            status: 'success',
            code: 200,
            data: contacts,
        })
    } catch (err) {
        next(err)
    }
}

const getContactId = async (req, res, next) => {
    const { contactId } = req.params
    const userId = req.user.id
    try {
        const contact = await getContactById(userId, contactId)

        if (contact) {
            return res.json({
                status: 'success',
                code: 200,
                data: contact,
            })
        } else {
            return res.status(404).json({
                status: 'error',
                code: 404,
                message: 'Not found contact',
                data: 'Not found'
            })
        }
    } catch (err) {
        next(err)
    }
}

const addContactOne = async (req, res, next) => {
    const { name, email, phone } = req.body
    const userId = req.user.id

    const err = (field) => {
        const error = {
            status: 'error',
            code: 400,
            message: `missing required ${field} field`,
            data: 'Not found'
        }
        return error
    }
    try {
        if (!name) {
            return res.status(400).json(err('name'))
        } else if (!email) {
            return res.status(400).json(err('email'))
        } else if (!phone) {
            return res.status(400).json(err('phone'))
        } else {
            const newContact = await addContact(req.body, userId)
            return res.json({
                status: 'success',
                code: 201,
                data: newContact,
            })
        }
    } catch (err) {
        next(err)
    }
}

const deleteContact = async (req, res, next) => {
    const { contactId } = req.params
    const userId = req.user.id
    try {
        const contact = await removeContact(userId, contactId)
        if (contact) {
            return res.json({
                status: 'success',
                code: 200,
                message: 'contact deleted',
                data: contact,
            })
        } else {
            return res.status(400).json({
                status: 'error',
                code: 404,
                message: 'Not found',
                data: 'Not found'
            })
        }
    } catch (err) {
        next(err)
    }
}

const updateContactOne = async (req, res, next) => {
    const { contactId } = req.params
    const userId = req.user.id
    try {
        if (!req.body) {
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: 'missing fields',
                data: 'Not found'
            })
        } else {
            const updatedContact = await updateContact(userId, contactId, req.body)
            if (updatedContact) {
                return res.json({
                    status: 'success',
                    code: 200,
                    data: updatedContact,
                })
            } else {
                return res.status(400).json({
                    status: 'error',
                    code: 400,
                    message: 'Not found',
                    data: 'Not found'
                })
            }
        }
    } catch (err) {
        next(err)
    }
}

module.exports = { getAllContacts, getContactId, addContactOne, deleteContact, updateContactOne }
