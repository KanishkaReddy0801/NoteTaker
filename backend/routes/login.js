const express = require("express")
const router = express.Router()
const user = require('../models/user')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const secret = 'RESTAPI'

const bodyparser = require("body-parser")

router.use(bodyparser.urlencoded({ extended: false }))
router.use(bodyparser.json())

router.post('/login', async (req, res) => {
    try {
        console.log(req.body)
        const { email, password } = req.body
        const user_obj = await user.findOne({ email })
        if (!user_obj) {
            return res.status(400).json({ message: 'User not registered' })
        }
        bcrypt.compare(password, user_obj.password, (err, result) => {
            if(err) {
                return res.status(400).json({ message: 'Failed', err })
            }
            if (result) {
                const {_id, email} =user_obj
                const token = jwt.sign({
                    data: user_obj._id
                }, secret)

                return res.json({ message: 'Login Successful', token, user: {_id, email} })
            } else {
                return res.status(400).json({ message: 'Invalid Credebtials' })
            }
        })
    } catch(err) {
        return res.status(500).json({ message: 'error', err })
    }
})


module.exports = router