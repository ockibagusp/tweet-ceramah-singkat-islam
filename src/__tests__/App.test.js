import { describe, it, assert, expect, vi } from 'vitest'

import { mount, flushPromises } from '@vue/test-utils'
import App from '../App.vue'

import axios from 'axios'

// Judul: Kekuatan Doa - Ustadz Dr. Firanda Andirja #shorts
//                                                  -------
// Link: https://www.youtube.com/shorts/sqY-2c96UrI

const wrapper = mount(App, {
  props: {},
  data() {
    return {
      // array: ceramah singkat Islam
      arrayCeramahSI: [
        {
          name: 'Test Zero',
          tweets: '#TestZero',
          url: '#',
          completed: false
        },
        {
          name: 'Test One',
          tweets: '#TestOne',
          url: '#',
          completed: false
        },
        {
          name: 'Test Two',
          tweets: '#TestTwo',
          url: '#',
          completed: false
        },
        {
          name: 'Test Three',
          tweets: '#TestThree',
          url: '#',
          completed: false
        },
        {
          name: 'Test Four',
          tweets: '#TestFour #Test4 #Four #4',
          url: '#',
          completed: false
        }
      ],
      // array: Ustadz
      arrayUstadz: [
        {
          name: 'Author One',
          tweets: '#AuthorOne',
          url: '#',
          completed: false
        },
        {
          name: 'Author Two',
          tweets: '#AuthorTwo',
          url: '#',
          completed: false
        },
        {
          name: 'AuthorThree',
          tweets: '#AuthorThree',
          url: '#',
          completed: false
        },
        {
          name: 'Author Four',
          tweets: '#AuthorFour',
          url: '#',
          completed: false
        }
      ]
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

describe('App js: delete tweet youtube video', () => {
  it('delete tweet youtube video', async () => {
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
    expect(results.element.value).toEqual(`Test Zero - Author One #TestZero\n\nhttps://youtu.be/0000`)
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
        results: `Test Zero - Author One #TestZero\n\nhttps://youtu.be/1111`,
        tweetIs: 'Tweet is: + 225'
      },
      {
        name: `youtube 'watch' success: id=2'`,
        youtubeLink: 'https://www.youtube.com/watch?v=2222',
        axiosGetValueOnce: {
          data: '<meta name="title" content="Test One - Author One"><meta name="description" content=',
          status: 200
        },
        axiosGetWith: 'http://localhost:3000/video/watch?v=2222',
        results: `Test One - Author One #TestZero\n\nhttps://youtu.be/2222`,
        tweetIs: 'Tweet is: + 226'
      },
      {
        name: `youtube 'watch' success: id=3'`,
        youtubeLink: 'https://youtu.be/3333',
        axiosGetValueOnce: {
          data: '<meta name="title" content="Test Three - Author Two"><meta name="description" content=',
          status: 200
        },
        axiosGetWith: 'http://localhost:3000/video/watch?v=3333',
        results: `Test Three - Author Two #TestZero\n\nhttps://youtu.be/3333`,
        tweetIs: 'Tweet is: + 224'
      },
      {
        name: `youtube 'shorts' failure: id=4'`,
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
        name: `youtube 'watch' failure: id=5'`,
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
    assert.equal(results.element.value, 'Test Two - Author Two\n\nhttps://youtu.be/2222')

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
    assert.equal(results.element.value, 'Test Two - Author Two #TestZero\n\nhttps://youtu.be/2222')
    assert.equal(btnTweet.text(), 'Tweet is: + 249')
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
    expect(results.element.value).toEqual('Test Two - Author Two #TestZero\n\nhttps://youtu.be/0000')
  })

  it('App js: textarea `hasil` untuk array untuk ceramah singkat: dicentang', async () => {
    assert.equal(results.element.value, 'Test Two - Author Two #TestZero\n\nhttps://youtu.be/0000')

    // test cases
    const testCases = [
      {
        name: 'Test Three',
        index: 3,
        listBool: [true, false, false, true],
        hasil: `Test Two - Author Two #TestZero #TestThree\n\nhttps://youtu.be/0000`,
        tweetIs: 'Tweet is: + 215',
        allCheckboxesEnabled: 'diaktifkan: 2'
      },
      {
        name: 'Test One',
        index: 1,
        listBool: [true, true, false, true],
        hasil: `Test Two - Author Two #TestZero #TestOne #TestThree\n\nhttps://youtu.be/0000`,
        tweetIs: 'Tweet is: + 206',
        allCheckboxesEnabled: 'diaktifkan: 3'
      },
      {
        name: 'Test Two',
        index: 2,
        listBool: [true, true, true, true],
        hasil: 'Test Two - Author Two #TestZero #TestOne #TestTwo #TestThree\n\nhttps://youtu.be/0000',
        tweetIs: 'Tweet is: + 197',
        allCheckboxesEnabled: 'diaktifkan: 4'
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
    expect(results.element.value).toEqual('Test Two - Author Two #TestZero #TestOne #TestTwo #TestThree\n\nhttps://youtu.be/0000')

    // test cases
    const testCases = [
      {
        name: 'Test Zero',
        index: 0,
        listBool: [false, true, true, true],
        results: 'Test Two - Author Two #TestOne #TestTwo #TestThree\n\nhttps://youtu.be/0000',
        tweetIs: 'Tweet is: + 207',
        // `semua kotak centang` diaktifkan
        allCheckboxesEnabled: 'diaktifkan: 3'
      },
      {
        name: 'Test One',
        index: 1,
        listBool: [false, false, true, true],
        results: 'Test Two - Author Two #TestTwo #TestThree\n\nhttps://youtu.be/0000',
        tweetIs: 'Tweet is: + 216',
        allCheckboxesEnabled: 'diaktifkan: 2'
      },
      {
        name: 'Test Two',
        index: 2,
        listBool: [false, false, false, true],
        results: 'Test Two - Author Two #TestThree\n\nhttps://youtu.be/0000',
        tweetIs: 'Tweet is: + 225',
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

  // ustadz
  it('App js: textarea `hasil` untuk array untuk ustadz: dicentang', async () => {
    assert.equal(results.element.value, 'Test Two - Author Two #TestThree\n\nhttps://youtu.be/0000')

    // test cases
    const testCases = [
      {
        name: 'Author Three',
        index: 3,
        listBool: [false, false, false, true],
        hasil: `Test Two - Author Two #TestThree #AuthorFour\n\nhttps://youtu.be/0000`,
        tweetIs: 'Tweet is: + 213',
        allCheckboxesEnabled: 'diaktifkan: 2'
      },
      {
        name: 'Author One',
        index: 1,
        listBool: [false, true, false, true],
        hasil: `Test Two - Author Two #TestThree #AuthorTwo #AuthorFour\n\nhttps://youtu.be/0000`,
        tweetIs: 'Tweet is: + 202',
        allCheckboxesEnabled: 'diaktifkan: 3'
      },
      {
        name: 'Author Two',
        index: 2,
        listBool: [false, true, true, true],
        hasil: 'Test Two - Author Two #TestThree #AuthorTwo #AuthorThree #AuthorFour\n\nhttps://youtu.be/0000',
        tweetIs: 'Tweet is: + 189',
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
    assert.equal(results.element.value, 'Test Two - Author Two #TestThree #AuthorTwo #AuthorThree #AuthorFour\n\nhttps://youtu.be/0000')

    // test cases
    const testCases = [
      {
        name: 'Author One',
        index: 1,
        listBool: [false, false, true, true],
        hasil: `Test Two - Author Two #TestThree #AuthorThree #AuthorFour\n\nhttps://youtu.be/0000`,
        tweetIs: 'Tweet is: + 200',
        allCheckboxesEnabled: 'diaktifkan: 3'
      },
      {
        name: 'Author Three',
        index: 3,
        listBool: [false, false, true, false],
        hasil: `Test Two - Author Two #TestThree #AuthorThree\n\nhttps://youtu.be/0000`,
        tweetIs: 'Tweet is: + 212',
        allCheckboxesEnabled: 'diaktifkan: 2'
      },
      {
        name: 'Author Two',
        index: 2,
        listBool: [false, false, false, false],
        hasil: 'Test Two - Author Two #TestThree\n\nhttps://youtu.be/0000',
        tweetIs: 'Tweet is: + 225',
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
      // ?feature=share
      {
        name: `youtube 'shorts' success: id=1 query=?feature=share`,
        youtubeLink: 'https://www.youtube.com/shorts/1111?feature=share',
        axiosGetValueOnce: {
          data: '<meta name="title" content="Test Zero - Author One"><meta name="description" content=',
          status: 200
        },
        axiosGetWith: 'http://localhost:3000/video/shorts/1111',
        results: `Test Zero - Author One #TestZero\n\nhttps://youtu.be/1111`,
        tweetIs: 'Tweet is: + 225'
      },
      {
        name: `youtube 'watch' success: id=2 ?feature=share'`,
        youtubeLink: 'https://www.youtube.com/watch?v=2222?feature=share',
        axiosGetValueOnce: {
          data: '<meta name="title" content="Test One - Author One"><meta name="description" content=',
          status: 200
        },
        axiosGetWith: 'http://localhost:3000/video/watch?v=2222',
        results: `Test One - Author One #TestZero\n\nhttps://youtu.be/2222`,
        tweetIs: 'Tweet is: + 226'
      },
      {
        name: `youtube 'watch' success: id=3 ?feature=share'`,
        youtubeLink: 'https://youtu.be/3333?feature=share',
        axiosGetValueOnce: {
          data: '<meta name="title" content="Test Three - Author Two"><meta name="description" content=',
          status: 200
        },
        axiosGetWith: 'http://localhost:3000/video/watch?v=3333',
        results: `Test Three - Author Two #TestZero\n\nhttps://youtu.be/3333`,
        tweetIs: 'Tweet is: + 224'
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
        results: `Test Zero - Author One #TestZero\n\nhttps://youtu.be/1111`,
        tweetIs: 'Tweet is: + 225'
      },
      {
        name: `youtube 'watch' success: id=2 &t=1s'`,
        youtubeLink: 'https://www.youtube.com/watch?v=2222&t=1s',
        axiosGetValueOnce: {
          data: '<meta name="title" content="Test One - Author One"><meta name="description" content=',
          status: 200
        },
        axiosGetWith: 'http://localhost:3000/video/watch?v=2222',
        results: `Test One - Author One #TestZero\n\nhttps://youtu.be/2222`,
        tweetIs: 'Tweet is: + 226'
      },
      {
        name: `youtube 'watch' success: id=3 &t=1s'`,
        youtubeLink: 'https://youtu.be/3333&t=1s',
        axiosGetValueOnce: {
          data: '<meta name="title" content="Test Three - Author Two"><meta name="description" content=',
          status: 200
        },
        axiosGetWith: 'http://localhost:3000/video/watch?v=3333',
        results: `Test Three - Author Two #TestZero\n\nhttps://youtu.be/3333`,
        tweetIs: 'Tweet is: + 224'
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
      data: '<meta name="title" content="Test Four - Author Four #TestFour #4"><meta name="description" content=',
      status: 200
    })
    await ceramahSingkatIslam.setValue('https://www.youtube.com/shorts/4444')
    await ceramahSingkatIslam.trigger('change')

    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/video/shorts/4444')

    // Wait until the DOM updates.
    await flushPromises()

    // textarea hasil: test youtube.com
    expect(results.element.value).toEqual('Test Four - Author Four #TestFour #4 #TestZero\n\nhttps://youtu.be/4444')

    // caramah: dimatikan #TestZero
    await checkboxCeramahSI.at(0).setValue(false)
    expect(arrayCeramahSI.at(0).classes()).to.deep.equal([])
    expect(results.element.value).toEqual('Test Four - Author Four #TestFour #4\n\nhttps://youtu.be/4444')

    // caramah: diaktifkan #TestFour
    await checkboxCeramahSI.at(4).setValue(true)
    expect(arrayCeramahSI.at(4).classes()).toContain('completed')
    expect(results.element.value).toEqual('Test Four - Author Four #TestFour #4 #Test4 #Four\n\nhttps://youtu.be/4444')
  })
})