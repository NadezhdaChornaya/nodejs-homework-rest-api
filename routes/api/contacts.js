const express = require('express')
const router = express.Router()
const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../../model/index')

router.get('/', async (req, res, next) => {
  // res.send('<h1>Hello</h1>')
  try {
    const contacts = await listContacts()
    res.json({
      status: 'success',
      code: 200,
      data: contacts,
    })
  } catch (err) {
    next(err)
  }
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  try {
    const contact = await getContactById(contactId)

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
})

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body
  try {
    if (!name || !email || !phone) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'missing required name field',
        data: 'Not found'
      })
    } else {
      const newContact = await addContact(req.body)
      return res.json({
        status: 'success',
        code: 201,
        data: newContact,
      })
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  try {
    const contact = await removeContact(contactId)
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
        code: 400,
        message: 'Not found',
        data: 'Not found'
      })
    }
  } catch (err) {
    next(err)
  }
  res.json({ message: 'template message' })
})

router.patch('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  try {
    if (!req.body) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'missing fields',
        data: 'Not found'
      })
    } else {
      const updatedContact = await updateContact(contactId, req.body)
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
})

module.exports = router
