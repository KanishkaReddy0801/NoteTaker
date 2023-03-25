const express = require("express")
const router = express.Router()
const user = require('../models/user')
const bcrypt = require('bcrypt')
const bodyparser = require("body-parser")

router.use(bodyparser.urlencoded({ extended: false }))
router.use(bodyparser.json())

router.post('/register', async (req, res) => {
    try {
        const existing = await user.findOne({ email: req.body.email })
        if (existing) {
            res.status(403).json({
                status: 'Failed',
                result: 'User Already exists'
            })
        } else {
            bcrypt.hash(req.body.password, 10, async (err, hash) => {
                if(!err) {
                    try{
                        const User = await user.create({
                            username: req.body.username,
                            email: req.body.email,
                            password: hash,
                            confirmPassword: req.body.confirmPassword
                        })
                        res.status(200).json({
                            status: 'success',
                            result: User
                        })
                    } catch(err) {
                        res.status(500).json({
                            status: 'Failed',
                            message: err.message,
                        })
                    }
                }
            })
        }
    } catch(err) {
        res.status(500).json({
            status: 'Failed',
            message: err.message,
        })
    }
})

module.exports = router