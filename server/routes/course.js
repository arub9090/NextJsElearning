import express from "express";
const router = express.Router();
import formidable from 'express-formidable'
import { isInstructor, requireSignin } from "../middleware";

const {courses, uploadImage, removeImage, create, read, uploadVideo, removeVideo, addLesson, update, removeLesson, updateLesson, publishCourse, unpublishCourse} = require("../controllers/course")

router.get('/courses', courses)
// for image
router.post('/course/upload-image', uploadImage);
router.post('/course/remove-image', removeImage);

//for course

router.post('/course', requireSignin, isInstructor, create)
router.put('/course/:slug', requireSignin, update)


// publish course
router.put("/course/publish/:courseId", requireSignin, publishCourse);
// unpublish course
router.put("/course/unpublish/:courseId", requireSignin, unpublishCourse);

// for lessons
router.put('/course/:slug/:lessonId', requireSignin, removeLesson)
router.put('/course/lesson/:slug/:lessonId', requireSignin, updateLesson)


router.get('/course/:slug', read)
router.post('/course/video-upload/:instructorId',requireSignin, formidable(), uploadVideo)
router.post('/course/video-remove/:instructorId',requireSignin, removeVideo)
router.post('/course/lesson/:slug/:instructorId',requireSignin, addLesson)




module.exports= router;