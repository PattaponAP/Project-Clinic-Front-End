import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NavBar } from "./component/Navbar"; 
import { Kanit } from "next/font/google";
import { useState } from "react";
import { Login } from "./component/Login";
import HomePage from "./index";

const kanit = Kanit({
    subsets: ['latin'],
    weight: ['200', '400'],
});

export default function App({ Component, pageProps }: AppProps) {
    const [isLogin, setIsLogin] = useState(false);
    const [name, setName] = useState<string>(''); 

    return (
        <>
            {!isLogin ? (
                <Login onLogin={setIsLogin} name={setName} />
            ) : (
                <div className={`grid grid-cols-[300px_auto] min-h-screen overflow-x-auto ${kanit.className}`}>
                    <NavBar />
                    <div className="m-8">
                        <Component {...pageProps} name={name}/>
                    </div>
                </div>
            )}
        </>
    );
}
