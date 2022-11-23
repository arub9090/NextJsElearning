import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
const User = require("../models/user");
import jwt from "jsonwebtoken";
import AWS from 'aws-sdk'


const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};

const SES = new AWS.SES(awsConfig);

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //form validation

  if (!name || !email || !password) {
    return res.status(400).send("Please put all the fields correctly");
  }

  // user check
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).send("Email already Exists");
  }

  // hash the password
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create and put the user to the Database
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // veryfy the user if that created susscessfully

  if (user) {
    res.status(201).json({message: 'user Creation was fine!'});
  } else {
    res.status(400).send("Invalid user Data");
  }
});


const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).exec();

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {httpOnly: true});

    user.password = undefined;

    res.status(200).json(user);
  } else {
  return  res.status(400).send("Invalid Ceredtials");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "SignOut was successful" });
  } catch (err) {
    res.status(400).send("Logout wasn't successful");
  }
});


 export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password").exec();
    if(user){
      return res.json({ok: true});
    }else{
      return res.json({ok: false})
    }
    
  } catch (err) {
    console.log(err);
  }
}

export const sendTestEmail = async( req, res)=>{
  const params = {
    Source: process.env.EMAIL_FROM,
    Destination: {
      ToAddresses: ["arifrubayet10@gmail.com"],
    },
    ReplyToAddresses: [process.env.EMAIL_FROM],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
            <html>
              <h1>Reset password link</h1>
              <p>Please use the following link to reset your password</p>
            </html>
          `,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Password reset Link HERE",
      },
    },
  };

  const emailSent = SES.sendEmail(params).promise();
  emailSent
    .then((data) => {
      console.log(data);
      res.json({ ok: true });
    })
    .catch((err) => {
      console.log(err);
    });

}


module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
