import bcrypt from 'bcrypt'
import asyncHandler from 'express-async-handler'
const User = require('../models/user')

const registerUser= asyncHandler(async(req, res)=> {
    const {name, email, password} = req.body;

  //form validation

    if(!name || !email || !password){
        res.status(400)
        throw new Error("Please include all the fields")
    }

    // user check
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error("User with this email Already Exists")
    }

    // hash the password
    const salt= await bcrypt.genSalt(12)
    const hashedPassword= await bcrypt.hash(password, salt)

    //create and put the user to the Database
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })

    // veryfy the user if that created susscessfully 

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    }else {
        res.status(400)
        throw new Error("Invalid user Data")
    }

})

module.exports= {
    registerUser,
}