import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Toast from '../components/Toast';

export const ResetPassword = () => {
    const history = useHistory();
    const [password, setPassword] = useState('');
    const {token} = useParams()

    const resetPasswordHandler = async () => {
        try {
            const response = await fetch(`/new-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password,
                    token
                }),
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
                <h2 className='auth-h2'>Set Password</h2>
                <input
                    type='text'
                    placeholder='enter new password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className='btn waves-effect waves-light blue darken-2'
                    type='submit'
                    onClick={() => resetPasswordHandler()}
                >
                    Обновить пароль
                </button>
            </div>
        </div>
    );
};
export default ResetPassword;
