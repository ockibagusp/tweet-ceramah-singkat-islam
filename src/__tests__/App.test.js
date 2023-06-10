import { describe, it, assert, expect, vi } from 'vitest'

import { mount, flushPromises } from '@vue/test-utils'
import App from '../App.vue'

import axios from 'axios'

const wrapper = mount(App, {
  props: { } 
})

// textarea: ceramahSingkatIslam dan hasil
const ceramahSingkatIslam = wrapper.get('[data-test="ceramah-singkat-islam"]')
const results = wrapper.get('[data-test="results"]')

// array dan checkbox untuk ceramahSI
const arrayCeramahSI = wrapper.findAll('[data-test="array-ceramahSI"]')
const checkboxCeramahSI = wrapper.findAll('[data-test="ceramahSI-checkbox"]')

// button: btnReset dan btnCopy
const btnReset = wrapper.get('[data-test="btn-reset"]') 
const btnCopy = wrapper.get('[data-test="btn-copy"]')

// button: btnTweet
const btnTweet = wrapper.get('[data-test="btn-tweet"]')

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
  it('delete tweet youtube video', async() => {
    // GET
    vi.spyOn(axios, 'get').mockResolvedValueOnce({
      data: '<meta name="title" content="DOSA - Ustadz Dr. Firanda Andirja, MA"><meta name="description" content=',
      status: 200
    })

    await ceramahSingkatIslam.setValue('https://www.youtube.com/shorts/peUj47yc1xo')
    await ceramahSingkatIslam.trigger('change')
  
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/video/shorts/peUj47yc1xo')
  
    // Wait until the DOM updates.
    await flushPromises()
  
    // textarea hasil: test youtube.com
    expect(results.element.value).toEqual(`DOSA - Ustadz Dr. Firanda Andirja, MA #CeramahPendek #Shorts #Video #YouTube\n\nhttps://www.youtube.com/shorts/peUj47yc1xo`)
  })
})

describe('App js: reset tweet youtube video', async() => {
  it('reset tweet youtube video', async() => {
    // 1. textarea: ceramahSingkatIslam = '-'
    await ceramahSingkatIslam.setValue('-')
    // 2. textarea: hasil = 'Tidak ada hasil'
    await results.setValue('Tidak ada hasil')
  
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
        axiosGetWith: 'http://localhost:3000/video/shorts/peUj47yc1xo',
        results: `DOSA - Ustadz Dr. Firanda Andirja, MA #CeramahPendek #Shorts #Video #YouTube\n\nhttps://www.youtube.com/shorts/peUj47yc1xo`,
        tweetIs: 'Tweet is: + 160'
      },
      {
        name: `youtube 'watch' success: id=2'`,
        youtubeLink: 'https://www.youtube.com/watch?v=vTeIKc2JjCU',
        axiosGetValueOnce: {
          data: '<meta name="title" content="Perbanyak Istighfar - Ustadz Dr. Firanda Andirja, MA"><meta name="description" content=',
          status: 200
        },
        axiosGetWith: 'http://localhost:3000/video/watch?v=vTeIKc2JjCU',
        results: `Perbanyak Istighfar - Ustadz Dr. Firanda Andirja, MA #CeramahPendek #Shorts #Video #YouTube\n\nhttps://www.youtube.com/watch?v=vTeIKc2JjCU`,
        tweetIs: 'Tweet is: + 144'
      },
      {
        name: `youtube 'watch' success: id=3'`,
        youtubeLink: 'https://youtu.be/vTeIKc2JjCU',
        axiosGetValueOnce: {
          data: '<meta name="title" content="Perbanyak Istighfar - Ustadz Dr. Firanda Andirja, MA"><meta name="description" content=',
          status: 200
        },
        axiosGetWith: 'http://localhost:3000/video/watch?v=vTeIKc2JjCU',
        results: `Perbanyak Istighfar - Ustadz Dr. Firanda Andirja, MA #CeramahPendek #Shorts #Video #YouTube\n\nhttps://youtu.be/vTeIKc2JjCU`,
        tweetIs: 'Tweet is: + 159'
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
        name: `youtube 'shorts' failure: id=5'`,
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
        name: `youtube 'shorts' failure: id=6'`,
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
        name: `youtube failure: id=7'`,
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
        name: `youtube failure: id=8'`,
        youtubeLink: 'https://www.youtube.com',
        axiosGetValueOnce: {
          data: '',
          status: 200
        },
        axiosGetWith: 'http://localhost:3000/video/watch?v=',
        results: 'Tidak ada hasil',
        tweetIs: 'Tweet is: + 280'
      },
      {
        name: `youtube 'watch' failure: id=9'`,
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

describe('App js: button reset', () => {
  it('button reset', async() => {
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

describe('App js: textarea `hasil` untuk array untuk ceramah dan Ustadz', async() => {
  // ceramah
  it('add tweet youtube video', async() => {
    // GET
    vi.spyOn(axios, 'get').mockResolvedValueOnce({
      data: '<meta name="title" content="DOSA - Ustadz Dr. Firanda Andirja, MA"><meta name="description" content=',
      status: 200
    })
    await ceramahSingkatIslam.setValue('https://www.youtube.com/shorts/peUj47yc1xo')
    await ceramahSingkatIslam.trigger('change')
  
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/video/shorts/peUj47yc1xo')
  
    // Wait until the DOM updates.
    await flushPromises()
  
    // textarea hasil: test youtube.com
    expect(results.element.value).toEqual('DOSA - Ustadz Dr. Firanda Andirja, MA #CeramahPendek #Shorts #Video #YouTube\n\nhttps://www.youtube.com/shorts/peUj47yc1xo')
  })

  it('App js: textarea `hasil` untuk array untuk ceramah singkat: dicentang', async() => {        
    assert.equal(results.element.value, 'DOSA - Ustadz Dr. Firanda Andirja, MA #CeramahPendek #Shorts #Video #YouTube\n\nhttps://www.youtube.com/shorts/peUj47yc1xo')
    
    // test cases
    const testCases = [   
      {
        name: 'Pengajian',
        index: 3,
        listBool: [true, false, false, true],
        hasil: `DOSA - Ustadz Dr. Firanda Andirja, MA #CeramahPendek #Shorts #Video #YouTube #Pengajian\n\nhttps://www.youtube.com/shorts/peUj47yc1xo`,
        tweetIs: 'Tweet is: + 149',
        allCheckboxesEnabled: 'diaktifkan: 2'
      },
      {
        name: 'Islam',
        index: 1,
        listBool: [true, true, false, true],
        hasil: `DOSA - Ustadz Dr. Firanda Andirja, MA #CeramahPendek #Shorts #Video #YouTube #KajianIslam #Islam #Muslim #Hikmah #IslamItuIndah #IslamAgamaKu #Pengajian\n\nhttps://www.youtube.com/shorts/peUj47yc1xo`,
        tweetIs: 'Tweet is: + 84',
        allCheckboxesEnabled: 'diaktifkan: 3'
      },
      {
        name: 'Mualaf',
        index: 2,
        listBool: [true, true, true, true],
        hasil: 'DOSA - Ustadz Dr. Firanda Andirja, MA #CeramahPendek #Shorts #Video #YouTube #KajianIslam #Islam #Muslim #Hikmah #IslamItuIndah #IslamAgamaKu #Mualaf #Pengajian\n\nhttps://www.youtube.com/shorts/peUj47yc1xo',
        tweetIs: 'Tweet is: + 76',
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

  it('App js: textarea `hasil` untuk array untuk ceramah singkat: tidak dicentang', async() => {    
    console.debug('-----')
    
    // textarea hasil: test youtube.com
    expect(results.element.value).toEqual('DOSA - Ustadz Dr. Firanda Andirja, MA #CeramahPendek #Shorts #Video #YouTube #KajianIslam #Islam #Muslim #Hikmah #IslamItuIndah #IslamAgamaKu #Mualaf #Pengajian\n\nhttps://www.youtube.com/shorts/peUj47yc1xo')

    // test cases
    const testCases = [
      {
        name: 'Singkat',
        index: 0,
        listBool: [false, true, true, true],
        results: 'DOSA - Ustadz Dr. Firanda Andirja, MA #KajianIslam #Islam #Muslim #Hikmah #IslamItuIndah #IslamAgamaKu #Mualaf #Pengajian\n\nhttps://www.youtube.com/shorts/peUj47yc1xo',
        tweetIs: 'Tweet is: + 115',
        // `semua kotak centang` diaktifkan
        allCheckboxesEnabled: 'diaktifkan: 3'
      },
      {
        name: 'Islam',
        index: 1,
        listBool: [false, false, true, true],
        results: 'DOSA - Ustadz Dr. Firanda Andirja, MA #Mualaf #Pengajian\n\nhttps://www.youtube.com/shorts/peUj47yc1xo',
        tweetIs: 'Tweet is: + 180',
        allCheckboxesEnabled: 'diaktifkan: 2'
      },
      {
        name: 'Mualaf',
        index: 2,
        listBool: [false, false, false, true],
        results: 'DOSA - Ustadz Dr. Firanda Andirja, MA #Pengajian\n\nhttps://www.youtube.com/shorts/peUj47yc1xo',
        tweetIs: 'Tweet is: + 188',
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
  it('App js: textarea `hasil` untuk array untuk ustadz: dicentang', async() => {        
    assert.equal(results.element.value, 'DOSA - Ustadz Dr. Firanda Andirja, MA #Pengajian\n\nhttps://www.youtube.com/shorts/peUj47yc1xo')
    
    // test cases
    const testCases = [   
      {
        name: 'Dr. (H.C.) Adi Hidayat, Lc., M.A.',
        index: 3,
        listBool: [false, false, true, false],
        hasil: `DOSA - Ustadz Dr. Firanda Andirja, MA #Pengajian #UstadzAdiHidayat #UAH\n\nhttps://www.youtube.com/shorts/peUj47yc1xo`,
        tweetIs: 'Tweet is: + 149',
        allCheckboxesEnabled: 'diaktifkan: 2'
      },
      {
        name: 'Dr. Khalid Basalamah, Lc., M.A.',
        index: 1,
        listBool: [false, true, false, false],
        hasil: `DOSA - Ustadz Dr. Firanda Andirja, MA #Pengajian #UstadzKhalidBasalamah #KhalidBasalamah\n\nhttps://www.youtube.com/shorts/peUj47yc1xo`,
        tweetIs: 'Tweet is: + 84',
        allCheckboxesEnabled: 'diaktifkan: 3'
      },
      {
        name: 'Dr. Syafiq Riza Basalamah, Lc., M.A.',
        index: 2,
        listBool: [false, false, true, false],
        hasil: 'DOSA - Ustadz Dr. Firanda Andirja, MA #Pengajian #UstadzSyafiqBasalamah #SyafiqRizaBasalamah\n\nhttps://www.youtube.com/shorts/peUj47yc1xo',
        tweetIs: 'Tweet is: + 76',
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
})