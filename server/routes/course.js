import express from "express";
const router = express.Router();
import { isInstructor, requireSignin } from "../middleware";

const {uploadImage, removeImage, create, read } = require("../controllers/course")

// for image
router.post('/course/upload-image', uploadImage);
router.post('/course/remove-image', removeImage);

//for course

router.post('/course', requireSignin, isInstructor, create)
router.get('/course/:slug', read)

module.exports= router;