import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/database.js'
import userRoute from './routes/userRoute.js'
import cookieParser from 'cookie-parser'
import messageRoute from './routes/messageRoute.js'
import helmet from 'helmet'

 
const app=express()
dotenv.config({})
 //middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())

app.use(helmet())

const corsOption={
    origin:'http://localhost:5173',
    credentials:true,
}
app.use(cors(corsOption))

//routes
app.use('/api/v1/user',userRoute)
app.use('/api/v1/message',messageRoute)
//http://localhost:3000/api/v1/user/register



const PORT=process.env.PORT || 3000

app.listen(PORT ,()=>{
    connectDB()
    console.log(`Server is running on port no. ${PORT}`)
})