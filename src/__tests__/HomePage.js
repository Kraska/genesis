import * as React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { HomePage } from '../pages/HomePage'
import { COURSES } from '../__test_data__/courses.data'
import { Provider } from 'react-redux'
// import { AppConfig } from "../config";
import axios from "axios";
import { setupStore } from '../store/store';
import { MemoryRouter } from 'react-router-dom'

// const url = `https://${AppConfig.API_HOST}/api/v1/core/preview-courses`

jest.mock('axios')

const homePageComponent = <>
  <MemoryRouter>
    <Provider store={setupStore()}>
      <HomePage />
    </Provider>
  </MemoryRouter>
</>

describe('Home Page', () => {

  test('Render 3 courses on HomePage', async () => {

    axios.get.mockReturnValue({
      data: {
        courses: COURSES.courses.slice(0, 3)
      }
    })
    
    render(homePageComponent)

    const courses = await screen.findAllByTestId('course-card')

    expect(courses.length).toBe(3)
  })

})