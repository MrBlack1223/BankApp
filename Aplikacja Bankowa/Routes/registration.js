const express = require('express')
const router = express.Router()

const registrationController = require('../controlers/registrationController')

router.get('/',checkNotAuthenticated,registrationController.registration)
router.post('/',checkNotAuthenticated,registrationController.registrationPost)

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }

module.exports = router;