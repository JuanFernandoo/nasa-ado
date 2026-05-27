import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ApodCard } from '@/features/apod/components/ApodCard'
import { apodFixtures } from '../mocks/fixtures'

const imageItem = apodFixtures[0]
const videoItem = apodFixtures[2]

if (!imageItem || !videoItem) {
  throw new Error('Fixtures not found — check apodFixtures array')
}

describe('ApodCard', () => {
    describe('rendering', () => {
        it('renders title and formatted date', () => {
            render(<ApodCard item={imageItem} onClick={vi.fn()} />)

            expect(screen.getByText('Andromeda Galaxy')).toBeInTheDocument()
            expect(screen.getByText(/1 de enero de 2024/i)).toBeInTheDocument()
        })

        it('renders copyright when present', () => {
            render(<ApodCard item={imageItem} onClick={vi.fn()} />)
            expect(screen.getByText(/robert kennett/i)).toBeInTheDocument()
        })

        it('does not render copyright when absent', () => {
            const itemWithoutCopyright = { ...imageItem, copyright: undefined }
            render(<ApodCard item={itemWithoutCopyright} onClick={vi.fn()} />)
            expect(screen.queryByText(/©/)).not.toBeInTheDocument()
        })

        it('renders image with correct alt text', () => {
            render(<ApodCard item={imageItem} onClick={vi.fn()} />)
            expect(screen.getByAltText('Andromeda Galaxy')).toBeInTheDocument()
        })

        it('shows VIDEO badge for video media type', () => {
            render(<ApodCard item={videoItem} onClick={vi.fn()} />)
            expect(screen.getByText('VIDEO')).toBeInTheDocument()
        })

        it('does not show VIDEO badge for image media type', () => {
            render(<ApodCard item={imageItem} onClick={vi.fn()} />)
            expect(screen.queryByText('VIDEO')).not.toBeInTheDocument()
        })
    })

    describe('interactions', () => {
        it('calls onClick when card is clicked', async () => {
            const handleClick = vi.fn()
            const user = userEvent.setup()

            render(<ApodCard item={imageItem} onClick={handleClick} />)
            await user.click(
                screen.getByRole('button', { name: /ver detalles de andromeda galaxy/i }),
            )

            expect(handleClick).toHaveBeenCalledTimes(1)
            expect(handleClick).toHaveBeenCalledWith(imageItem)
        })

        it('calls onClick when Enter key is pressed', async () => {
            const handleClick = vi.fn()
            const user = userEvent.setup()

            render(<ApodCard item={imageItem} onClick={handleClick} />)
            screen.getByRole('button').focus()
            await user.keyboard('{Enter}')

            expect(handleClick).toHaveBeenCalledTimes(1)
        })
    })

    describe('accessibility', () => {
        it('is focusable via keyboard', () => {
            render(<ApodCard item={imageItem} onClick={vi.fn()} />)
            const button = screen.getByRole('button')
            button.focus()
            expect(button).toHaveFocus()
        })

        it('has descriptive aria-label', () => {
            render(<ApodCard item={imageItem} onClick={vi.fn()} />)
            expect(
                screen.getByRole('button', { name: /ver detalles de andromeda galaxy/i }),
            ).toBeInTheDocument()
        })
    })
})