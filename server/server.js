import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import {readdirSync} from 'fs'
import mongoose from 'mongoose'
require("dotenv").config();

//create Express App
const app= express();

//Batabase connection

mongoose.connect(process.env.DATABASE, {
}).then(()=> console.log('***DB COnencted***'))
.catch((err)=> console.log('DATABASE Connection Failed', err))


//setup the middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false })) 
app.use(morgan('dev'))


readdirSync('./routes').map((r)=> app.use('/api', require(`./routes/${r}`)))

// port setting
const port= process.env.PORT || 8000;
app.listen(port, ()=> console.log(`Server Running on Port ${port}`))

