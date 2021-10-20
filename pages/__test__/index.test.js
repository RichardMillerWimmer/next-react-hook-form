import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '../index'

/**
 * @jest-environment jsdom
 */

test('it should validate length', async () => {
    const {findByLabelText, findByText, findByRole} = render(<Home/>)

    const input = await findByLabelText('password')
    await act(async () => {
        fireEvent.input(input, {target: {value: 'abcd'}});
        fireEvent.submit(await findByRole('button'));
    })

    const error = findByText('')
})

test('it should validate complexity', async () => {})