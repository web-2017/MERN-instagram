import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { validateEmail } from '../filters/validateEmail';
import Toast from '../components/Toast';

export const ResetPassword = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');

    const postEmailHandler = async () => {

        // check email
        if (!validateEmail(email)) {
            return Toast(`Не правильный Email`, true);
        }

        try {
            const response = await fetch(`/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email}),
            });

            const result = await response.json();

            if (result.error) {
                console.error(result);
                Toast(result.error, true);
            } else {
                Toast(result.message);
                history.push('/signin');
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className='myCard container '>
            <div className='card auth-card input-field '>
                <h2 className='auth-h2'>Reset Password</h2>
                <input
                    type='text'
                    placeholder='email'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button
                    className='btn waves-effect waves-light blue darken-2'
                    type='submit'
                    onClick={() => postEmailHandler()}
                >
                    Сброс пароля
                </button>
            </div>
        </div>
    );
};
export default ResetPassword;
