import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function RootLayout() {
    return (
        <div className="flex min-h-screen flex-col bg-slate-950">
            <Navbar />
            <main id="main-content" className="mx-auto w-full max-w-7xl flex-1 px-4 py-8" tabIndex={-1}>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}