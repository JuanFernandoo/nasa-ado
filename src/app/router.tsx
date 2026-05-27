import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '@/shared/components/layout/RootLayout'
import { ErrorPage } from '@/shared/components/ui/ErrorPage'
import { SuspenseWrapper } from './SuspenseWrapper'
import { ApodPage, EpicPage, FavoritesPage, MarsPage, NeoPage, StencilDemoPage } from './lazy-routers'


export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <SuspenseWrapper><ApodPage /></SuspenseWrapper>
            },
            {
                path: 'apod',
                element: <SuspenseWrapper><ApodPage /></SuspenseWrapper>,
            },
            {
                path: 'mars',
                element: <SuspenseWrapper><MarsPage /></SuspenseWrapper>,
            },
            {
                path: 'neo',
                element: <SuspenseWrapper><NeoPage /></SuspenseWrapper>,
            },
            {
                path: 'epic',
                element: <SuspenseWrapper><EpicPage /></SuspenseWrapper>,
            },
            {
                path: 'favorites',
                element: <SuspenseWrapper><FavoritesPage /></SuspenseWrapper>,
            },
            {
                path: 'stencil',
                element: <SuspenseWrapper><StencilDemoPage /></SuspenseWrapper>,
            },
        ]
    }
])
