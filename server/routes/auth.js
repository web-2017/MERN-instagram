import express from "express";

const router = express.Router()
import bcrypt from 'bcryptjs'

import User from "../models/user.js";

router
    .get('/', (req, res) => {
        res.json('router hello')
    })
    .post('/signup', async (req, res) => {

        let {name, email, password} = await req.body
        if (!name) return res.status(422).json({error: 'Пожалуйста, введите имя'})
        if (!email) return res.status(422).json({error: 'Пожалуйста, введите email'})
        if (!password) return res.status(422).json({error: 'Пожалуйста, введите пароль'})

        // Если name не заполнили, то name = email
        // if (email && password && !name) name = email


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
    .post('/signin', async (req, res) => {
        const {email, password} = req.body
        if (!email || !password) return res.status(422).json({error: 'Пожалуйста, введите email или password'})

        const user = await User.findOne({email: email})

        if (!user) return res.status(422).json({error: `Пользователя с таким email: ${email} не существует`})

        // Сравниваем пароль при логине
        const hashPassword = await bcrypt.compare(password, user.password)

        try {
            if (hashPassword) return res.status(200).json({message: `Добро пожаловать ${user.name || user.email}`})
            else return res.status(422).json({error: `Неправильный пароль`})
        } catch (e) {
            console.log(e)
        }
    })

export default router
