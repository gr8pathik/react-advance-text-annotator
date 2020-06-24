import React from 'react'
import { render } from '@testing-library/react'
import TextAnnotator from './react-advance-text-annotator'

describe('TextAnnotator', () => {
  it('Should return a normal text if the content and searchWords  is empty', () => {
    const { asFragment, debug } = render(<TextAnnotator />)
    debug()
  })
})
