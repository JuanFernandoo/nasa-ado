import { lazy } from 'react'

export const ApodPage = lazy(() => import('@/features/apod'))
export const MarsPage = lazy(() => import('@/features/mars'))
export const NeoPage = lazy(() => import('@/features/neo'))
export const EpicPage = lazy(() => import('@/features/epic'))
export const FavoritesPage = lazy(() => import('@/features/mars/favorites'))
export const StencilDemoPage = lazy(() => import('@/features/stencil-demo'))
