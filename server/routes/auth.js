import express from 'express'
const router= express.Router();
const {registerUser, loginUser, logoutUser} = require("../controllers/auth")

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)

module.exports= router;