import express from "express";

const router = express.Router()
import bcrypt from 'bcryptjs'

import User from "../models/user.js";

router
    .get('/', (req, res) => {
        res.json('router hello')
    })
    .post('/signup', async (req, res) => {

        const {name, email, password} = await req.body
        if (!email) return res.status(422).json({error: 'Пожалуйста, введите email'})
        if (!password) return res.status(422).json({error: 'Пожалуйста, введите пароль'})

        try {
            const checkUser = await User.findOne({email: email})

            // Если email уже сушествует, ошибка
            if (checkUser) return res.status(422).json({error: `Такой email: ${email} - уже существует`})

            // bcrypt password
            const hashPassword = await bcrypt.hash(req.body.password, 12)

            // Создали нового пользователя
            const user = new User({
                name,
                email,
                password: hashPassword, // Зашифровали password
            })

            await user.save()

            res.status(200).json({message: 'Success'})
            console.log(`Пользователь ${req.body.email} создан`)

        } catch (e) {
            console.log(e)
        }


    })

export default router
