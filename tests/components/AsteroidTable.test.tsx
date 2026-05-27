import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AsteroidTable } from '@/features/neo/components/AsteroidTable'
import type { FlatAsteroid } from '@/features/neo/types/neo.types'

const mockAsteroids: FlatAsteroid[] = [
    {
        id: '54016476',
        name: '2020 HS',
        date: '2024-01-01',
        isHazardous: false,
        diameterMinKm: 0.04,
        diameterMaxKm: 0.09,
        velocityKph: 25000,
        distanceKm: 1500000,
        nasaUrl: 'https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr=54016476',
    },
    {
        id: '54016477',
        name: '2020 HZ',
        date: '2024-01-02',
        isHazardous: true,
        diameterMinKm: 0.15,
        diameterMaxKm: 0.35,
        velocityKph: 75000,
        distanceKm: 300000,
        nasaUrl: 'https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr=54016477',
    },
]

describe('AsteroidTable', () => {
    describe('rendering', () => {
        it('renders all asteroid names', () => {
            render(
                <AsteroidTable
                    asteroids={mockAsteroids}
                    sortField="distance"
                    sortDirection="asc"
                    onSort={vi.fn()}
                />,
            )

            expect(screen.getByText('2020 HS')).toBeInTheDocument()
            expect(screen.getByText('2020 HZ')).toBeInTheDocument()

        })

        it('shows hazardous and safe badges correctly', () => {
            render(
                <AsteroidTable
                    asteroids={mockAsteroids}
                    sortField="distance"
                    sortDirection="asc"
                    onSort={vi.fn()}
                />,
            )

            expect(screen.getByLabelText('Potencialmente peligroso')).toBeInTheDocument()
            expect(screen.getByLabelText('No peligroso')).toBeInTheDocument()
        })

        it('renders NASA JPL links for each asteroid', () => {
            render(
                <AsteroidTable
                    asteroids={mockAsteroids}
                    sortField="distance"
                    sortDirection="asc"
                    onSort={vi.fn()}
                />,
            )

            const links = screen.getAllByRole('link', { name: /detalles nasa/i })
            expect(links).toHaveLength(2)
            expect(links[0]).toHaveAttribute(
                'href',
                'https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr=54016476',
            )
        })

        it('shows empty state when no asteroids provided', () => {
            render(
                <AsteroidTable
                    asteroids={[]}
                    sortField="distance"
                    sortDirection="asc"
                    onSort={vi.fn()}
                />,
            )

            expect(screen.getByText(/no se encontraron asteroides/i)).toBeInTheDocument()
            expect(screen.queryByRole('table')).not.toBeInTheDocument()
        })
    })

    describe('sorting', () => {
        it('calls onSort with correct field when column header clicked', async () => {
            const handleSort = vi.fn()
            const user = userEvent.setup()

            render(
                <AsteroidTable
                    asteroids={mockAsteroids}
                    sortField="distance"
                    sortDirection="asc"
                    onSort={handleSort}
                />,
            )

            await user.click(screen.getByRole('button', { name: /ordenar por nombre/i }))
            expect(handleSort).toHaveBeenCalledWith('name')
        })

        it('calls onSort with velocity field when velocity header clicked', async () => {
            const handleSort = vi.fn()
            const user = userEvent.setup()

            render(
                <AsteroidTable
                    asteroids={mockAsteroids}
                    sortField="distance"
                    sortDirection="asc"
                    onSort={handleSort}
                />,
            )

            await user.click(screen.getByRole('button', { name: /ordenar por velocidad/i }))
            expect(handleSort).toHaveBeenCalledWith('velocity')
        })
    })

    describe('accessibility', () => {
        it('renders a table with caption for screen readers', () => {
            render(
                <AsteroidTable
                    asteroids={mockAsteroids}
                    sortField="distance"
                    sortDirection="asc"
                    onSort={vi.fn()}
                />,
            )

            expect(screen.getByRole('table')).toBeInTheDocument()
            expect(screen.getByText(/objetos cercanos a la tierra/i)).toBeInTheDocument()
        })

        it('all column headers are buttons for keyboard navigation', () => {
            render(
                <AsteroidTable
                    asteroids={mockAsteroids}
                    sortField="distance"
                    sortDirection="asc"
                    onSort={vi.fn()}
                />,
            )

            const sortButtons = screen.getAllByRole('button', { name: /ordenar por/i })
            expect(sortButtons.length).toBeGreaterThan(0)
        })
    })
})