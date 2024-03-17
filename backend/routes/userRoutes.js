const express = require('express')
const {registerUser,authUser,getProfile, logout,allUser} = require("../controller/userController")
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()

// two different tarika
router.route('/').post(registerUser).get(protect,allUser)
// Without middleware token usi fucntion me use karna padedga
// router.route('/').post(registerUser).get(allUser)
// router.route('/').get(allUsers)
router.post('/login',authUser)
router.get('/profile',getProfile)
router.post('/logout',logout)

module.exports = router