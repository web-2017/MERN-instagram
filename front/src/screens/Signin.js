import React, {useState, useContext} from "react";
import {Link, useHistory} from "react-router-dom";
import {UserContext} from "../App";
import {validateEmail} from "../utils/validateEmail";
import loglevel from "../middleware/loglevel";
import Toast from "../components/Toast";
import {PUBLIC_URL} from "../config/KEYS";

export default () => {
    const {state, dispatch} = useContext(UserContext)
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const SignInPostData = async () => {
        const data = {email, password}

        // check email and password
        if (!validateEmail(email)) {
            return Toast(`Не правильный Email`, true)
        } else if (password.length < 5) {
            return Toast(`Пароль должен быть больше 5 символов!`, true)
        }

        try {
            const response = await fetch(`${PUBLIC_URL}/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            const result = await response.json()

            if (result.error) {
                Toast(result.error, true)
                loglevel.error(result)
            } else {
                loglevel.info(result)

                const {token, user} = result

                Toast(`Добро пожаловать! ${user.name}`)

                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))

                dispatch({type: 'USER', payload: user})
                history.push('/')
            }
        } catch (e) {
            loglevel.error(e)
        }
    }
    return (
        <div className="myCard container ">
            <div className="card auth-card input-field ">
                <h2 className='auth-h2'>Instagram</h2>
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
                        onClick={SignInPostData}
                >
                    Login
                </button>
                <h6>
                    <Link to='signup'>Dont have an account?</Link>
                </h6>
            </div>
        </div>
    )
}