import jwt from 'jsonwebtoken'
import {JWT_TOKEN} from "../keys.js";
import User from "../models/user.js";

export default async (req, res, next) => {
    // Получили токен из заголовков
    const {authorization} = await req.headers
    // Если токена нету то ошибка
    if (!authorization) return res.status(401).json({error: 'Вы должны авторизоваться'})

    // Убрали из authorization слово Bearer
    const token = await authorization.replace('Bearer ', '')

    // Сравинили токен с jwt и секретным словом JWT_TOKEN
    jwt.verify(token, JWT_TOKEN, async (err, payload) => {

        if(err) return res.status(401).json({error: 'Вы должны быть авторизованы'})

        const {_id} = await payload



        const userId = await User.findById(_id)
        console.log('_id', userId)


        req.user = userId
        next()
    })
}