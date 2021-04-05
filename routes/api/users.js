const express = require('express')
const router = express.Router()
const usersController = require('../../controllers/usersControllers')
const guard = require('../../helpers/guard')
const { userValidate } = require('../../helpers/validation/validate')

router.post('/auth/register', userValidate, usersController.reg)

router.post('/auth/login', userValidate, usersController.login)

router.post('/auth/logout', guard, usersController.logout)

router.get('/current', guard, usersController.current)

router.patch('/', guard, usersController.patch)

module.exports = router
