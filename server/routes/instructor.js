import express from "express";

const router = express.Router();

import { requireSignin } from "../middleware";

// controllers
const {makeInstructor, getAccountStatus} = require("../controllers/instructor")
import {currentUser} from "../controllers/auth"

router.post('/make-instructor', requireSignin, makeInstructor)
router.post('/get-account-status', requireSignin, getAccountStatus)


module.exports= router;