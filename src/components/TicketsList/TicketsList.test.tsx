import { describe, expect, test } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'

import TicketsList from '.'

describe('Tickets list rendering behaviors', () => {
  const waitDataToLoad = async () => await waitFor(
    () => expect(screen.queryByTestId('loader')).not.toBeInTheDocument(),
    { timeout: 10000 }
  )

  test('Show loader while loading the data', () => {
    render(<TicketsList />)
    expect(screen.queryByTestId('loader')).toBeInTheDocument()
  })

  test('[No scroll] First element (#1) exists, mid (#25000) & last (#50000) elements not.', async () => {
    render(<TicketsList />)
    await waitDataToLoad()
    expect(screen.getByTestId(1)).toBeInTheDocument()
    expect(screen.queryByTestId(25000)).not.toBeInTheDocument()
    expect(screen.queryByTestId(50000)).not.toBeInTheDocument()
  })

  test('[MID indexing/scrolling] Mid element (#25000) exists, first (#1) & last (#50000) elements not.', async () => {
    render(<TicketsList initialTicketIndex={25000} />)
    await waitDataToLoad()
    expect(screen.queryByTestId(1)).not.toBeInTheDocument()
    expect(screen.getByTestId(25000)).toBeInTheDocument()
    expect(screen.queryByTestId(50000)).not.toBeInTheDocument()
  })

  test('[END indexing/scrolling] Last element (#50000) exists, first (#1) & mid (#25000) elements not.', async () => {
    render(<TicketsList initialTicketIndex={50000} />)
    await waitDataToLoad()
    expect(screen.queryByTestId(1)).not.toBeInTheDocument()
    expect(screen.queryByTestId(25000)).not.toBeInTheDocument()
    expect(screen.getByTestId(50000)).toBeInTheDocument()
  })
})
