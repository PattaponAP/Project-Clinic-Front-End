import "@/styles/globals.css";
import "@/pages/component/Popup/styles-popup.css";

import type { AppProps } from "next/app";
import { NavBar } from "./component/Navbar"; 
import { Kanit } from "next/font/google";
import { useEffect, useState } from "react";
import { Login } from "./component/Login";
import Cookies from 'js-cookie';
import router from "next/router";

const kanit = Kanit({
    subsets: ['latin'],
    weight: ['200', '400'],
});

export default function App({ Component, pageProps }: AppProps) {
    const [isLogin, setIsLogin] = useState(false);
    const [name, setName] = useState<string>(''); 
    
    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            setIsLogin(true);
        } else {
            setIsLogin(false)
            router.push("/")
        }
    }, [isLogin]);
    

    return (
        <div className="overflow-auto">
            {!isLogin ? (
                <Login onLogin={setIsLogin} name={setName} />
            ) : (
                <div className={`grid grid-cols-[300px_auto] min-h-screen ${kanit.className}`}>
                    <NavBar />
                    <div className="m-8">
                        <Component {...pageProps} name={name} />
                    </div>
                </div>
            )}
        </div>
    );
}
