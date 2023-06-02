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

describe('App js: delete tweet youtube video', () => {
  it('delete tweet youtube video', async() => {
    // GET
    vi.spyOn(axios, 'get').mockResolvedValueOnce({
      data: '<meta name="title" content="DOSA - Ustadz Dr. Firanda Andirja, MA"><meta name="description" content=',
      status: 200
    })

    ceramahSingkatIslam.setValue('https://www.youtube.com/shorts/peUj47yc1xo')
    await ceramahSingkatIslam.trigger('change')
  
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/video/shorts/peUj47yc1xo')
  
    // Wait until the DOM updates.
    await flushPromises()
  
    // textarea hasil: test youtube.com
    expect(results.element.value).toEqual(`DOSA - Ustadz Dr. Firanda Andirja, MA 

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

describe('App js: tweet youtube video all', () => {
  it('tweet youtube video all', async() => {
    // test cases
    const testCases = [
      {
        name: `youtube 'shorts' success: id=1`,
        youtubeLink: 'https://www.youtube.com/shorts/peUj47yc1xo',
        axiosGetValueOnce: {
          data: '<meta name="title" content="DOSA - Ustadz Dr. Firanda Andirja, MA"><meta name="description" content=',
          status: 200
        },
        axiosGetTimes: 1,
        axiosGetWith: 'http://localhost:3000/video/shorts/peUj47yc1xo',
        results: `DOSA - Ustadz Dr. Firanda Andirja, MA 

https://www.youtube.com/shorts/peUj47yc1xo`,
        tweetIs: 'Tweet is: + 198'
      },
      {
        name: `youtube 'watch' success: id=2'`,
        youtubeLink: 'https://youtu.be/vTeIKc2JjCU',
        axiosGetValueOnce: {
          data: '<meta name="title" content="Perbanyak Istighfar - Ustadz Dr. Firanda Andirja, MA"><meta name="description" content=',
          status: 200
        },
        axiosGetTimes: 1,
        axiosGetWith: 'http://localhost:3000/video/watch?v=vTeIKc2JjCU',
        results: `Perbanyak Istighfar - Ustadz Dr. Firanda Andirja, MA 

https://youtu.be/vTeIKc2JjCU`,
        tweetIs: 'Tweet is: + 197'
      },
      {
        name: `youtube 'shorts' failure: id=3'`,
        youtubeLink: 'https://www.youtube.com/shorts/failure',
        axiosGetValueOnce: {
          data: '',
          status: 404
        },
        axiosGetWith: 'http://localhost:3000/video/shorts/failure',
        results: 'Tidak ada hasil',
        tweetIs: 'Tweet is: + 280'
      },
      {
        name: `youtube 'shorts' failure: id=4'`,
        // response status: 200
        youtubeLink: 'https://www.youtube.com/shorts/',
        axiosGetValueOnce: {
          data: '',
          status: 200
        },
        axiosGetWith: 'http://localhost:3000/video/shorts/',
        results: 'Tidak ada hasil',
        tweetIs: 'Tweet is: + 280'
      },
      {
        name: `youtube 'shorts' failure: id=5'`,
        // response status: 200
        youtubeLink: 'https://www.youtube.com/shorts',
        axiosGetValueOnce: {
          data: '',
          status: 200
        },
        axiosGetWith: 'http://localhost:3000/video/shorts',
        results: 'Tidak ada hasil',
        tweetIs: 'Tweet is: + 280'
      },
      {
        name: `youtube failure: id=6'`,
        // response status: 200
        youtubeLink: 'https://www.youtube.com/',
        axiosGetValueOnce: {
          data: '',
          status: 200
        },
        axiosGetWith: 'http://localhost:3000/video/watch?v=',
        results: 'Tidak ada hasil',
        tweetIs: 'Tweet is: + 280'
      },
      {
        name: `youtube failure: id=7'`,
        youtubeLink: 'https://www.youtube.com',
        axiosGetValueOnce: {
          data: '',
          status: 200
        },
        axiosGetWith: 'http://localhost:3000/video/watch?v=',
        results: 'Tidak ada hasil',
        tweetIs: 'Tweet is: + 280'
      },
      // // // Response.data => This video isn't available anymore
      // // // => http://localhost:3000/video/watch?v=watch?v=failure
      // // //                                         ------- x
      // {
      //   name: `youtube 'watch' failure: id=8'`,
      //   youtubeLink: 'https://www.youtube.com/watch?v=failure',
      //   axiosGetValueOnce: {
      //     data: '',
      //     status: 200
      //   },
      //   axiosGetWith: 'http://localhost:3000/video/watch?v=failure',
      //   results: 'Tidak ada hasil',
      //   tweetIs: 'Tweet is: + 280'
      // },
    ]

    for (let test of testCases) {
      console.debug('name:', test.name)
      // GET
      vi.spyOn(axios, 'get').mockResolvedValueOnce(test.axiosGetValueOnce)

      ceramahSingkatIslam.setValue(test.youtubeLink)
      await ceramahSingkatIslam.trigger('change')
      
      expect(axios.get).toHaveBeenCalledTimes(1)
      expect(axios.get).toHaveBeenCalledWith(test.axiosGetWith)
      
      // Wait until the DOM updates.
      await flushPromises()
      
      expect(results.element.value).toEqual(test.results)
      assert.equal(btnTweet.text(), test.tweetIs)
    }
  })
})

describe('App js: button reset', () => {
  it('button reset', async() => {
    // 1. textarea: ceramahSingkatIslam = '-'
    // 2. textarea: hasil = 'Tidak ada hasil'
    ceramahSingkatIslam.setValue('-')
    results.setValue('Tidak ada hasil')

    assert.equal(ceramahSingkatIslam.element.value, '-')
    assert.equal(results.element.value, 'Tidak ada hasil')
    await btnReset.trigger('click')

    assert.equal(ceramahSingkatIslam.element.value, '')
    assert.equal(results.element.value, '')
  })
})