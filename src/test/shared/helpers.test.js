/**
  * @vitest-environment happy-dom
  */

import { expect, describe, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { API_PATH, IMAGES_PATH } from '../../shared/helpers.js'


describe('Testing helpers returns', () => {
  it('should return localhost api if the location matches localhost', () => {
    window.location.href = "http://localhost:8000"
    expect(API_PATH()).toBe('http://localhost:3000/api/v1/')
    expect(IMAGES_PATH()).toBe('http://localhost:3000/uploads/images')
  })

  it('should return dev api if the location matches dev', () => {
    window.location.href = "https://dev-landingpage.estudioempreendedor.com/api/v1/"
    expect(API_PATH()).toBe('https://api-dev-landingpage.estudioempreendedor.com/api/v1/')
    expect(IMAGES_PATH()).toBe('https://api-dev-landingpage.estudioempreendedor.com/uploads/images')
  })

})
