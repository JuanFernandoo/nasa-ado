import { GithubIcon, LinkedinIcon } from '@/shared/icons/svg-icons'
import { Mail, Phone } from 'lucide-react'

export function Footer() {
    return (
        <footer className="mt-auto border-t border-slate-800 bg-slate-950 py-6">
            <div className="mx-auto max-w-7xl px-4">
                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">

                    <p className="text-xs text-slate-500">
                        Hecho por{' '}
                        <span className="font-medium text-slate-300">
                            Juan Fernando Orjuela
                        </span>{' '}
                        · Bogotá, Colombia
                    </p>

                    <div className="flex items-center gap-4">
                        <a
                            href="mailto:jfernandoorjuela26@gmail.com"
                            aria-label="Email"
                            className="text-slate-500 transition-colors duration-200 hover:text-orange-400"
                        >
                            <Mail className="h-4 w-4" />
                        </a>

                        <a
                            href="tel:+573135032150"
                            aria-label="Teléfono"
                            className="text-slate-500 transition-colors duration-200 hover:text-orange-400"
                        >
                            <Phone className="h-4 w-4" />
                        </a>

                        <a
                            href="https://linkedin.com/in/jfordev"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="text-slate-500 transition-colors duration-200 hover:text-orange-400"
                        >
                            <LinkedinIcon />
                        </a>

                        <a
                            href="https://github.com/jfordev"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="text-slate-500 transition-colors duration-200 hover:text-orange-400"
                        >
                            <GithubIcon />
                        </a>

                    </div>
                </div>
            </div>
        </footer>
    )
}