import express from "express";
const router = express.Router();
import formidable from 'express-formidable'
import { isInstructor, requireSignin } from "../middleware";

const {uploadImage, removeImage, create, read, uploadVideo, removeVideo, addLesson, update, removeLesson} = require("../controllers/course")

// for image
router.post('/course/upload-image', uploadImage);
router.post('/course/remove-image', removeImage);

//for course

router.post('/course', requireSignin, isInstructor, create)
router.put('/course/:slug', requireSignin, update)

// for lessons
router.put('/course/:slug/:lessonId', requireSignin, removeLesson)


router.get('/course/:slug', read)
router.post('/course/video-upload/:instructorId',requireSignin, formidable(), uploadVideo)
router.post('/course/video-remove/:instructorId',requireSignin, removeVideo)
router.post('/course/lesson/:slug/:instructorId',requireSignin, addLesson)

module.exports= router;