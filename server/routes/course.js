import express from "express";

const router = express.Router();

import { requireSignin } from "../middleware";

// controllers
const {uploadImage, removeImage} = require("../controllers/course")
import {currentUser} from "../controllers/auth"




router.post('/course/upload-image', uploadImage);
router.post('/course/remove-image', removeImage);


module.exports= router;