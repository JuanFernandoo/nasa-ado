import { cn } from "@/shared/utils/cn"
import { NavLink } from "react-router-dom"
import { Telescope, CircleDot, Orbit, Earth, Star, Puzzle, Rocket } from "lucide-react"

const NAV_ITEMS = [
    { to: '/apod', label: 'Foto del día', Icon: Telescope },
    { to: '/mars', label: 'Marte', Icon: CircleDot },
    { to: '/neo', label: 'Asteroides', Icon: Orbit },
    { to: '/epic', label: 'EPIC', Icon: Earth },
    { to: '/favorites', label: 'Favoritos', Icon: Star },
    { to: '/stencil', label: 'Componentes Stencil', Icon: Puzzle },
] as const

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur-sm">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3" aria-label="Main navigation">
                <NavLink to="/"
                    className="flex items-center gap-2 text-lg font-bold text-white"
                    aria-label="NASA Explorer home"
                >
                    <Rocket className="h-5 w-5 text-orange-400" aria-hidden="true" />
                    <span>NASA Juan Orjuela</span>
                </NavLink>

                <ul className="flex items-center gap-1">
                    {NAV_ITEMS.map(({ to, label, Icon }) => (
                        <li key={to}>
                            <NavLink to={to}
                                className={({ isActive }) =>
                                    cn(
                                        'flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                        'hover:bg-slate-800 hover:text-white',
                                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500',
                                        isActive
                                            ? 'bg-slate-800 text-orange-400'
                                            : 'text-slate-400',
                                    )
                                }
                            >
                                <Icon className="h-4 w-4" aria-hidden="true" />
                                <span>{label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}