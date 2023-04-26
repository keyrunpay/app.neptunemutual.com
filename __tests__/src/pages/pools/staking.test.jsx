import React from 'react'

import Staking from '@/pages/pools/staking'
import { render } from '@/utils/unit-tests/test-utils'
import { i18n } from '@lingui/core'

describe('Staking page', () => {
  beforeEach(() => {
    i18n.activate('en')
  })

  describe('if feature disabled', () => {
    test('should display coming soon message', () => {
      const screen = render(<Staking disabled='true' />)

      expect(screen.getByText(/Coming Soon/i)).toBeInTheDocument()
    })
  })

  describe('if feature enabled', () => {
    test('should display Staking tab as selected', () => {
      const screen = render(<Staking />)

      const links = screen.container.getElementsByClassName(
        'text-4E7DD9 border-B0C4DB'
      )
      expect(links).toHaveLength(1)
      expect(links[0].textContent).toBe('Staking')
    })
  })
})
