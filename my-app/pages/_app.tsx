// pages/_app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NavBar } from "./component/Navbar"; 
import { Kanit } from "next/font/google";

// ประกาศฟอนต์ภายนอกฟังก์ชัน
const kanit = Kanit({
    subsets: ['latin'],
    weight: ['200', '400'],
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className={`grid grid-cols-[300px_auto] min-h-screen overflow-x-auto ${kanit.className}`}>
            <NavBar />
            <main className="m-4 border">
                <Component {...pageProps} />
            </main>
        </div>
    )
}
