import { useEffect, useState } from 'react';
import { loginAuth } from '../api/POST/LoginAuth';
import Cookies from 'js-cookie';
import router from 'next/router';

interface LoginProps {
    onLogin: (status: boolean) => void;
    name: (name: string) => void; 
}

export const Login: React.FC<LoginProps> = ({ onLogin, name }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            onLogin(true);
        } else {
            onLogin(false)
            router.push("/")
        }
    }, [onLogin]);
    

    const handleLogin = async () => {
        if (username !== '' && password !== '') {
            try {
                const res = await loginAuth({ username, password });
                Cookies.set('token', res.token, { expires: 1 });
                setError('')
                name(res.username);
                console.log(res);
                onLogin(true);

            } catch (error) {
                console.error('Error during login:', error);
                onLogin(false);
                setError('X กรุณาลองใหม่อีกครั้ง')
            }
        } else {
            setError("X กรุณากรอก Username และ Password")
        }
    };

    return (
        <div className='inset-0 flex justify-center items-center h-screen'>
            <div className='p-4 h-4/5 w-4/5 '>
                <div className='text-[32px] font-semibold'>Logo</div>
                <div className='h-full w-full flex flex-col justify-center items-center space-y-8'>
                    <div className='text-[36px] font-bold w-2/5'>Sing in</div>
                    <div className=' relative w-2/5'>
                        <label className=' absolute p-2 px-4 translate-x-[20px] translate-y-[-30px] text-[24px]  bg-white'>Username</label>
                        <input
                            type="text"
                            className="border border-gray-400  rounded-xl p-4 w-full text-[24px]"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className=' relative w-2/5'>
                        <label className=' absolute p-2 px-4 translate-x-[20px] translate-y-[-30px] text-[24px]  bg-white'>Password</label>
                        <input
                            type="password"
                            className="border  border-gray-400 rounded-xl p-4 w-full text-[24px]"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        className='border rounded-xl p-2 w-2/5 bg-[#30B0C7] text-[18px] font-semibold text-white hover:bg-white hover:border-black hover:text-black transition-colors'
                        onClick={handleLogin}
                    >
                        Sign in
                    </button>
                    <div className='text-[18px] text-red-500'>
                        {error}
                    </div>
                </div>
            </div>

        </div>

    );
}

export default Login;
