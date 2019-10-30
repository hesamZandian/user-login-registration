const express = require('express')
const router = express.Router();
const User = require('../models/user')

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(404).json('error: ' + err))
})

router.route('/create').post((req, res) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const newUser = new User({
        name,
        email,
        password
    })
    newUser.save()
        .then(hero => res.json("user created successfully"))
        .catch((err) => console.log(err))
})

router.route('/delete/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then(user => res.json("user deleted successfully"))
    .catch((err) => console.log(err))
})

module.exports = router