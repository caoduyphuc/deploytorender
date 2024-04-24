const mongoose = require('mongoose')
const dotenv = require('dotenv')
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const authRouter = require('./routes/auth')
const userRouter = require('./routes/users')

const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)

dotenv.config()

// connect to db
mongoose.connect(
    process.env.DB_CONNECT,
  {}
).then(() => {
    console.log('DB Connected')
}).catch((err)=>{
    console.log(`DB connection error:${err}`);
 });


app.listen(process.env.PORT , () => {
    console.log(`example app listen on port ${process.env.PORT}`)
})

