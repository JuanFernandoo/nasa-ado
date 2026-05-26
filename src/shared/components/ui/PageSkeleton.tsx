export function PageSkeleton() {
    return (
        <div
            className="animate-pulse space-y-6"
            role="status"
            aria-label="Loading page..."
        >
            <div className="h-8 w-64 rounded-lg bg-slate-800" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-64 rounded-xl bg-slate-800" />
                ))}
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    )
}