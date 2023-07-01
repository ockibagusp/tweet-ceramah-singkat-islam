<script setup>
</script>

<script>
const REDIRCETURL = 'http://localhost:3000/video'
const YOUTUBEVIDURLS = [
  'https://www.youtube.com',
  'www.youtube.com',
  'youtube.com',
  'https://youtu.be',
  'youtu.be'
]

import axios from 'axios'

export default {
  data() {
    return {
      // textarea: ceramahSingkatIslam
      ceramahSingkatIslam: '',
      // textarea: hasil
      results: '',
      // bool: resultsBool
      resultsBool: false,
      // tweet dihasil maks. 280 karakter
      count: 280,
      // array: ceramah singkat Islam
      arrayCeramahSI: [
        {
          name: 'Singkat',
          tweets: '#CeramahPendek #Shorts #Video #YouTube',
          url: '#',
          completed: false
        },
        {
          name: 'Islam',
          tweets: '#KajianIslam #Islam #Muslim #Hikmah #IslamItuIndah #IslamAgamaKu',
          url: '#',
          completed: false
        },
        {
          name: 'Mualaf',
          tweets: '#Mualaf',
          url: 'https://twitter.com/search?q=%23Mualaf',
          completed: false
        },
        {
          name: 'Pengajian',
          tweets: '#Pengajian',
          url: 'https://twitter.com/search?q=%23Pengajian',
          completed: false
        },
        {
          name: 'RIBA',
          tweets: '#RIBA',
          url: 'https://twitter.com/search?q=%23RIBA',
          completed: false
        },
        {
          name: 'Azab',
          tweets: '#Azab',
          url: 'https://twitter.com/search?q=%23Azab',
          completed: false
        },
        {
          name: 'Musibah',
          tweets: '#Musibah',
          url: 'https://twitter.com/search?q=%23Musibah',
          completed: false
        },
        {
          name: 'Utang',
          tweets: '#Utang',
          url: 'https://twitter.com/search?q=%23Utang',
          completed: false
        },
        {
          name: 'Sedekah',
          tweets: '#Sedekah',
          url: 'https://twitter.com/search?q=%23Sedekah',
          completed: false
        }
      ],
      // array: Ustadz
      arrayUstadz: [
        {
          name: 'Dr. Firanda Andirja, Lc., M.A.',
          tweets: '#UstadzFirandaAndirja #FirandaAndirja',
          url: 'https://id.wikipedia.org/wiki/Firanda_Andirja',
          completed: false
        },
        {
          name: 'Dr. Khalid Basalamah, Lc., M.A.',
          tweets: '#UstadzKhalidBasalamah #KhalidBasalamah',
          url: 'https://id.wikipedia.org/wiki/Khalid_Basalamah',
          completed: false
        },
        {
          name: 'Dr. Syafiq Riza Basalamah, Lc., M.A.',
          tweets: '#UstadzSyafiqBasalamah #SyafiqRizaBasalamah',
          url: 'https://id.wikipedia.org/wiki/Syafiq_Riza_Basalamah',
          completed: false
        },
        {
          name: 'Dr. (H.C.) Adi Hidayat, Lc., M.A.',
          tweets: '#UstadzAdiHidayat #UAH',
          url: 'https://id.wikipedia.org/wiki/Adi_Hidayat',
          completed: false
        },
        {
          name: 'Prof. Abdul Somad, Lc., D.E.S.A., Ph.D.',
          tweets: '#UstadzAbdulSomad #UAS',
          url: 'https://id.wikipedia.org/wiki/Abdul_Somad',
          completed: false
        },
        {
          name: '(Abu Yahya) Badrusalam, Lc',
          tweets: '#UstadzBadrusalam',
          url: 'https://id.wikipedia.org/wiki/Badrusalam',
          completed: false
        }
      ],

      // string: Youtube video
      youtubeVideo: '',
      // string: ceramah singkat Islam dan Ustadz
      ceramahSIText: '',
      ustadzText: '',
      
      // pilih button salinan dan tweet: true atau false
      selectResults: false,
      selectCopy: false,
      selectTweet: false,

      // pilih `semua kotak centang`: true atau false
      selectCheckBoxAll: false,

      // `semua kotak centang` diaktifkan
      allCheckboxesEnabled: 0
    }
  },
  mounted() {
    this.$refs.ceramahSingkatIslam.focus()
  },
  computed: {
    // adalah hasil dan button copy: true atau false
    isResults: function() {
      return !this.selectResults
    },
    isCopy: function() {
      return !this.selectCopy
    },
    isTweet: function() {
      return !this.selectTweet
    },
    // adalah button `semua kotak centang`: true atau false
    isCheckBoxAll: function() {
      return !this.selectCheckBoxAll
    },
  },
  watch: {
    // textarea: ceramahSingkatIslam
    ceramahSingkatIslam() {
      // vue methods: memuat
      this.carry()
    }
  },
  methods: {
    // dibuat: dari textarea ceramahSingkatIslam ini
    async carry() {
      let youtubeVideoHtml = ''
      this.allCheckboxesEnabled = 1

      if (this.ceramahSingkatIslam == '') {
        this.results = ''
        this.isResultsDefault()
        return
      }

      // why? textarea this.ceramahSingkatIslam = '#', '?', etc.
      const regex = /(https:\/\/)?(www\.|m\.)?(youtube\.com|youtu\.be)\/(watch\?v=|shorts\/)?([\w\-]+)([^\r\n\t\f\v \?&]+)?/gm

      // Alternative syntax using RegExp constructor
      // const regex = new RegExp('(https:\\/\\/)?(www\\.|m\\.)?(youtube\\.com|youtu\\.be)\\/(watch\\?v=|shorts\\/)?([\\w\\-]+)(\\S+)?', 'gm')

      const str = this.ceramahSingkatIslam
      let m

      let quit = false
      while ((m = regex.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++
        }

        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {
          if (groupIndex === 0) {
            if (match !== undefined) {
              youtubeVideoHtml = match
            }
          }

          if (groupIndex === 5) {
            if (match !== undefined) {
              if (match.search('watch') === -1 && match.search('shorts') === -1) {
                quit = true
              }
            }
          }
        })
      }

      if (!quit)
        return this.isResultsError()

      // memotong pada youtube atau youtu ke '': misalnya,
      //  'https://www.youtube.com/shorts/peUj47yc1xo' ke '/shorts/peUj47yc1xo'
      let ceramahSingkatSlice = youtubeVideoHtml
        .replace(YOUTUBEVIDURLS[0], '')
        .replace(YOUTUBEVIDURLS[1], '')
        .replace(YOUTUBEVIDURLS[2], '')
        .replace(YOUTUBEVIDURLS[3], '')
        .replace(YOUTUBEVIDURLS[4], '')
        .replace('https://', '')

      // https://youtu.be/-s0o6o5_ApU -> Tidak ada hasil
      //  => Kenapa Nabi Melarang Duduk di Pinggir Jalan? - Ustadz Dr. Firanda Andirja, Lc, MA ...
      if (ceramahSingkatSlice.search('/watch') === -1 && ceramahSingkatSlice.search('/shorts') === -1) {
        ceramahSingkatSlice = '/watch?v=' + ceramahSingkatSlice.replace('/', '')
      }

      let ceramahSingkatIslam = REDIRCETURL + ceramahSingkatSlice
      
      // textarea hasil: loading...
      this.results = 'Loading...'

      try {
        const res = await axios.get(ceramahSingkatIslam)
        if (res.status == 200 && (ceramahSingkatSlice == '/shorts/' || ceramahSingkatSlice == '/shorts' || ceramahSingkatSlice == '/watch?v=')) {
          this.isResultsError()
          return
        } else if (res.status == 404) {
          this.isResultsError()
          return
        } else if (res.data.search(`This video isn't available anymore`) !== -1) {
          this.isResultsError()
          return
        }
      
        const regex = /<meta name="title" content="(.+)"><meta name="description" content=/gm
        // Alternative syntax using RegExp constructor
        // const regex = new RegExp('<title>(.+)<\\/title>', 'gm')
        const str = res.data
        let m
        while ((m = regex.exec(str)) !== null) {
          // This is necessary to avoid infinite loops with zero-width matches
          if (m.index === regex.lastIndex) {
              regex.lastIndex++
          }
          // The result can be accessed through the `m`-variable.
          m.forEach((match, groupIndex) => {
            if (groupIndex === 1) {
              // unescape HTML
              const unescapeHtml = match
                .replace(/&amp;/g, "&")
                .replace(/&lt;/g, "<")
                .replace(/&gt;/g, ">")
                .replace(/&quot;/g, "\"")
                .replace(/&#39;/g, "'")
              
              if (unescapeHtml !== undefined) {
                youtubeVideoHtml = unescapeHtml
                return
              }
            }
          })
        }
        if (youtubeVideoHtml != '') {
          this.youtubeVideo = youtubeVideoHtml
          this.ceramahAndUstText = this.arrayCeramahSI[0].tweets
          youtubeVideoHtml = youtubeVideoHtml + ' ' + this.ceramahAndUstText
          
          // textarea youtube.com ke youtu.be
          youtubeVideoHtml = `${youtubeVideoHtml}\n\n${this.isYoutubeComToYoutube(ceramahSingkatSlice)}`
          this.isResultsSuccess(youtubeVideoHtml.length)
        } 

        if (str != '' && youtubeVideoHtml == '') {  
          youtubeVideoHtml = ''
          this.isResultsDefault()
        }
        this.results = youtubeVideoHtml

        // array: arrayCeramahSI: Singkat => true
        this.arrayCeramahSI[0].completed = true
        this.allCheckboxesEnabled = 1
      } catch {
        this.isResultsError()
      }
    },
    // button: reset, copy dan tweet
    btnReset() {
      this.ceramahSingkatIslam = ''
      // autofocus
      this.$refs.ceramahSingkatIslam.focus()
      this.arrayCeramahSI.forEach(element => {
        element.completed = false
      })
      this.arrayUstadz.forEach(element => {
        element.completed = false
      })
      this.isNotResults()
    },
    btnCopy() {
      if (this.results == '') {
        return
      }
      
      this.$refs.results.select()
      // Untuk perangkat seluler
      this.$refs.results.setSelectionRange(0, 99999)
    
      navigator.clipboard.writeText(this.results)
    },

    btnTweet() {
      if (this.results.length > 280) {
        this.selectTweet = false
        return
      }
      const UTF8_hash = this.results.replaceAll("#", "%23")
      window.open("https://twitter.com/intent/tweet?text="+UTF8_hash, "_blank")
    },

    btnCheckBoxAll() {
      if (this.selectCheckBoxAll === true) {
        let youtubeVideo = ''

        // Singkat
        this.arrayCeramahSI[0].completed = true
        this.ceramahSIText = this.arrayCeramahSI[0].tweets
        this.arrayUstadz.forEach(element => {
          element.completed = false
        })
        youtubeVideo = this.youtubeVideo + ' ' + this.ceramahSIText
          
        this.results = `${youtubeVideo}\n\n${this.isYoutubeComToYoutube(this.ceramahSingkatIslam)}`
        this.isResultsSuccess(youtubeVideo.length)
        this.allCheckboxesEnabled = 1
        
        this.selectResults = true
        this.selectCopy = true
        this.selectTweet = true

        this.selectCheckBoxAll = false
      } else {
        this.arrayCeramahSI.forEach((val, index) => {
          this.arrayCeramahSI[index].completed = false
        })
        this.arrayUstadz.forEach(element => {
          element.completed = false
        })
        this.results = `${this.youtubeVideo}\n\n${this.isYoutubeComToYoutube(this.ceramahSingkatIslam)}`
        this.isResultsSuccess(this.results.length)
        this.allCheckboxesEnabled = 0    
        this.selectCheckBoxAll = true
      }
    },

    // html: Tag Singkat Islam dan Tag Ustadz
    // berubah dalam array untuk ceramah Singkat Islam dan Ustadz
    ceramahAndUstChanged(event, index, isArray) {
      let tweets = ''
      // array: caramah dan Ustadz
      let alphaArray = []
      let betaArray = []

      if (isArray === 'ceramahSI') {
        tweets = this.arrayCeramahSI[index].tweets

        alphaArray = this.arrayCeramahSI
        betaArray = this.arrayUstadz
      } else if (isArray === 'ustadz') {
        tweets = this.arrayUstadz[index].tweets

        alphaArray = this.arrayUstadz
        betaArray = this.arrayCeramahSI
      } else {
        alert("ceramahAndUstChanged(event, index, isArray). isArray: 'ceramahSI' or 'ustadz'")
      }
      
      if (event.target.checked) {
        let newArrayAlphaTweets = ''

        if (isArray === 'ceramahSI') {
          for (let i = 0; i < alphaArray.length; i++) {
            if (alphaArray[i].completed !== false) {
              newArrayAlphaTweets += `${alphaArray[i].tweets} `
            }
          }

          for (let j = 0; j < betaArray.length; j++) {
            if (betaArray[j].completed !== false) {
              newArrayAlphaTweets += `${betaArray[j].tweets} `
            }
          }

          newArrayAlphaTweets = newArrayAlphaTweets.substring(0, newArrayAlphaTweets.length-1)
        } else if (isArray === 'ustadz') {
          for (let i = 0; i < betaArray.length; i++) {
            if (betaArray[i].completed !== false) {
              newArrayAlphaTweets += `${betaArray[i].tweets} `
            }
          }
          
          for (let j = 0; j < alphaArray.length; j++) {
            if (alphaArray[j].completed !== false) {
              newArrayAlphaTweets += `${alphaArray[j].tweets} `
            }
          }

          newArrayAlphaTweets = newArrayAlphaTweets.substring(0, newArrayAlphaTweets.length-1)
        }

        this.results =  `${this.youtubeVideo} ${newArrayAlphaTweets}\n\n${this.isYoutubeComToYoutube(this.ceramahSingkatIslam)}`
        if (this.results.length > 280) {
          this.isResultsError()
          return
        } 
        
        this.isResultsSuccess(this.results.length)
        this.allCheckboxesEnabled++
      } else {
        const rightComma = `${tweets} `
        const leftComma = ` ${tweets}`
        const bothComma = ` ${tweets} `
        
        let release = ''
        if (this.results.includes(rightComma)) {
          release = rightComma
        } else if (this.results.includes(leftComma)) {
          release = leftComma
        } else if (this.results.includes(bothComma)) {
          release = bothComma
        } else {
          // melepas = text 
          this.results = `${this.youtubeVideo}\n\n${this.isYoutubeComToYoutube(this.ceramahSingkatIslam)}`
          // pilih hasil, button copy dan button tweet: false
          this.isResultsSuccess(this.results.length)
          this.allCheckboxesEnabled = 0
          return
        }
        this.results = this.results.replace(release, '')
        this.isResultsSuccess(this.results.length)
        this.allCheckboxesEnabled--
      }
    },
    // adalah textarea youtube.com ke youtu.be
    isYoutubeComToYoutube(link) {
      // memotong pada youtube atau youtu ke '': misalnya,
      //  'https://www.youtube.com/shorts/peUj47yc1xo' ke '/shorts/peUj47yc1xo'
      let ceramahSingkatSlice = link
        .replace(YOUTUBEVIDURLS[0], '')
        .replace(YOUTUBEVIDURLS[1], '')
        .replace(YOUTUBEVIDURLS[2], '')
        .replace(YOUTUBEVIDURLS[3], '')
        .replace(YOUTUBEVIDURLS[4], '')

      return 'https://youtu.be/' + ceramahSingkatSlice
        .replace('/watch?v=', '')
        .replace('/shorts/', '')
    },
    isNotResults() {
      this.results = ''
      this.isResultsDefault()
    },
    isResultsError() {
      this.results = 'Tidak ada hasil'
      this.isResultsDefault()
    },
    isResultsDefault() {
      this.resultsBool = false
      this.count = 280
      this.selectCopy = false
      this.selectTweet = false
      this.arrayCeramahSI.forEach((val, index) => {
        this.arrayCeramahSI[index].completed = false
      })
      this.arrayUstadz.forEach(element => {
        element.completed = false
      })
      this.allCheckboxesEnabled = 0
    },
    isResultsSuccess(videoLength) {
      this.resultsBool = true
      this.selectResults = true
      this.selectCopy = true
      this.selectTweet = true
      this.count = 280 - videoLength
    }
  }
}
</script>

<template>
  <main>
    <h2 style="margin-top: 2px;">Tweet Ceramah Singkat Islam</h2>
    <h3 style="margin-top: -10px; margin-bottom: 5px;">Youtube Video Link:</h3>
    <input v-model="ceramahSingkatIslam" style="width: 500px;"
      placeholder="https://www.youtube.com/shorts/peUj47yc1xo" cols="38" ref="ceramahSingkatIslam" data-test="ceramah-singkat-islam">
    <br>
    <button style="margin-top: 4px;" @click="btnReset" data-test="btn-reset">Reset</button>
    <br>
    <h3 style="margin-top: 10px; margin-bottom: -15px;">Hasil:</h3>
    <br>
    <textarea style="width: 500px;height: 80px;" v-model="results"
      placeholder="DOSA - Ustadz Dr. Firanda Andirja, MA #CeramahPendek #Shorts #Video #YouTube

https://www.youtube.com/shorts/peUj47yc1xo" cols="50" rows="3" ref="results" data-test="results"></textarea>
    <br>
    <button @click="btnCopy" :disabled="isCopy" data-test="btn-copy">Copy</button>
    <button @click="btnTweet" :disabled="isTweet" data-test="btn-tweet">Tweet is: <small v-if="ceramahSingkatIslam.length < 280">+</small> {{count}}</button>
    <br>

    <!-- <h4 v-if="resultsBool">Kotak Centang:  -->
    <h4 v-if="true">Kotak Centang: 
      <button @click="btnCheckBoxAll()" data-test="btn-checkbox-all">
        {{ !isCheckBoxAll ? 'diaktifkan': 'tidak diaktifkan' }}
      </button>    
    </h4>
    
    <!-- <p  v-if="resultsBool" style="margin-top: -20px; margin-bottom: 10px;" data-test="all-checkboxes-enabled"> -->
    <p  v-if="true" style="margin-top: -20px; margin-bottom: 10px;" data-test="all-checkboxes-enabled">
      diaktifkan: {{ allCheckboxesEnabled }}
    </p>
    
    {{ resultsBool ? '📌' : '' }}
    <!-- <div v-if="resultsBool"> -->
    <div v-if="true">
      <h4 style="margin-top: 0px;margin-bottom: 5px;">Tag Singkat Islam:</h4>
      <div
        v-for="(ceramahSI, index) in arrayCeramahSI"
        :key="ceramahSI.name"
        data-test="array-ceramahSI"
        :class="[ceramahSI.completed ? 'completed' : '']"
        @change="ceramahAndUstChanged($event, index, 'ceramahSI')"
      >
        <input
          type="checkbox"
          v-model="ceramahSI.completed"
          data-test="ceramahSI-checkbox"
        />
        <a :href="ceramahSI.url" v-if="ceramahSI.url !== '#'" target="_blank">{{ ceramahSI.name }}</a>
        <a v-else>{{ ceramahSI.name }}</a><div style="margin-left: 20px;">
          <small>{{ ceramahSI.tweets }}</small>
        </div>
      </div>
  
      <h4 style="margin-top: 10px;margin-bottom: 5px;">Tag Ustadz:</h4>
      <div
        v-for="(ustadz, index) in arrayUstadz"
        :key="ustadz.name"
        data-test="array-ustadz"
        :class="[ustadz.completed ? 'completed' : '']"
        @change="ceramahAndUstChanged($event, index, 'ustadz')"
      >
        <input
          type="checkbox"
          v-model="ustadz.completed"
          data-test="ustadz-checkbox"
        />
        <a :href="ustadz.url" target="_blank">{{ ustadz.name }}</a>
        <div style="margin-left: 20px;">
          <small>{{ ustadz.tweets }}</small>
        </div>
      </div>
    </div>
  </main>
</template>