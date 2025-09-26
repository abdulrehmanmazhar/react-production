import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import Component1 from '@components/Component1'
describe('Component1', () => {
    it('Renders', () => {
        render(<Component1 />)
        expect(screen.getAllByText('Component1')).toHaveLength(1)
    })
})
