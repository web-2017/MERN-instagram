import express from "express";

const router = express.Router()

import User from "../models/user.js";


router.get('/', (req, res) => {
    res.json('router hello')
})

router.post('/signup', (req, res) => {
    const {name, email, password} = req.body
    if (!email) res.status(422).json({error: 'Пожалуйста, введите email'})
    if (!password) res.status(422).json({error: 'Пожалуйста, введите пароль'})
    User.findOne({email: email})
        .then((savedUser) => {
            if (savedUser) {
                if (!email) res.status(422).json({error: 'email уже существует'})
            }
            const user = new User(req.body)
            user.save()
                .then(user => {
                    res.status(200).json({message: 'Success'})
                    console.log(`Пользователь ${req.body.email} создан`)
                })
                .catch(error => console.log(error))
        })
        .catch(error => console.log(error))

})

export default router
