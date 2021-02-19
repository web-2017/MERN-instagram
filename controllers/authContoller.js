import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// libs
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import sendgridTransport from 'nodemailer-sendgrid-transport'

// components
import User from '../models/user.js'
import {JWT_SECRET, SEND_GRID_KEY} from '../config/keys.js'

// create send mail
const transporter = nodemailer.createTransport(
    sendgridTransport({
        auth: {
            api_key: SEND_GRID_KEY,
        },
    })
)

export const protectedVerification = (req, res) => {
    res.json('router protected')
}

export const signUp = async (req, res) => {
    const {name, email, password, image} = req.body

    if (!email || !password || !name) {
        return res.status(422).json({error: 'Все поля обязательны!!!'})
    }

    try {
        // Если email уже сушествует, ошибка
        const checkUser = await User.findOne({email: email})
        if (checkUser) return res.status(422).json({error: `Такой email: ${email} - уже существует`})

        // bcrypt password
        const hashPassword = await bcrypt.hash(req.body.password, 12)

        const user = new User({
            name,
            email,
            password: hashPassword, // Зашифровали password
            image,
        })

        await user.save()

        // email send
        await transporter.sendMail({
            to: email,
            from: 'webdevelope2017@gmail.com',
            subject: 'signup success',
            html: `
				<h1>welcome to instagram</h1>
				<p>Пожалуйста пройдите по ссылке <a href="https://instagram-clone-app1.herokuapp.com/signin">instagram-clone-app1</a></p>
			`,
        })

        res.status(200).json({message: 'Success'})

        console.log(`Пользователь ${req.body.email} создан`)
    } catch (e) {
        console.log(e)
    }
}

export const signIn = async (req, res) => {
    const {email, password} = req.body

    if (!email || !password) return res.status(422).json({error: 'Пожалуйста, введите email или password'})

    const user = await User.findOne({email: email})

    if (!user) {
        return res.status(422).json({error: `Пользователя с таким email: ${email} не существует`})
    }

    try {
        // сравниваем пароль при логине
        const hashPassword = await bcrypt.compare(password, user.password)
        // создали token
        const token = jwt.sign({id: user._id}, JWT_SECRET)

        if (hashPassword) {
            const {name, email, _id, followers, following, image} = user
            console.log('SignIn user', user)
            return res.status(200).json({
                message: `Добро пожаловать ${name || email}`,
                token,
                _id,
                user: {_id, name, image, email, followers, following},
            })
        } else {
            return res.status(422).json({error: `Неправильный пароль`})
        }
    } catch (e) {
        console.log(e)
    }
}

export const resetPassword = async (req, res) => {
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err)
        }
        const token = buffer.toString('hex')
        User.findOne({email: req.body.email}).then((user) => {
            if (!user) {
                return res.status(422).json({error: 'User dont exists with that email'})
            }
            user.resetToken = token
            user.expireToken = Date.now() + 3600000
            user.save().then((result) => {
                transporter.sendMail({
                    to: user.email,
                    from: 'webdevelope2017@gmail.com',
                    subject: 'password reset',
                    html: `
                     <p>You requested for password reset</p>
                     <h5>click in this <a href="http://localhost:3000/reset/${token}">link</a> to reset password</h5>
                     `,
                })
                res.json({message: 'check your email'})
            })
        })
    })
}

export const setNewPassword = async (req, res) => {
    const newPassword = req.body.password
    const sentToken = req.body.token

    try {
        const user = await User.findOne({resetToken: sentToken, expireToken: {$gt: Date.now()}})
        if (!user) {
			return res.status(422).json({error: 'Try again session expired'})
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12)
		user.password = hashedPassword
		user.resetToken = undefined
		user.expireToken = undefined

		await user.save()

		res.status(200).json({message: 'password updated success'})

    } catch (e) {
        console.error(e)
    }
}
