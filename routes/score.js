const {Router} = require('express')
const router = Router()


const {storeScore,getScore} = require('../controllers/score')

router.route('/score').post(storeScore).get(getScore)






module.exports = router