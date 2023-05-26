import { describe, it, assert, expect, vi } from 'vitest'

import { mount, flushPromises } from '@vue/test-utils'
import App from '../App.vue'

import axios from 'axios'

describe('App js: init', () => {
  assert.exists(App)
  const wrapper = mount(App, {
    props: { } 
  })

  // textarea: ceramahSingkatIslam dan hasil
  const ceramahSingkatIslam = wrapper.find('[data-test="ceramah-singkat-islam"]')
  const results = wrapper.find('[data-test="results"]')

  // button: btnReset dan btnCopy
  const btnReset = wrapper.find('[data-test="btn-reset"]') 
  const btnCopy = wrapper.find('[data-test="btn-copy"]')

  // button: btnTweet
  const btnTweet = wrapper.find('[data-test="btn-tweet"]')

  it('init', () => {
    assert.isEmpty(ceramahSingkatIslam.element.value)
    assert.equal(ceramahSingkatIslam.element.focus(), undefined)

    assert.isEmpty(results.element.value)
    assert.isUndefined(btnReset.attributes().disabled)
    assert.equal(btnCopy.attributes().disabled, '')
    assert.equal(btnTweet.attributes().disabled, '')
  })
})

// test html: https://youtube.com/
const mockYoutubeVideo = { 
  data: '<title>DOSA - Ustadz Dr. Firanda Andirja, MA - YouTube</title><'
}

// GET
vi.spyOn(axios, 'get').mockResolvedValueOnce(mockYoutubeVideo)

describe('App js: delete tweet youtube video', async() => {
  const wrapper = mount(App)
  
  // textarea: ceramahSingkatIslam dan hasil
  const ceramahSingkatIslam = wrapper.find('[data-test="ceramah-singkat-islam"]')
  
  ceramahSingkatIslam.setValue('https://www.youtube.com/shorts/peUj47yc1xo')

  await ceramahSingkatIslam.trigger('change')

  expect(axios.get).toHaveBeenCalledTimes(1)
  expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/video/shorts/peUj47yc1xo')

  // Wait until the DOM updates.
  await flushPromises()

  const results = wrapper.find('[data-test="results"]')

  // // textarea hasil: test youtube.com
  expect(results.element.value).toContainEqual('DOSA - Ustadz Dr. Firanda Andirja, MA')
})