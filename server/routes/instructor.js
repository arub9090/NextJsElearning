import express from "express";

const router = express.Router();

import { requireSignin } from "../middleware";

// controllers
const {makeInstructor, getAccountStatus, currentInstructor, instructorCourses} = require("../controllers/instructor")
import {currentUser} from "../controllers/auth"

router.post('/make-instructor', requireSignin, makeInstructor)
router.post('/get-account-status', requireSignin, getAccountStatus)
router.get('/current-instructor', requireSignin, currentInstructor)
router.get('/instructor-courses', requireSignin, instructorCourses)



module.exports= router;