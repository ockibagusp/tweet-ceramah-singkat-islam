import { describe, it, assert, expect, vi } from 'vitest'

import { mount, flushPromises } from '@vue/test-utils'
import App from '../App.vue'

import axios from 'axios'

// Judul #1: Kekuatan Doa - Ustadz Dr. Firanda Andirja #shorts
//                                                  -------
// Link: https://www.youtube.com/shorts/sqY-2c96UrI

// Judul #2: DOSA - Ustadz Dr. Firanda Andirja, MA                                
// Link: https://www.youtube.com/shorts/peUj47yc1xo

const wrapper = mount(App, {
  props: {},
  data() {
    return {
      // array: ceramah singkat Islam
      arrsCeramahSI: [
        // [0]
        {
          name: 'Test Zero',
          tweets: '#TestZero',
          url: '#',
          completed: false
        },
        // [1]
        {
          name: 'Test One',
          tweets: '#TestOne',
          url: '#',
          completed: false
        },
        // [2]
        {
          name: 'Test Two',
          tweets: '#TestTwo',
          url: '#',
          completed: false
        },
        // [3]
        {
          name: 'Test Three',
          tweets: '#TestThree',
          url: '#',
          completed: false
        },
        // [4]
        {
          name: 'Test Four',
          tweets: '#TestFour #Test4 #Four #4',
          url: '#',
          completed: false
        }
      ],
      // array: Ustadz
      arrsUstadz: [
        // [0]
        {
          name: 'Author One',
          tweets: '#AuthorOne',
          url: '#',
          completed: false
        },
        // [1]
        {
          name: 'Author Two',
          tweets: '#AuthorTwo',
          url: '#',
          completed: false
        },
        // [2]
        {
          name: 'AuthorThree',
          tweets: '#AuthorThree',
          url: '#',
          completed: false
        },
        // [3]
        {
          name: 'Author Four',
          tweets: '#AuthorFour',
          url: '#',
          completed: false
        },
        // [4]
        {
          name: 'Author Five',
          tweets: '#AuthorFive #Author5 #Five #5',
          url: '#',
          completed: false
        }
      ],
      arrStartCermTweets: [0],
      arrStartUstTweets: []
    }
  }
})

// textarea: ceramahSingkatIslam dan hasil
const ceramahSingkatIslam = wrapper.get('[data-test="ceramah-singkat-islam"]')
const results = wrapper.get('[data-test="results"]')

// array dan checkbox untuk ceramahSI
const arrayCeramahSI = wrapper.findAll('[data-test="array-ceramahSI"]')
const checkboxCeramahSI = wrapper.findAll('[data-test="ceramahSI-checkbox"]')

// array dan checkbox untuk ustadz
const arrayUstadz = wrapper.findAll('[data-test="array-ustadz"]')
const checkboxUstadz = wrapper.findAll('[data-test="ustadz-checkbox"]')

// button: btnReset dan btnCopy
const btnReset = wrapper.get('[data-test="btn-reset"]')
const btnCopy = wrapper.get('[data-test="btn-copy"]')

// button: btnTweet
const btnTweet = wrapper.get('[data-test="btn-tweet"]')

// button: btnCheckBoxAll diaktifkan atau tidak diaktifkan semua kotak centang
const btnCheckBoxAll = wrapper.find('[data-test="btn-checkbox-all"]')

// `semua kotak centang` diaktifkan
const allCheckboxesEnabled = wrapper.find('[data-test="all-checkboxes-enabled"]')

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

describe('App js: start tweet youtube video', () => {
  it('start tweet youtube video', async () => {
    // GET
    vi.spyOn(axios, 'get').mockResolvedValueOnce({
      data: '<meta name="title" content="Test Zero - Author One"><meta name="description" content=',
      status: 200
    })

    await ceramahSingkatIslam.setValue('https://www.youtube.com/shorts/0000')
    await ceramahSingkatIslam.trigger('change')

    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/video/shorts/0000')

    // Wait until the DOM updates.
    await flushPromises()

    // textarea hasil: test youtube.com
    expect(results.element.value).toEqual(`Test Zero - Author One #TestZero\n\nyoutu.be/0000`)
  })
})

describe('App js: reset tweet youtube video', async () => {
  it('reset tweet youtube video', async () => {
    // 1. textarea: ceramahSingkatIslam = '-'
    await ceramahSingkatIslam.setValue('-')
    // 2. textarea: hasil = 'Tidak ada hasil'
    await results.setValue('Tidak ada hasil')

    assert.equal(ceramahSingkatIslam.element.value, '-')
    assert.equal(results.element.value, 'Tidak ada hasil')

    await btnReset.trigger('click')
    assert.equal(ceramahSingkatIslam.element.value, '')
    assert.equal(results.element.value, '')

    // // default all arrayCemahaSI and all arrayUstadz: false
    //
    // // example: 
    // this.arrayCeramahSI.forEach(element => {
    //  element.completed = false
    // })
    for (let i = 0; i < arrayCeramahSI.length; i++) {
      expect(arrayCeramahSI.at(i).classes()).to.deep.equal([])
    }

    for (let i = 0; i < arrayUstadz.length; i++) {
      expect(arrayUstadz.at(i).classes()).to.deep.equal([])
    }
  })
})

describe('App js: tweet youtube video all', () => {
  it('tweet youtube video all', async () => {
    // test cases
    const testCases = [
      {
        name: `youtube 'shorts' success: id=1`,
        youtubeLink: 'https://www.youtube.com/shorts/1111',
        axiosGetValueOnce: {
          data: '<meta name="title" content="Test Zero - Author One"><meta name="description" content=',
          status: 200
        },
        axiosGetWith: 'http://localhost:3000/video/shorts/1111',
        results: `Test Zero - Author One #TestZero\n\nyoutu.be/1111`,
        tweetIs: 'Tweet is: + 233'
      },
      {
        name: `youtube 'watch' success: id=2'`,
        youtubeLink: 'https://www.youtube.com/watch?v=2222',
        axiosGetValueOnce: {
          data: '<meta name="title" content="Test One - Author One"><meta name="description" content=',
          status: 200
        },
        axiosGetWith: 'http://localhost:3000/video/watch?v=2222',
        results: `Test One - Author One #TestZero\n\nyoutu.be/2222`,
        tweetIs: 'Tweet is: + 234'
      },
      {
        name: `youtube '' success: id=3'`,
        youtubeLink: 'https://youtu.be/3333',
        axiosGetValueOnce: {
          data: '<meta name="title" content="Test Three - Author Two"><meta name="description" content=',
          status: 200
        },
        axiosGetWith: 'http://localhost:3000/video/watch?v=3333',
        results: `Test Three - Author Two #TestZero\n\nyoutu.be/3333`,
        tweetIs: 'Tweet is: + 232'
      },
      {
        name: `youtube 'shorts' success: id=4'`, // failure
        youtubeLink: 'https://www.youtube.com/shorts/4444&list=WL&index=157',
        axiosGetValueOnce: {
          data: '<meta name="title" content="Test Four - Author Three"><meta name="description" content=',
          status: 200
        },
        axiosGetWith: 'http://localhost:3000/video/shorts/4444',
        results: `Test Four - Author Three #TestZero\n\nyoutu.be/4444`,
        tweetIs: 'Tweet is: + 231'
      },
      {
        name: `youtube 'shorts' success: id=5'`,
        youtubeLink: 'https://youtube.com/shorts/5555?feature=share',
        axiosGetValueOnce: {
          data: '<meta name="title" content="Test Five - Author Four"><meta name="description" content=',
          status: 200
        },
        axiosGetWith: 'http://localhost:3000/video/shorts/5555',
        results: `Test Five - Author Four #TestZero\n\nyoutu.be/5555`,
        tweetIs: 'Tweet is: + 232'
      },
      {
        name: `youtube 'shorts' failure: id=6'`,
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
        name: `youtube 'watch' failure: id=7'`,
        youtubeLink: 'https://www.youtube.com/watch?v=failure',
        axiosGetValueOnce: {
          data: `This video isn't available anymore`,
          status: 200
        },
        axiosGetWith: 'http://localhost:3000/video/watch?v=failure',
        results: 'Tidak ada hasil',
        tweetIs: 'Tweet is: + 280'
      },
    ]

    for (let test of testCases) {
      console.debug('name:', test.name)
      // GET
      vi.spyOn(axios, 'get').mockResolvedValueOnce(test.axiosGetValueOnce)

      await ceramahSingkatIslam.setValue(test.youtubeLink)
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

describe('App js: button `semua kotak centang` di array untuk ceramahSI dan Ustadz: `diaktifkan` atau `tidak diaktifkan`', () => {
  it('button `semua kotak centang` di array untuk ceramahSI dan Ustadz: `diaktifkan` atau `tidak diaktifkan`', async () => {
    // GET
    vi.spyOn(axios, 'get').mockResolvedValueOnce({
      data: '<meta name="title" content="Test Two - Author Two"><meta name="description" content=',
      status: 200
    })
    await ceramahSingkatIslam.setValue('https://www.youtube.com/shorts/2222')
    await ceramahSingkatIslam.trigger('change')

    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/video/shorts/2222')

    // Wait until the DOM updates.
    await flushPromises()

    assert.equal(btnCheckBoxAll.text(), 'tidak diaktifkan')

    await btnCheckBoxAll.trigger('click')
    assert.equal(btnCheckBoxAll.text(), 'diaktifkan')
    assert.equal(results.element.value, 'Test Two - Author Two\n\nyoutu.be/2222')

    for (let i = 0; i < arrayCeramahSI.length; i++) {
      // same: assert.deepEqual(arrayCeramahSI.at(...).classes(), [])
      expect(arrayCeramahSI.at(i).classes()).to.deep.equal([])
    }

    for (let i = 0; i < arrayUstadz.length; i++) {
      // same: assert.deepEqual(arrayUstadz.at(...).classes(), [])
      expect(arrayUstadz.at(i).classes()).to.deep.equal([])
    }

    await btnCheckBoxAll.trigger('click')
    assert.equal(btnCheckBoxAll.text(), 'tidak diaktifkan')
    assert.equal(results.element.value, 'Test Two - Author Two #TestZero\n\nyoutu.be/2222')
    assert.equal(btnTweet.text(), 'Tweet is: + 234')
  })
})

describe('App js: button reset', () => {
  it('button reset', async () => {
    // 1. textarea: ceramahSingkatIslam = '-'
    // 2. textarea: hasil = 'Tidak ada hasil'
    await ceramahSingkatIslam.setValue('-')
    results.setValue('Tidak ada hasil')

    assert.equal(ceramahSingkatIslam.element.value, '-')
    assert.equal(results.element.value, 'Tidak ada hasil')
    await btnReset.trigger('click')

    assert.equal(ceramahSingkatIslam.element.value, '')
    assert.equal(results.element.value, '')
  })
})

describe('App js: textarea `hasil` untuk array untuk ceramah dan Ustadz', async () => {
  // ceramah
  it('add tweet youtube video', async () => {
    // GET
    vi.spyOn(axios, 'get').mockResolvedValueOnce({
      data: '<meta name="title" content="Test Two - Author Two"><meta name="description" content=',
      status: 200
    })
    await ceramahSingkatIslam.setValue('https://www.youtube.com/shorts/0000')
    await ceramahSingkatIslam.trigger('change')

    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/video/shorts/0000')

    // Wait until the DOM updates.
    await flushPromises()

    // textarea hasil: test youtube.com
    expect(results.element.value).toEqual('Test Two - Author Two #TestZero\n\nyoutu.be/0000')
  })

  it('App js: textarea `hasil` untuk array untuk ceramah singkat: dicentang', async () => {
    assert.equal(results.element.value, 'Test Two - Author Two #TestZero\n\nyoutu.be/0000')

    // test cases
    const testCases = [
      {
        name: 'Test Three',
        index: 3,
        listBool: [true, false, false, true, false],
        hasil: `Test Two - Author Two #TestZero #TestThree\n\nyoutu.be/0000`,
        tweetIs: 'Tweet is: + 223',
        allCheckboxesEnabled: 'diaktifkan: 2'
      },
      {
        name: 'Test Four',
        index: 4,
        listBool: [true, false, false, true, true],
        hasil: `Test Two - Author Two #TestZero #TestThree #TestFour #Test4 #Four #4\n\nyoutu.be/0000`,
        tweetIs: 'Tweet is: + 197',
        allCheckboxesEnabled: 'diaktifkan: 3'
      },
      {
        name: 'Test One',
        index: 1,
        listBool: [true, true, false, true, true],
        hasil: `Test Two - Author Two #TestZero #TestOne #TestThree #TestFour #Test4 #Four #4\n\nyoutu.be/0000`,
        tweetIs: 'Tweet is: + 188',
        allCheckboxesEnabled: 'diaktifkan: 4'
      },
      {
        name: 'Test Two',
        index: 2,
        listBool: [true, true, true, true, true],
        hasil: 'Test Two - Author Two #TestZero #TestOne #TestTwo #TestThree #TestFour #Test4 #Four #4\n\nyoutu.be/0000',
        tweetIs: 'Tweet is: + 179',
        allCheckboxesEnabled: 'diaktifkan: 5'
      }
    ]

    for (let test of testCases) {
      console.debug('checked ke-', test.name)
      await checkboxCeramahSI.at(test.index).setValue(true)

      for (let i = 0; i < test.listBool.length; i++) {
        if (test.listBool[i]) {
          expect(arrayCeramahSI.at(i).classes()).toContain('completed')
        } else {
          // same: assert.deepEqual(arrayCeramahSI.at(...).classes(), [])
          expect(arrayCeramahSI.at(i).classes()).to.deep.equal([])
        }

        assert.equal(btnTweet.text(), test.tweetIs)
      }

      assert.equal(results.element.value, test.hasil)
      // `semua kotak centang` diaktifkan
      assert.equal(allCheckboxesEnabled.text(), test.allCheckboxesEnabled)
    }
  })

  it('App js: textarea `hasil` untuk array untuk ceramah singkat: tidak dicentang', async () => {
    console.debug('-----')

    // textarea hasil: test youtube.com
    expect(results.element.value).toEqual('Test Two - Author Two #TestZero #TestOne #TestTwo #TestThree #TestFour #Test4 #Four #4\n\nyoutu.be/0000')

    // test cases
    const testCases = [
      {
        name: 'Test Zero',
        index: 0,
        listBool: [false, true, true, true, true],
        results: 'Test Two - Author Two #TestOne #TestTwo #TestThree #TestFour #Test4 #Four #4\n\nyoutu.be/0000',
        tweetIs: 'Tweet is: + 189',
        // `semua kotak centang` diaktifkan
        allCheckboxesEnabled: 'diaktifkan: 4'
      },
      {
        name: 'Test One',
        index: 1,
        listBool: [false, false, true, true, true],
        results: 'Test Two - Author Two #TestTwo #TestThree #TestFour #Test4 #Four #4\n\nyoutu.be/0000',
        tweetIs: 'Tweet is: + 198',
        allCheckboxesEnabled: 'diaktifkan: 3'
      },
      {
        name: 'Test Four',
        index: 4,
        listBool: [false, false, true, true, false],
        results: `Test Two - Author Two #TestTwo #TestThree\n\nyoutu.be/0000`,
        tweetIs: 'Tweet is: + 224',
        allCheckboxesEnabled: 'diaktifkan: 2'
      },
      {
        name: 'Test Two',
        index: 2,
        listBool: [false, false, false, true, false],
        results: 'Test Two - Author Two #TestThree\n\nyoutu.be/0000',
        tweetIs: 'Tweet is: + 233',
        allCheckboxesEnabled: 'diaktifkan: 1'
      }
    ]

    for (let test of testCases) {
      console.debug('unchecked ke-', test.name)
      await checkboxCeramahSI.at(test.index).setValue(false)

      for (let i = 0; i < test.listBool.length; i++) {
        if (test.listBool[i]) {
          expect(arrayCeramahSI.at(i).classes()).toContain('completed')
        } else {
          // same: assert.deepEqual(arrayCeramahSI.at(...).classes(), [])
          expect(arrayCeramahSI.at(i).classes()).to.deep.equal([])
        }
      }

      assert.equal(results.element.value, test.results)
      assert.equal(btnTweet.text(), test.tweetIs)
      // `semua kotak centang` diaktifkan
      assert.equal(allCheckboxesEnabled.text(), test.allCheckboxesEnabled)
    }
  })

  it('App js: textarea `hasil` untuk array untuk ustadz: dicentang', async () => {
    assert.equal(results.element.value, 'Test Two - Author Two #TestThree\n\nyoutu.be/0000')

    // test cases
    const testCases = [
      {
        name: 'Author Three',
        index: 3,
        listBool: [false, false, false, true],
        hasil: `Test Two - Author Two #TestThree #AuthorFour\n\nyoutu.be/0000`,
        tweetIs: 'Tweet is: + 221',
        allCheckboxesEnabled: 'diaktifkan: 2'
      },
      {
        name: 'Author One',
        index: 1,
        listBool: [false, true, false, true],
        hasil: `Test Two - Author Two #TestThree #AuthorTwo #AuthorFour\n\nyoutu.be/0000`,
        tweetIs: 'Tweet is: + 210',
        allCheckboxesEnabled: 'diaktifkan: 3'
      },
      {
        name: 'Author Two',
        index: 2,
        listBool: [false, true, true, true],
        hasil: 'Test Two - Author Two #TestThree #AuthorTwo #AuthorThree #AuthorFour\n\nyoutu.be/0000',
        tweetIs: 'Tweet is: + 197',
        allCheckboxesEnabled: 'diaktifkan: 4'
      }
    ]

    for (let test of testCases) {
      console.debug('checked ke-', test.name)
      await checkboxUstadz.at(test.index).setValue(true)

      for (let i = 0; i < test.listBool.length; i++) {
        if (test.listBool[i]) {
          expect(arrayUstadz.at(i).classes()).toContain('completed')
        } else {
          // same: assert.deepEqual(arrayUstadz.at(...).classes(), [])
          expect(arrayUstadz.at(i).classes()).to.deep.equal([])
        }

        assert.equal(btnTweet.text(), test.tweetIs)
      }

      assert.equal(results.element.value, test.hasil)
      // `semua kotak centang` diaktifkan
      assert.equal(allCheckboxesEnabled.text(), test.allCheckboxesEnabled)
    }
  })

  it('App js: textarea `hasil` untuk array untuk ustadz: tidak dicentang', async () => {
    assert.equal(results.element.value, 'Test Two - Author Two #TestThree #AuthorTwo #AuthorThree #AuthorFour\n\nyoutu.be/0000')

    // test cases
    const testCases = [
      {
        name: 'Author One',
        index: 1,
        listBool: [false, false, true, true],
        hasil: `Test Two - Author Two #TestThree #AuthorThree #AuthorFour\n\nyoutu.be/0000`,
        tweetIs: 'Tweet is: + 208',
        allCheckboxesEnabled: 'diaktifkan: 3'
      },
      {
        name: 'Author Three',
        index: 3,
        listBool: [false, false, true, false],
        hasil: `Test Two - Author Two #TestThree #AuthorThree\n\nyoutu.be/0000`,
        tweetIs: 'Tweet is: + 220',
        allCheckboxesEnabled: 'diaktifkan: 2'
      },
      {
        name: 'Author Two',
        index: 2,
        listBool: [false, false, false, false],
        hasil: 'Test Two - Author Two #TestThree\n\nyoutu.be/0000',
        tweetIs: 'Tweet is: + 233',
        allCheckboxesEnabled: 'diaktifkan: 1'
      },
      {
        name: 'Author Five',
        index: 2,
        listBool: [false, false, false, false],
        hasil: 'Test Two - Author Two #TestThree\n\nyoutu.be/0000',
        tweetIs: 'Tweet is: + 233',
        allCheckboxesEnabled: 'diaktifkan: 1'
      }
    ]

    for (let test of testCases) {
      console.debug('unchecked ke-', test.name)
      await checkboxUstadz.at(test.index).setValue(false)

      for (let i = 0; i < test.listBool.length; i++) {
        if (test.listBool[i]) {
          expect(arrayUstadz.at(i).classes()).toContain('completed')
        } else {
          // same: assert.deepEqual(arrayUstadz.at(...).classes(), [])
          expect(arrayUstadz.at(i).classes()).to.deep.equal([])
        }
      }

      assert.equal(results.element.value, test.hasil)
      assert.equal(btnTweet.text(), test.tweetIs)
      // `semua kotak centang` diaktifkan
      assert.equal(allCheckboxesEnabled.text(), test.allCheckboxesEnabled)
    }
  })
})

describe('App js: tweet youtube video query delimiter: te.st/one?foo and te.st/one?foo&bar', () => {
  it('tweet youtube video query delimiter: te.st/one?foo and te.st/one?foo&bar', async () => {
    // test cases
    const testCases = [
      // &list=WL&index=0123...
      {
        name: `youtube 'watch' success: id=1 &list=WL&index=1'`,
        youtubeLink: 'https://www.youtube.com/watch?v=8888&list=WL&index=1',
        axiosGetValueOnce: {
          data: '<meta name="title" content="Test Zero - Author One"><meta name="description" content=',
          status: 200
        },
        axiosGetWith: 'http://localhost:3000/video/watch?v=8888',
        results: `Test Zero - Author One #TestZero\n\nyoutu.be/8888`,
        tweetIs: 'Tweet is: + 233'
      },
      // ?feature=share
      {
        name: `youtube 'shorts' success: id=1 query=?feature=share`,
        youtubeLink: 'https://www.youtube.com/shorts/1111?feature=share',
        axiosGetValueOnce: {
          data: '<meta name="title" content="Test Zero - Author One"><meta name="description" content=',
          status: 200
        },
        axiosGetWith: 'http://localhost:3000/video/shorts/1111',
        results: `Test Zero - Author One #TestZero\n\nyoutu.be/1111`,
        tweetIs: 'Tweet is: + 233'
      },
      {
        name: `youtube 'watch' success: id=2 ?feature=share'`,
        youtubeLink: 'https://www.youtube.com/watch?v=2222?feature=share',
        axiosGetValueOnce: {
          data: '<meta name="title" content="Test One - Author One"><meta name="description" content=',
          status: 200
        },
        axiosGetWith: 'http://localhost:3000/video/watch?v=2222',
        results: `Test One - Author One #TestZero\n\nyoutu.be/2222`,
        tweetIs: 'Tweet is: + 234'
      },
      {
        name: `youtube 'watch' success: id=3 ?feature=share'`,
        youtubeLink: 'https://youtu.be/3333?feature=share',
        axiosGetValueOnce: {
          data: '<meta name="title" content="Test Three - Author Two"><meta name="description" content=',
          status: 200
        },
        axiosGetWith: 'http://localhost:3000/video/watch?v=3333',
        results: `Test Three - Author Two #TestZero\n\nyoutu.be/3333`,
        tweetIs: 'Tweet is: + 232'
      },
      // &t=1s
      {
        name: `youtube 'shorts' success: id=1 query=&t=1s`,
        youtubeLink: 'https://www.youtube.com/shorts/1111&t=1s',
        axiosGetValueOnce: {
          data: '<meta name="title" content="Test Zero - Author One"><meta name="description" content=',
          status: 200
        },
        axiosGetWith: 'http://localhost:3000/video/shorts/1111',
        results: `Test Zero - Author One #TestZero\n\nyoutu.be/1111`,
        tweetIs: 'Tweet is: + 233'
      },
      {
        name: `youtube 'watch' success: id=2 &t=1s'`,
        youtubeLink: 'https://www.youtube.com/watch?v=2222&t=1s',
        axiosGetValueOnce: {
          data: '<meta name="title" content="Test One - Author One"><meta name="description" content=',
          status: 200
        },
        axiosGetWith: 'http://localhost:3000/video/watch?v=2222',
        results: `Test One - Author One #TestZero\n\nyoutu.be/2222`,
        tweetIs: 'Tweet is: + 234'
      },
      {
        name: `youtube 'watch' success: id=3 &t=1s'`,
        youtubeLink: 'https://youtu.be/3333&t=1s',
        axiosGetValueOnce: {
          data: '<meta name="title" content="Test Three - Author Two"><meta name="description" content=',
          status: 200
        },
        axiosGetWith: 'http://localhost:3000/video/watch?v=3333',
        results: `Test Three - Author Two #TestZero\n\nyoutu.be/3333`,
        tweetIs: 'Tweet is: + 232'
      }
    ]

    for (let test of testCases) {
      console.debug('name:', test.name)
      // GET
      vi.spyOn(axios, 'get').mockResolvedValueOnce(test.axiosGetValueOnce)

      await ceramahSingkatIslam.setValue(test.youtubeLink)
      await ceramahSingkatIslam.trigger('change')

      expect(axios.get).toHaveBeenCalledTimes(1)
      expect(axios.get).toHaveBeenCalledWith(test.axiosGetWith)

      // Wait until the DOM updates.
      await flushPromises()

      expect(results.element.value).toEqual(test.results)
      assert.equal(btnTweet.text(), test.tweetIs)

      await checkboxCeramahSI.at(1).setValue(true)
      expect(arrayCeramahSI.at(1).classes()).toContain('completed')

      await checkboxCeramahSI.at(1).setValue(false)
      expect(arrayUstadz.at(1).classes()).to.deep.equal([])

      expect(results.element.value).toEqual(test.results)
      assert.equal(btnTweet.text(), test.tweetIs)
    }
  })
})

describe('App js: untuk ceramah dan Ustadz: #Shots (#shots, dll) satu aja', async () => {
  // ceramah
  it('untuk ceramah dan Ustadz: #Shots (#shots, dll) satu aja', async () => {
    // GET
    vi.spyOn(axios, 'get').mockResolvedValueOnce({
      data: '<meta name="title" content="Test Four - Author Four #testFour #4"><meta name="description" content=',
      status: 200
    })
    await ceramahSingkatIslam.setValue('https://www.youtube.com/shorts/4444')
    await ceramahSingkatIslam.trigger('change')

    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/video/shorts/4444')

    // Wait until the DOM updates.
    await flushPromises()

    // textarea hasil: test youtube.com
    expect(results.element.value).toEqual('Test Four - Author Four #testFour #4 #TestZero\n\nyoutu.be/4444')

    // caramah: dimatikan #TestZero
    await checkboxCeramahSI.at(0).setValue(false)
    expect(arrayCeramahSI.at(0).classes()).to.deep.equal([])
    expect(results.element.value).toEqual('Test Four - Author Four #testFour #4\n\nyoutu.be/4444')

    // caramah: diaktifkan #TestFour
    await checkboxCeramahSI.at(4).setValue(true)
    expect(arrayCeramahSI.at(0).classes()).to.deep.equal([])
    expect(arrayCeramahSI.at(1).classes()).to.deep.equal([])
    expect(arrayCeramahSI.at(2).classes()).to.deep.equal([])
    expect(arrayCeramahSI.at(3).classes()).to.deep.equal([])
    expect(arrayCeramahSI.at(4).classes()).toContain('completed')
    expect(results.element.value).toEqual('Test Four - Author Four #testFour #4 #Test4 #Four\n\nyoutu.be/4444')
  })

  it('button tweet youtube video', async () => {
    const UTF8Hash = 'Test One - Author One #TestZero\n\nyoutu.be/1111'
      .replaceAll('\/', '%2F')
      .replaceAll(':', '%3A')
      .replaceAll(' #', '%20%23')
      .replaceAll('|', '%7C')
      .replaceAll('# ', '%23%20')
      .replaceAll(' # ', '%20%23%20')
      .replaceAll(' ', '%20')

    let UTF8HashArray = UTF8Hash
      .split('\n\n')

    let UTF8HashReal = UTF8HashArray.join('%20')

    assert.equal(UTF8HashReal, 'Test%20One%20-%20Author%20One%20%23TestZero%20youtu.be%2F1111')
  })
})

describe('App js: textarea ceramahSingkatIslam: "https://www.youtube.com/shorts/peUj47yc1xo" to "https://youtu.be/-mD93UwO_40"', async () => {
  // ceramah
  it('textarea ceramahSingkatIslam moved: Test #1', async () => {
    // GET
    vi.spyOn(axios, 'get').mockResolvedValueOnce({
      data: '<meta name="title" content="Test #1 - Author One"><meta name="description" content=',
      status: 200
    })
    await ceramahSingkatIslam.setValue('https://www.youtube.com/shorts/12345')
    await ceramahSingkatIslam.trigger('change')

    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/video/shorts/12345')

    // Wait until the DOM updates.
    await flushPromises()
    // textarea hasil: test youtube.com
    expect(results.element.value).toEqual('Test #1 - Author One #TestZero\n\nyoutu.be/12345')

    expect(arrayCeramahSI.at(0).classes()).toContain('completed')
    expect(arrayCeramahSI.at(1).classes()).to.deep.equal([])
    expect(arrayCeramahSI.at(2).classes()).to.deep.equal([])
    expect(arrayCeramahSI.at(3).classes()).to.deep.equal([])

    await checkboxCeramahSI.at(3).setValue(true)
    expect(arrayCeramahSI.at(0).classes()).toContain('completed')
    expect(arrayCeramahSI.at(1).classes()).to.deep.equal([])
    expect(arrayCeramahSI.at(2).classes()).to.deep.equal([])
    expect(arrayCeramahSI.at(3).classes()).toContain('completed')
    expect(results.element.value).toEqual('Test #1 - Author One #TestZero #TestThree\n\nyoutu.be/12345')
  })

  it('textarea ceramahSingkatIslam moved: Test #2', async () => {
    // GET
    vi.spyOn(axios, 'get').mockResolvedValueOnce({
      data: '<meta name="title" content="Test #2 - Author Two"><meta name="description" content=',
      status: 200
    })
    await ceramahSingkatIslam.setValue('https://www.youtube.com/shorts/54321')
    await ceramahSingkatIslam.trigger('change')

    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/video/shorts/54321')

    // Wait until the DOM updates.
    await flushPromises()
    // textarea hasil: test youtube.com
    expect(results.element.value).toEqual('Test #2 - Author Two #TestZero\n\nyoutu.be/54321')

    expect(arrayCeramahSI.at(0).classes()).toContain('completed')
    expect(arrayCeramahSI.at(1).classes()).to.deep.equal([])
    expect(arrayCeramahSI.at(2).classes()).to.deep.equal([])
    expect(arrayCeramahSI.at(3).classes()).to.deep.equal([])

    expect(results.element.value).toEqual('Test #2 - Author Two #TestZero\n\nyoutu.be/54321')
  })
})

describe('App js: textarea ceramahSingkatIslam: "https://youtu.be//-mD93UwO_40" to "https://youtu.be/-mD93UwO_40"', async () => {
  // ceramah
  it('textarea ceramahSingkatIslam delete "/": Test #3', async () => {
    // GET
    vi.spyOn(axios, 'get').mockResolvedValueOnce({
      data: '<meta name="title" content="Test #3 - Author Three"><meta name="description" content=',
      status: 200
    })
    await ceramahSingkatIslam.setValue('https://www.youtube.com/shorts/321')
    await ceramahSingkatIslam.trigger('change')

    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/video/shorts/321')

    // Wait until the DOM updates.
    await flushPromises()
    // textarea hasil: test youtube.com
    expect(results.element.value).toEqual('Test #3 - Author Three #TestZero\n\nyoutu.be/321')

    expect(arrayCeramahSI.at(0).classes()).toContain('completed')
    expect(arrayCeramahSI.at(1).classes()).to.deep.equal([])
    expect(arrayCeramahSI.at(2).classes()).to.deep.equal([])
    expect(arrayCeramahSI.at(3).classes()).to.deep.equal([])

    await checkboxCeramahSI.at(3).setValue(true)
    expect(arrayCeramahSI.at(0).classes()).toContain('completed')
    expect(arrayCeramahSI.at(1).classes()).to.deep.equal([])
    expect(arrayCeramahSI.at(2).classes()).to.deep.equal([])
    expect(arrayCeramahSI.at(3).classes()).toContain('completed')
    expect(results.element.value).toEqual('Test #3 - Author Three #TestZero #TestThree\n\nyoutu.be/321')
  })
})

describe('App js: textarea ceramahSingkatIslam: "https://youtube.com/shorts/peUj47yc1xo?feature=share"', async () => {
  it('textarea ceramahSingkatIslam moved feature: Test #4', async () => {
    // GET
    vi.spyOn(axios, 'get').mockResolvedValueOnce({
      data: '<meta name="title" content="Test #4 - Author Three"><meta name="description" content=',
      status: 200
    })
    await ceramahSingkatIslam.setValue('https://www.youtube.com/shorts/4321?feature=share')
    await ceramahSingkatIslam.trigger('change')

    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/video/shorts/4321')

    // Wait until the DOM updates.
    await flushPromises()
    expect(results.element.value).toEqual('Test #4 - Author Three #TestZero\n\nyoutu.be/4321')

    await checkboxCeramahSI.at(2).setValue(true)
    expect(arrayCeramahSI.at(0).classes()).toContain('completed')
    expect(arrayCeramahSI.at(1).classes()).to.deep.equal([])
    expect(arrayCeramahSI.at(2).classes()).toContain('completed')
    expect(arrayCeramahSI.at(3).classes()).to.deep.equal([])

    expect(results.element.value).toEqual('Test #4 - Author Three #TestZero #TestTwo\n\nyoutu.be/4321')
  })
})