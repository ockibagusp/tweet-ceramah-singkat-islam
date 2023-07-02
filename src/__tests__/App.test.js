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
    expect(results.element.value).toEqual(`DOSA - Ustadz Dr. Firanda Andirja, MA #CeramahPendek #Shorts #Video #YouTube\n\nhttps://youtu.be/peUj47yc1xo`)
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
        results: `DOSA - Ustadz Dr. Firanda Andirja, MA #CeramahPendek #Shorts #Video #YouTube\n\nhttps://youtu.be/peUj47yc1xo`,
        tweetIs: 'Tweet is: + 174'
      },
      {
        name: `youtube 'watch' success: id=2'`,
        youtubeLink: 'https://www.youtube.com/watch?v=vTeIKc2JjCU',
        axiosGetValueOnce: {
          data: '<meta name="title" content="Perbanyak Istighfar - Ustadz Dr. Firanda Andirja, MA"><meta name="description" content=',
          status: 200
        },
        axiosGetWith: 'http://localhost:3000/video/watch?v=vTeIKc2JjCU',
        results: `Perbanyak Istighfar - Ustadz Dr. Firanda Andirja, MA #CeramahPendek #Shorts #Video #YouTube\n\nhttps://youtu.be/vTeIKc2JjCU`,
        tweetIs: 'Tweet is: + 159'
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
        name: `youtube 'watch' success: id=4'`, // failure
        youtubeLink: 'https://www.youtube.com/shorts/peUj47yc1xo&list=WL&index=157',
        axiosGetValueOnce: {
          data: '<meta name="title" content="DOSA - Ustadz Dr. Firanda Andirja, MA"><meta name="description" content=',
          status: 200
        },
        axiosGetWith: 'http://localhost:3000/video/shorts/peUj47yc1xo',
        results: `DOSA - Ustadz Dr. Firanda Andirja, MA #CeramahPendek #Shorts #Video #YouTube\n\nhttps://youtu.be/peUj47yc1xo`,
        tweetIs: 'Tweet is: + 174'
      },
      {
        name: `youtube 'watch' success: id=5'`,
        youtubeLink: 'https://youtube.com/shorts/vTeIKc2JjCU?feature=share',
        axiosGetValueOnce: {
          data: '<meta name="title" content="Perbanyak Istighfar - Ustadz Dr. Firanda Andirja, MA"><meta name="description" content=',
          status: 200
        },
        axiosGetWith: 'http://localhost:3000/video/shorts/vTeIKc2JjCU',
        results: `Perbanyak Istighfar - Ustadz Dr. Firanda Andirja, MA #CeramahPendek #Shorts #Video #YouTube\n\nhttps://youtu.be/vTeIKc2JjCU`,
        tweetIs: 'Tweet is: + 159'
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
  it('button `semua kotak centang` di array untuk ceramahSI dan Ustadz: `diaktifkan` atau `tidak diaktifkan`', async() => {
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
    
    assert.equal(btnCheckBoxAll.text(), 'tidak diaktifkan')

    await btnCheckBoxAll.trigger('click')
    assert.equal(btnCheckBoxAll.text(), 'diaktifkan')
    assert.equal(results.element.value, 'DOSA - Ustadz Dr. Firanda Andirja, MA\n\nhttps://youtu.be/peUj47yc1xo')

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
    assert.equal(results.element.value, 'DOSA - Ustadz Dr. Firanda Andirja, MA #CeramahPendek #Shorts #Video #YouTube\n\nhttps://youtu.be/peUj47yc1xo')
    assert.equal(btnTweet.text(), 'Tweet is: + 204')
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
    expect(results.element.value).toEqual('DOSA - Ustadz Dr. Firanda Andirja, MA #CeramahPendek #Shorts #Video #YouTube\n\nhttps://youtu.be/peUj47yc1xo')
  })

  it('App js: textarea `hasil` untuk array untuk ceramah singkat: dicentang', async() => {        
    assert.equal(results.element.value, 'DOSA - Ustadz Dr. Firanda Andirja, MA #CeramahPendek #Shorts #Video #YouTube\n\nhttps://youtu.be/peUj47yc1xo')
    
    // test cases
    const testCases = [   
      {
        name: 'Pengajian',
        index: 3,
        listBool: [true, false, false, true],
        hasil: `DOSA - Ustadz Dr. Firanda Andirja, MA #CeramahPendek #Shorts #Video #YouTube #Pengajian\n\nhttps://youtu.be/peUj47yc1xo`,
        tweetIs: 'Tweet is: + 163',
        allCheckboxesEnabled: 'diaktifkan: 2'
      },
      {
        name: 'Islam',
        index: 1,
        listBool: [true, true, false, true],
        hasil: `DOSA - Ustadz Dr. Firanda Andirja, MA #CeramahPendek #Shorts #Video #YouTube #KajianIslam #Islam #Muslim #Hikmah #IslamItuIndah #IslamAgamaKu #Pengajian\n\nhttps://youtu.be/peUj47yc1xo`,
        tweetIs: 'Tweet is: + 98',
        allCheckboxesEnabled: 'diaktifkan: 3'
      },
      {
        name: 'Mualaf',
        index: 2,
        listBool: [true, true, true, true],
        hasil: 'DOSA - Ustadz Dr. Firanda Andirja, MA #CeramahPendek #Shorts #Video #YouTube #KajianIslam #Islam #Muslim #Hikmah #IslamItuIndah #IslamAgamaKu #Mualaf #Pengajian\n\nhttps://youtu.be/peUj47yc1xo',
        tweetIs: 'Tweet is: + 90',
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
    expect(results.element.value).toEqual('DOSA - Ustadz Dr. Firanda Andirja, MA #CeramahPendek #Shorts #Video #YouTube #KajianIslam #Islam #Muslim #Hikmah #IslamItuIndah #IslamAgamaKu #Mualaf #Pengajian\n\nhttps://youtu.be/peUj47yc1xo')

    // test cases
    const testCases = [
      {
        name: 'Singkat',
        index: 0,
        listBool: [false, true, true, true],
        results: 'DOSA - Ustadz Dr. Firanda Andirja, MA #KajianIslam #Islam #Muslim #Hikmah #IslamItuIndah #IslamAgamaKu #Mualaf #Pengajian\n\nhttps://youtu.be/peUj47yc1xo',
        tweetIs: 'Tweet is: + 129',
        // `semua kotak centang` diaktifkan
        allCheckboxesEnabled: 'diaktifkan: 3'
      },
      {
        name: 'Islam',
        index: 1,
        listBool: [false, false, true, true],
        results: 'DOSA - Ustadz Dr. Firanda Andirja, MA #Mualaf #Pengajian\n\nhttps://youtu.be/peUj47yc1xo',
        tweetIs: 'Tweet is: + 194',
        allCheckboxesEnabled: 'diaktifkan: 2'
      },
      {
        name: 'Mualaf',
        index: 2,
        listBool: [false, false, false, true],
        results: 'DOSA - Ustadz Dr. Firanda Andirja, MA #Pengajian\n\nhttps://youtu.be/peUj47yc1xo',
        tweetIs: 'Tweet is: + 202',
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
    assert.equal(results.element.value, 'DOSA - Ustadz Dr. Firanda Andirja, MA #Pengajian\n\nhttps://youtu.be/peUj47yc1xo')
    
    // test cases
    const testCases = [   
      {
        name: 'Dr. (H.C.) Adi Hidayat, Lc., M.A.',
        index: 3,
        listBool: [false, false, false, true],
        hasil: `DOSA - Ustadz Dr. Firanda Andirja, MA #Pengajian #UstadzAdiHidayat #UAH\n\nhttps://youtu.be/peUj47yc1xo`,
        tweetIs: 'Tweet is: + 179',
        allCheckboxesEnabled: 'diaktifkan: 2'
      },
      {
        name: 'Dr. Khalid Basalamah, Lc., M.A.',
        index: 1,
        listBool: [false, true, false, true],
        hasil: `DOSA - Ustadz Dr. Firanda Andirja, MA #Pengajian #UstadzKhalidBasalamah #KhalidBasalamah #UstadzAdiHidayat #UAH\n\nhttps://youtu.be/peUj47yc1xo`,
        tweetIs: 'Tweet is: + 139',
        allCheckboxesEnabled: 'diaktifkan: 3'
      },
      {
        name: 'Dr. Syafiq Riza Basalamah, Lc., M.A.',
        index: 2,
        listBool: [false, true, true, true],
        hasil: 'DOSA - Ustadz Dr. Firanda Andirja, MA #Pengajian #UstadzKhalidBasalamah #KhalidBasalamah #UstadzSyafiqBasalamah #SyafiqRizaBasalamah #UstadzAdiHidayat #UAH\n\nhttps://youtu.be/peUj47yc1xo',
        tweetIs: 'Tweet is: + 95',
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

  it('App js: textarea `hasil` untuk array untuk ustadz: tidak dicentang', async() => {        
    assert.equal(results.element.value, 'DOSA - Ustadz Dr. Firanda Andirja, MA #Pengajian #UstadzKhalidBasalamah #KhalidBasalamah #UstadzSyafiqBasalamah #SyafiqRizaBasalamah #UstadzAdiHidayat #UAH\n\nhttps://youtu.be/peUj47yc1xo')
    
    // test cases
    const testCases = [   
      {
        name: 'Dr. Khalid Basalamah, Lc., M.A.',
        index: 1,
        listBool: [false, false, true, true],
        hasil: `DOSA - Ustadz Dr. Firanda Andirja, MA #Pengajian #UstadzSyafiqBasalamah #SyafiqRizaBasalamah #UstadzAdiHidayat #UAH\n\nhttps://youtu.be/peUj47yc1xo`,
        tweetIs: 'Tweet is: + 135',
        allCheckboxesEnabled: 'diaktifkan: 3'
      },
      {
        name: 'Dr. (H.C.) Adi Hidayat, Lc., M.A.',
        index: 3,
        listBool: [false, false, true, false],
        hasil: `DOSA - Ustadz Dr. Firanda Andirja, MA #Pengajian #UstadzSyafiqBasalamah #SyafiqRizaBasalamah\n\nhttps://youtu.be/peUj47yc1xo`,
        tweetIs: 'Tweet is: + 158',
        allCheckboxesEnabled: 'diaktifkan: 2'
      },
      {
        name: 'Dr. Syafiq Riza Basalamah, Lc., M.A.',
        index: 2,
        listBool: [false, false, false, false],
        hasil: 'DOSA - Ustadz Dr. Firanda Andirja, MA #Pengajian\n\nhttps://youtu.be/peUj47yc1xo',
        tweetIs: 'Tweet is: + 202',
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

  it('button tweet youtube video', async() => {
    const UTF8Hash = 'DOSA - Ustadz Dr. Firanda Andirja, MA #CeramahPendek #Shorts #Video #YouTube\n\nhttps://youtu.be/peUj47yc1xo'
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

    assert.equal(UTF8HashReal, 'DOSA%20-%20Ustadz%20Dr.%20Firanda%20Andirja,%20MA%20%23CeramahPendek%20%23Shorts%20%23Video%20%23YouTube%20https%3A%2F%2Fyoutu.be%2FpeUj47yc1xo')
  })
})