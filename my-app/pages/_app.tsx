// pages/_app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NavBar } from "./component/์Navbar";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className="grid grid-cols-[300px_auto] min-h-screen overflow-x-auto">
            <NavBar/>
            <main className="m-4 border">
                <Component {...pageProps} />
            </main>
        </div>
    )
}
