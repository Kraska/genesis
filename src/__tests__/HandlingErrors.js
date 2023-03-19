import {render, screen, cleanup, act, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { HomePage } from '../pages/HomePage'
import { Provider } from 'react-redux'
import axios from "axios";
import { setupStore } from '../store/store';
import { MemoryRouter } from 'react-router-dom'

jest.mock('axios')

const homePageComponent = <>
  <MemoryRouter>
    <Provider store={setupStore()}>
      <HomePage />
    </Provider>
  </MemoryRouter>
</>

describe('Handling errors', () => {
  
  afterEach(cleanup)

  test('API return ERR_NETWORK ', async () => {

    axios.mockClear();
    axios.mockReset();
    jest.clearAllMocks();
    axios.get.mockRejectedValue({message: "", code: 'ERR_NETWORK'})

    await act(()=>{
        render(homePageComponent)
    })
    await waitFor(() => {
      expect(screen.getByTestId('alert'))
        .toHaveTextContent("You have problem with internet")
    });
  })

})