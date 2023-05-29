import { describe, it, assert, expect, vi } from 'vitest'

import { mount, flushPromises } from '@vue/test-utils'
import App from '../App.vue'

import axios from 'axios'

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

describe('App js: init', () => {
  assert.exists(App)

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
  data: '<meta name="title" content="DOSA - Ustadz Dr. Firanda Andirja, MA"><meta name="description" content='
}

// GET
vi.spyOn(axios, 'get').mockResolvedValueOnce(mockYoutubeVideo)

describe('App js: delete tweet youtube video', () => {
  it('delete tweet youtube video', async() => {
    ceramahSingkatIslam.setValue('https://www.youtube.com/shorts/peUj47yc1xo')

    await ceramahSingkatIslam.trigger('change')
  
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/video/shorts/peUj47yc1xo')
  
    // Wait until the DOM updates.
    await flushPromises()
  
    // textarea hasil: test youtube.com
    expect(results.element.value).toBe(`DOSA - Ustadz Dr. Firanda Andirja, MA 

https://www.youtube.com/shorts/peUj47yc1xo`)
  })
})

describe('App js: reset tweet youtube video', async() => {
  it('reset tweet youtube video', async() => {
    // 1. textarea: ceramahSingkatIslam = '-'
    ceramahSingkatIslam.setValue('-')
    // 2. textarea: hasil = 'Tidak ada hasil'
    results.setValue('Tidak ada hasil')
  
    assert.equal(ceramahSingkatIslam.element.value, '-')
    assert.equal(results.element.value, 'Tidak ada hasil')
  
    await btnReset.trigger('click')
    assert.equal(ceramahSingkatIslam.element.value, '')
    assert.equal(results.element.value, '')
  })
})

// results: 'Loading...' to `DOSA - Ustadz Dr. Firanda Andirja, MA ...`?
describe('App js: tweet youtube video all', () => {
  it('tweet youtube video all', async() => {
    // test cases
    const testCases = [
      {
        name: `youtube 'shorts' success: id=1`,
        youtubeLink: 'https://www.youtube.com/shorts/peUj47yc1xo',
        axiosGetTimes: 2,
        axiosGetWith: 'http://localhost:3000/video/shorts/peUj47yc1xo',
        results: 'Loading...'
      },
      {
        name: `youtube 'shorts' failure: id=2'`,
        youtubeLink: 'https://www.youtube.com/shorts',
        axiosGetTimes: 3,
        axiosGetWith: 'http://localhost:3000/video/shorts',
        results: 'Tidak ada hasil'
      },
    ]

    for (let test of testCases) {
      console.debug('ke-', test.name)
      ceramahSingkatIslam.setValue(test.youtubeLink)

      await ceramahSingkatIslam.trigger('change')
      
      expect(axios.get).toHaveBeenCalledTimes(test.axiosGetTimes)
      expect(axios.get).toHaveBeenCalledWith(test.axiosGetWith)
      
      // Wait until the DOM updates.
      await flushPromises()
      
      expect(results.element.value).toBe(test.results)
    }
  })
})