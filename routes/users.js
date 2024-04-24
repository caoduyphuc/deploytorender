const express = require('express')
const User = require('./../models/User')
const verifyToken = require('./../middlewares/verifyToken')
const router = express.Router()

router.get('/', verifyToken, (_, response) => {
    User.find({}).then((res) => {
        response.send(res)
    }).catch((err) => {
        response.status(422).send(err)
    });
})

module.exports = router