import { useEffect, useState } from 'react';
import { LoginAuth } from '../api/POST/LoginAuth';
import Cookies from 'js-cookie';

interface LoginProps {
    onLogin: (status: boolean) => void;
    name: (name: string) => void; // เปลี่ยนให้เป็นฟังก์ชันที่รับพารามิเตอร์เป็นชื่อ
}

export const Login: React.FC<LoginProps> = ({ onLogin, name }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            onLogin(true);
        }
    }, [onLogin]);

    const handleLogin = async () => {
        try {
            const res = await LoginAuth(username, password);
            Cookies.set('token', res.token, { expires: 30 });
            name(res.username); // เรียกใช้ฟังก์ชัน name เพื่อส่งชื่อไปยัง App component
            console.log(res);
            onLogin(true);
        } catch (error) {
            console.error('Error during login:', error);
            onLogin(false);
        }
    };

    return (
        <div className='inset-0 flex justify-center items-center h-screen'>
            <label>ID : </label>
            <input
                type="text"
                className="border border-black p-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <label>Password : </label>
            <input
                type="password"
                className="border border-black p-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button
                className='border border-black p-2 hover:bg-black'
                onClick={handleLogin}
            >
                LogIn
            </button>
        </div>
    );
}

export default Login;
