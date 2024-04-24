const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const router = express.Router()
const User = require('./../models/User')
const { registerVadilator } =  require('./../validations/auth')

router.post('/register', async (request, response) => {
    const {error} = registerVadilator(request.body)
    if (error) return response.status(422).send(error.details[0].message)
    const existEmail = await User.findOne({ email: request.body.email })
    if(existEmail) return response.status(422).send('Email is exist')
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(request.body.password, salt)
    const user = User({name: request.body.name, email: request.body.email, password: hashPassword})
    try {
        const newUser = await user.save()
        response.status(200).send(newUser)
    } catch (error) {
        response.status(422).send(error)
}})


router.post('/login', async (request, response) => {
    const user = await User.findOne({email: request.body.email})
    if(!user) return response.status(422).send('Email or Password is not correct')
    bcrypt.compare(request.body.password, user.password, function(err, res) {
        if (err){
          // handle error
          return  response.status(422).send(err)
        }
        if (res) {
          // Send JWT
          const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET, {expiresIn: process.env.TOKEN_EXPRIED})
          return response.header('auth-token', token).send(token)
        } else {
            // not match
          return response.status(422).send('Email or Password is not correct')
        }
    })
})

module.exports = router