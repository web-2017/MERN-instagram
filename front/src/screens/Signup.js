import React, {useState} from "react";
import {Link, useHistory} from 'react-router-dom'

import Toast from "../components/Toast";
import {PUBLIC_URL} from "../config/KEYS";

import {validateEmail} from "../helpers/validateEmail";

export default () => {
    const history = useHistory()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const SignUpData = async () => {
        const data = {name, email, password}

        // check email and password
        if (!validateEmail(email)) {
            Toast(`Не правильный Email`, true)
            return
        } else if (password.length < 5) {
            Toast(`Пароль должен быть больше 5 символов!`, true)
            return
        }

        try {
            const response = await fetch(`${PUBLIC_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const result = await response.json()
            console.log('result', result)
            if (result.error) {
                Toast(result.error, true)
            } else {
                Toast(`Добро пожаловать!`)
                history.push('/signin')
            }

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="myCard container ">
            <div className="card auth-card input-field">
                <h2 className='auth-h2'>Instagram</h2>
                <input type="text"
                       placeholder='name'
                       required
                       value={name}
                       onChange={(e) => setName(e.target.value)}
                />
                <input type="text"
                       placeholder='email'
                       required
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                />
                <input type="password"
                       placeholder='password'
                       required
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                />
                <button className="btn waves-effect waves-light blue darken-2" type="submit"
                        onClick={SignUpData}
                >
                    SignUp
                </button>
                <h6>
                    <Link to='signin'>Already have an account?</Link>
                </h6>
            </div>
        </div>
    )
}