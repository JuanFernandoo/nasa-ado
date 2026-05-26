import type { ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/query-client'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

interface ProviderProps {
    children: ReactNode
}

export function Providers({children}: ProviderProps){
    return(
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen/>
        </QueryClientProvider>
    )
}