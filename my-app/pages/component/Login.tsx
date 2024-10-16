import { useState } from 'react';
import { loginAuth } from '../api/POST/LoginAuth';
import Cookies from 'js-cookie';
import logoClinicW from "@/styles/Images/clinic_green.png";
import Image from "next/image";

interface LoginProps {
    onLogin: (status: boolean) => void;
    name: (name: string) => void; 
}

export const Login = ({ onLogin, name }: LoginProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        if (username && password) {
            try {
                const res = await loginAuth({ username, password });
                console.log(res);
                Cookies.set('token', res.data.jwt, { expires: 1 });
                setError('');
                onLogin(true);
            } catch (error) {
                console.error('Error during login:', error);
                onLogin(false);
                setError('X กรุณาลองใหม่อีกครั้ง');
            }
        } else {
            setError("X กรุณากรอก Username และ Password");
        }
    };

    return ( 
        <div className='flex justify-center items-center h-screen bg-gradient-to-r from-[#042446f2] to-[#8bb39f]'>
            <div className='bg-white shadow-2xl rounded-2xl p-8 w-[500px] '>
                <div className='flex justify-center mb-6'>
                    <Image src={logoClinicW} alt="clinic-icon" width={250} />
                </div>
                
                <div className='mb-4'>
                    <label className='block text-lg font-semibold text-gray-700 mb-2'>Username</label>
                    <input
                        type="text"
                        className="border border-gray-300 rounded-xl p-3 w-full text-lg focus:outline-none focus:ring-2 focus:ring-[#30B0C7] transition duration-200"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className='mb-4'>
                    <label className='block text-lg font-semibold text-gray-700 mb-2'>Password</label>
                    <input
                        type="password"
                        className="border border-gray-300 rounded-xl p-3 w-full text-lg focus:outline-none focus:ring-2 focus:ring-[#30B0C7] transition duration-200"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    className='w-full py-3 bg-[#54bd5e] text-white text-lg font-bold rounded-xl hover:bg-[#376545] transition duration-200 shadow-md'
                    onClick={handleLogin}
                >
                    Sign in
                </button>
                
                {error && <div className='mt-4 text-red-500 text-center text-lg font-semibold'>{error}</div>}
            </div>
        </div>
    );
}

export default Login;
