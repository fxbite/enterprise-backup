const router = require('express').Router()
const viewController = require('../app/controllers/ViewControllers')

router.post('/create', viewController.createNewView)

module.exports = router