import asyncHandler from "express-async-handler";
const User = require("../models/user");
import jwt from "jsonwebtoken";
import AWS, { APIGateway } from "aws-sdk";
import { nanoid } from "nanoid";
import Course from "../models/course";
import slugify from "slugify";

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};

const S3 = new AWS.S3(awsConfig);

export const uploadImage = async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) return res.status(400).send("No image");

    // prepare the image
    const base64Data = new Buffer.from(
      image.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    const type = image.split(";")[0].split("/")[1]; // we want the jpeg part from the raw BInary image

    //image params
    const params = {
      Bucket: "edemy-bucket-arif",
      Key: `${nanoid()}.${type}`,
      Body: base64Data,
      ACL: "public-read",
      ContentEncodeing: "base64",
      ContentType: `image/${type}`,
    };

    //upload to s3

    S3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
        return res.sendStatus(400);
      } else {
        //console.log(data);
        res.send(data);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export const removeImage = async (req, res) => {
  try {
    const { image } = req.body;
    const params = {
      Bucket: image.Bucket,
      Key: image.key,
    };

    // delete from S3

    S3.deleteObject(params, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.send({ ok: true });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export const create = async (req, res) => {
  /*  console.log('Create course', req.body);
 res.send({ok: true}) */

  try {
    const alreadyExists = await Course.findOne({
      slug: slugify(req.body.name.toLowerCase()),
    });

    if (alreadyExists) {
      return res.status(400).send("Title is taken");
    } else {
      const course = await new Course({
        slug: slugify(req.body.name),
        instructor: req.user._id,
        ...req.body,
      }).save();

      res.json(course);
    }
  } catch (err) {
    console.log(err);
  }
};
export const read = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug })
      .populate("instructor", "_id name")
      .exec();

    res.json(course);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Single Course Not Found");
  }
};
