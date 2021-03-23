const express = require('express')
const router = express.Router()
const controller = require('../../controllers/controllers')

router.get('/', controller.getAllContacts)

router.get('/:contactId', controller.getContactId)

router.post('/', controller.addContactOne)

router.delete('/:contactId', controller.deleteContact)

router.patch('/:contactId', controller.updateContactOne)

module.exports = router
