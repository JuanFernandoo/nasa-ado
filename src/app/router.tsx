import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '@/shared/components/layout/RootLayout'
import { ErrorPage } from '@/shared/components/ui/ErrorPage'
import { SuspenseWrapper } from './SuspenseWrapper'
import { lazy} from 'react'

const ApodPage = lazy(() => import('@/features/apod'))
const MarsPage = lazy(() => import('@/features/mars'))
const NeoPage = lazy(() => import('@/features/neo'))
const EpicPage = lazy(() => import('@/features/epic'))
const FavoritesPage = lazy(() => import('@/features/mars/favorites'))

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
        ]
    }
])
