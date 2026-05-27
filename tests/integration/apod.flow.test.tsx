import { describe, it, expect } from 'vitest'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { http, HttpResponse } from 'msw'
import ApodPage from '@/features/apod'
import { server } from '../mocks/server'
import { ENDPOINTS } from '@/lib/endpoints'

function renderApodPage() {
    const client = new QueryClient({
        defaultOptions: {
            queries: { retry: false, gcTime: 0, staleTime: 0 },
        },
    })

    return render(
        <QueryClientProvider client={client}>
            <MemoryRouter>
                <ApodPage />
            </MemoryRouter>
        </QueryClientProvider>,
    )
}

describe('APOD Page — full user flow', () => {
    describe('loading state', () => {
        it('shows skeleton while data is loading', () => {
            renderApodPage()
            expect(screen.getByRole('status')).toBeInTheDocument()
        })
    })

    describe('success state', () => {
        it('renders all pictures after data loads', async () => {
            renderApodPage()

            await waitFor(() => {
                expect(screen.getByText('Andromeda Galaxy')).toBeInTheDocument()
            })

            expect(screen.getByText('Orion Nebula')).toBeInTheDocument()
            expect(screen.getByText('Saturn Ring Plane Crossing')).toBeInTheDocument()
        })

        it('shows correct picture count', async () => {
            renderApodPage()

            await waitFor(() => {
                expect(
                    screen.getByText(/mostrando/i).closest('p'),
                ).toHaveTextContent('3')
            })
        })
    })

    describe('search filter', () => {
        it('filters pictures by title', async () => {
            const user = userEvent.setup()
            renderApodPage()

            await waitFor(() => {
                expect(screen.getByText('Andromeda Galaxy')).toBeInTheDocument()
            })

            await user.type(
                screen.getByRole('searchbox', { name: /buscar imagenes de la Nasa/i }),
                'Andromeda',
            )

            await waitFor(() => {
                expect(screen.getByText('Andromeda Galaxy')).toBeInTheDocument()
                expect(screen.queryByText('Orion Nebula')).not.toBeInTheDocument()
                expect(screen.queryByText('Saturn Rings Video')).not.toBeInTheDocument()
            })
        })

        it('filters pictures by explanation text', async () => {
            const user = userEvent.setup()
            renderApodPage()

            await waitFor(() => {
                expect(screen.getByText('Orion Nebula')).toBeInTheDocument()
            })

            await user.type(
                screen.getByRole('searchbox', { name: /buscar imagenes de la Nasa/i }),
                'diffuse nebula',
            )

            await waitFor(() => {
                expect(screen.getByText('Orion Nebula')).toBeInTheDocument()
                expect(screen.queryByText('Andromeda Galaxy')).not.toBeInTheDocument()
            })
        })

        it('shows empty state when search has no results', async () => {
            const user = userEvent.setup()
            renderApodPage()

            await waitFor(() => {
                expect(screen.getByText('Andromeda Galaxy')).toBeInTheDocument()
            })

            await user.type(
                screen.getByRole('searchbox', { name: /buscar imagenes de la Nasa/i }),
                'xyznonexistent',
            )

            await waitFor(() => {
                expect(screen.getByText(/no se encontraron imagenes/i)).toBeInTheDocument()
            })
        })
    })

    describe('modal flow', () => {
        it('opens modal when card is clicked', async () => {
            const user = userEvent.setup()
            renderApodPage()

            await waitFor(() => {
                expect(screen.getByText('Andromeda Galaxy')).toBeInTheDocument()
            })

            await user.click(
                screen.getByRole('button', { name: /ver detalles de andromeda galaxy/i }),
            )

            const modal = screen.getByRole('dialog')
            expect(modal).toBeInTheDocument()
            expect(within(modal).getByText('Andromeda Galaxy')).toBeInTheDocument()
            expect(
                within(modal).getByText(/the nearest major galaxy/i),
            ).toBeInTheDocument()
        })

        it('closes modal when close button is clicked', async () => {
            const user = userEvent.setup()
            renderApodPage()

            await waitFor(() => {
                expect(screen.getByText('Andromeda Galaxy')).toBeInTheDocument()
            })

            await user.click(
                screen.getByRole('button', { name: /ver detalles de andromeda galaxy/i }),
            )

            expect(screen.getByRole('dialog')).toBeInTheDocument()

            await user.click(screen.getByRole('button', { name: /Cerrar modal/i }))

            expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
        })

        it('closes modal with Escape key', async () => {
            const user = userEvent.setup()
            renderApodPage()

            await waitFor(() => {
                expect(screen.getByText('Andromeda Galaxy')).toBeInTheDocument()
            })

            await user.click(
                screen.getByRole('button', { name: /ver detalles de andromeda galaxy/i }),
            )

            expect(screen.getByRole('dialog')).toBeInTheDocument()

            await user.keyboard('{Escape}')

            expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
        })

        it('focuses close button when modal opens', async () => {
            const user = userEvent.setup()
            renderApodPage()

            await waitFor(() => {
                expect(screen.getByText('Andromeda Galaxy')).toBeInTheDocument()
            })

            await user.click(
                screen.getByRole('button', { name: /ver detalles de andromeda galaxy/i }),
            )

            expect(screen.getByRole('button', { name: /Cerrar modal/i })).toHaveFocus()
        })
    })

    describe('error state', () => {
        it('shows error alert when API returns 429', async () => {
            server.use(
                http.get(`${ENDPOINTS.NASA_BASE}/planetary/apod`, () => {
                    return HttpResponse.json({ error: 'Rate limit' }, { status: 429 })
                }),
            )


            renderApodPage()

            await waitFor(() => {
                expect(screen.getByRole('alert')).toBeInTheDocument()
            })

            expect(screen.getByText(/rate limit exceeded/i)).toBeInTheDocument()
        })

        it('shows error alert when API returns 500', async () => {
            server.use(
                http.get(`${ENDPOINTS.NASA_BASE}/planetary/apod`, () => {
                    return HttpResponse.json({ error: 'Server error' }, { status: 500 })
                }),
            )

            renderApodPage()

            await waitFor(() => {
                expect(screen.getByRole('alert')).toBeInTheDocument()
            })

            expect(screen.getByText(/server error/i)).toBeInTheDocument()
        })
        it('shows error when API returns unexpected data shape', async () => {
            server.use(
                http.get(`${ENDPOINTS.NASA_BASE}/planetary/apod`, () => {
                    return HttpResponse.json({ invalid: 'shape' })
                }),
            )

            renderApodPage()

            await waitFor(() => {
                expect(screen.getByRole('alert')).toBeInTheDocument()
            })
        })
    })

    describe('accessibility', () => {
        it('page has correct heading structure', async () => {
            renderApodPage()

            await waitFor(() => {
                expect(
                    screen.getByRole('heading', { name: /foto de la Nasa del día/i }),
                ).toBeInTheDocument()
            })
        })

        it('gallery section has accessible label', async () => {
            renderApodPage()

            await waitFor(() => {
                expect(
                    screen.getByRole('region', { name: /3 imagenes de la nasa/i  }),
                ).toBeInTheDocument()
            })
        })
    })
})