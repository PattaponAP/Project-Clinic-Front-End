import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NavBar } from "./component/Navbar"; 
import { Kanit } from "next/font/google";

const kanit = Kanit({
    subsets: ['latin'],
    weight: ['200', '400'],
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className={`grid grid-cols-[300px_auto] min-h-screen overflow-x-auto ${kanit.className} `}>
            <NavBar />
            <main style={{ height: 'calc(100vh - 2.5rem)' }}  className="m-4 border p-8 ">
                <Component {...pageProps} />
            </main>
        </div>
    )
}
