import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export function RootLayout() {
    return (
        <div className="min-h-screen bg-slate-950">
            <Navbar />
            <main id="main-content" className="mx-auto max-w-7xl px-4 py-8" tabIndex={-1}>
                <Outlet />
            </main>
        </div>
    )
}
