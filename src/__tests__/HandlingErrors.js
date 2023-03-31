import {render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { HomePage } from '../pages/HomePage'
import { Provider } from 'react-redux'
import axios from "axios";
import { setupStore } from '../store/store';
import { MemoryRouter } from 'react-router-dom'

jest.mock('axios')
let homePageComponent


describe('Handling errors', () => {
  
  beforeEach(() => {
    homePageComponent = <>
      <MemoryRouter>
        <Provider store={setupStore()}>
          <HomePage />
        </Provider>
      </MemoryRouter>
    </>
  })

  test('API return ERR_NETWORK ', async () => {

    axios.mockRejectedValueOnce({message: "", code: 'ERR_NETWORK'})

    render(homePageComponent)

    await screen.findByText("You have problem with internet", {exact: false})
  })

  test('API return ERR_DEPRECATED ', async () => {

    axios.mockRejectedValueOnce({message: "", code: 'ERR_DEPRECATED'})

    render(homePageComponent)

    await screen.findByText("Deprecated! You are not allowed to see this content!")
  })

  test('API return ERR_BAD_REQUEST ', async () => {

    axios.mockRejectedValueOnce({message: "", code: 'ERR_BAD_REQUEST'})

    render(homePageComponent)

    await screen.findByText("Sorry, we have a problem. Our developers are already fixing it!")
  })

  test('API return ERR_BAD_RESPONSE ', async () => {

    axios.mockRejectedValueOnce({message: "", code: 'ERR_BAD_RESPONSE'})

    render(homePageComponent)

    await screen.findByText("Oops! Error! Try again a little later!")
  })
})