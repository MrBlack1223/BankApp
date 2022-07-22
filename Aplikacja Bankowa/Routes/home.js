const express = require('express')
const router = express.Router()

const pagesController = require('../controlers/pagesController')

router.get('/',checkAuthenticated, pagesController.home)
router.delete('/logout',checkAuthenticated,pagesController.logout)
router.get('/withdraw',checkAuthenticated,pagesController.withdraw)
router.post('/withdraw',checkAuthenticated,pagesController.withdrawPost)
router.get('/transfer',checkAuthenticated,pagesController.transactions)
router.post('/transfer',checkAuthenticated,pagesController.transactionsPost)
router.get('/deposit',checkAuthenticated,pagesController.depositView)
router.post('/deposit',checkAuthenticated,pagesController.deposit)



function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/login')
  }

module.exports = router;