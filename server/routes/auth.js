import express from 'express'
const router= express.Router();
import {register} from '../controllers/auth.js'

router.get('/register', register)

module.exports= router;