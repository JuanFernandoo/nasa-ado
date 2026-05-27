import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom"

export function ErrorPage() {
    const error = useRouteError()

    const message = isRouteErrorResponse(error)
        ? error.status === 404
            ? 'Page not found'
            : `Error ${String(error.status)}: ${error.statusText}`
        : 'An unexpected error occurred'

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-space-950text-center">
            <span className="text-6xl" aria-hidden="true">🛸</span>
            <h1 className="text-3xl font-bold text-white">Houston, we have a problem.</h1>
            <p className="text-slate-400">{message}</p>
            <Link
                to="/"
                className="rounded-lg bg-accent px-6 py-2 font-medium text-white hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
                Return to base
            </Link>
        </div>
    )
}