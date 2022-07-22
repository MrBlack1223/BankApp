const express = require('express')
const router = express.Router()

const loginController = require('../controlers/loginController')

router.get('/',checkNotAuthenticated,loginController.login)
router.post('/',loginController.loginAuth)

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }

module.exports = router;