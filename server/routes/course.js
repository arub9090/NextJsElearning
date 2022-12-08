import express from "express";
const router = express.Router();
import { requireSignin } from "../middleware";

const {uploadImage, removeImage} = require("../controllers/course")
router.post('/course/upload-image', uploadImage);
router.post('/course/remove-image', removeImage);

module.exports= router;