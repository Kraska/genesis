import * as React from 'react'
// import {rest} from 'msw'
// import {setupServer} from 'msw/node'
import {render, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { HomePage } from '../pages/HomePage'
import { COURSES } from '../__test_data__/courses.data'
import { Provider } from 'react-redux'
// import { AppConfig } from "../config";
import axios, { AxiosError } from "axios";
import { setupStore } from '../store/store';
import { MemoryRouter } from 'react-router-dom'

const courses = COURSES.courses.slice(0, 3)

// const url = `https://${AppConfig.API_HOST}/api/v1/core/preview-courses`

jest.mock('axios')

const response = {
  data: {
    courses: courses
  }
} 

describe('Home Page', () => {
  
  test('load courses on HomePage', async () => {

    axios.get.mockReturnValue(response)
    
    render(<>
        <MemoryRouter>
          <Provider store={setupStore()}>
            <HomePage />
          </Provider>
        </MemoryRouter>
      </>)

    const courses = await screen.findAllByTestId('course-card')

    expect(courses.length).toBe(3)
  })

})