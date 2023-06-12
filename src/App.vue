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
      // tweet dihasil maks. 280 karakter
      count: 280,
      // array: ceramah singkat Islam dan Ustadz
      arrayCeramahAndUst: [
        // array: ceramah singkat Islam
        {
          name: 'Singkat',
          tweets: '#CeramahPendek #Shorts #Video #YouTube',
          url: '#',
          isCeramah: true,
          completed: true
        },
        {
          name: 'Islam',
          tweets: '#KajianIslam #Islam #Muslim #Hikmah #IslamItuIndah #IslamAgamaKu',
          url: '#',
          isCeramah: true,
          completed: false
        },
        {
          name: 'Mualaf',
          tweets: '#Mualaf',
          url: 'https://twitter.com/search?q=%23Mualaf',
          isCeramah: true,
          completed: false
        },
        {
          name: 'Pengajian',
          tweets: '#Pengajian',
          url: 'https://twitter.com/search?q=%23Pengajian',
          isCeramah: true,
          completed: false
        },
        {
          name: 'RIBA',
          tweets: '#RIBA',
          url: 'https://twitter.com/search?q=%23RIBA',
          isCeramah: true,
          completed: false
        },
        {
          name: 'Azab',
          tweets: '#Azab',
          url: 'https://twitter.com/search?q=%23Azab',
          isCeramah: true,
          completed: false
        },
        // array: Ustadz
        {
          name: 'Dr. Firanda Andirja, Lc., M.A.',
          tweets: '#UstadzFirandaAndirja #FirandaAndirja',
          url: 'https://id.wikipedia.org/wiki/Firanda_Andirja',
          // ustadz
          // isCeramah: false
          isCeramah: false,
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

      // array: Youtube video,  ceramah singkat Islam dan Ustadz
      youtubeVideo: '',
      ceramahAndUstText: '',
      
      // pilih button salinan dan tweet: true atau false
      selectResults: false,
      selectCopy: false,
      selectTweet: false,

      // pilih `semua kotak centang`: true atau false
      selectCheckBoxAll: false,

      // `semua kotak centang` diaktifkan
      allCheckboxesEnabled: 1
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
        this.isResultsDefault()
        return
      }

      const regex = /(https:\/\/)?(www\.|m\.)?(youtube\.com|youtu\.be)\/(watch\?v=|shorts\/)?([\w\-]+)(\S+)?/gm

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
        this.isResultsError()

      // memotong pada youtube atau youtu ke '': misalnya,
      //  'https://www.youtube.com/shorts/peUj47yc1xo' ke '/shorts/peUj47yc1xo'
      let ceramahSingkatSlice = this.ceramahSingkatIslam
      .replace(YOUTUBEVIDURLS[0], '')
      .replace(YOUTUBEVIDURLS[1], '')
      .replace(YOUTUBEVIDURLS[2], '')
      .replace(YOUTUBEVIDURLS[3], '')
      .replace(YOUTUBEVIDURLS[4], '')

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
              if (match !== undefined) {
                youtubeVideoHtml = match
                return
              }
            }
          })
        }
        if (youtubeVideoHtml != '') {
          this.youtubeVideo = youtubeVideoHtml
          this.ceramahAndUstText = this.arrayCeramahAndUst[0].tweets
          youtubeVideoHtml = youtubeVideoHtml + ' ' + this.ceramahAndUstText
          
          youtubeVideoHtml = `${youtubeVideoHtml}\n\n${this.ceramahSingkatIslam}`
          this.isResultsSuccess(youtubeVideoHtml.length)
        } 

        if (str != '' && youtubeVideoHtml == '') {  
          youtubeVideoHtml = ''
          this.isResultsDefault()
        }
        this.results = youtubeVideoHtml

        this.allCheckboxesEnabled = 1
        this.isCopyAndCountTweet()
      } catch {
        this.isResultsError()
      }
    },
    // button: reset, copy dan tweet
    btnReset() {
      this.ceramahSingkatIslam = ''
      // autofocus
      this.$refs.ceramahSingkatIslam.focus()
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
        let newArrayCeramahSIName = ''

        // Singkat
        this.arrayCeramahAndUst[0].completed = true
        this.ceramahSIText = this.arrayCeramahAndUst[0].tweets
        youtubeVideoHtml = youtubeVideoHtml + ' ' + this.ceramahAndUstText
          
        this.results = `${youtubeVideoHtml}\n\n${this.ceramahSingkatIslam}`
        this.isResultsSuccess(youtubeVideoHtml.length)
        this.allCheckboxesEnabled = 1
        
        this.selectResults = true
        this.selectCopy = true
        this.selectTweet = true

        this.selectCheckBoxAll = false
        
        this.results = newArrayCeramahSIName.substring(0, newArrayCeramahSIName.length-2)
        this.count = 280 - this.results.length
        this.isCopyAndCountTweet()
      } else {
        this.arrayCeramahAndUst.forEach((val, index) => {
          this.arrayCeramahAndUst[index].completed = false
        })
        this.count = 280
        this.results = '....'
        this.isCopyAndCountTweet()
        this.allCheckboxesEnabled = 0
        
        this.selectResults = false
        this.selectCopy = false
        this.selectTweet = false        
        this.selectCheckBoxAll = true
      }
    },

    // html: Tag Singkat Islam
    // berubah dalam array untuk ceramahSI
    ceramahAndUstChanged(event, index) {
      const tweets = this.arrayCeramahAndUst[index].tweets
      
      if (event.target.checked) {
        if (this.ceramahAndUstText === '') {
          this.ceramahSIText = tweets
          this.results = `${this.youtubeVideo} ${this.ceramahAndUstText}\n\n${this.ceramahSingkatIslam}`
          // pilih hasil, button copy dan button tweet: true
          this.selectResults = true
          this.selectCopy = true
          this.selectTweet = true
          
          this.allCheckboxesEnabled++
        } else {
          let newArrayCeramahSITweets = ''
          for (let i = 0; i < this.arrayCeramahAndUst.length; i++) {
            if (this.arrayCeramahAndUst[i].completed !== false) {
              newArrayCeramahSITweets += `${this.arrayCeramahAndUst[i].tweets} `
            }
          }

          this.results =  `${this.youtubeVideo} ${newArrayCeramahSITweets.substring(0, newArrayCeramahSITweets.length-1)}\n\n${this.ceramahSingkatIslam}`
          this.isCopyAndCountTweet()
          
          this.allCheckboxesEnabled++
        }

        this.count = 280 - this.results.length
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
          this.results = `${this.youtubeVideo}\n\n${this.ceramahAndUstText}`
          // pilih hasil, button copy dan button tweet: false
          this.selectResults = false
          this.selectCopy = false
          this.selectTweet = false
          this.count = 280
          
          this.allCheckboxesEnabled = 0
          return
        }
        this.results = this.results.replace(release, '')
        
        this.count = 280 - this.results.length
        this.isCopyAndCountTweet()
        
        this.allCheckboxesEnabled--
      }
    },

    // html: Tag Ustadz
    // berubah dalam array untuk Ustadz
    ustadzChanged(event, index) {
      const tweets = this.arrayCeramahAndUst[index].tweets

      if (event.target.checked) {
        if (this.ustadzText === '') {
          this.ustadzText = tweets

          console.log(this.ceramahAndUstText);
          if (this.ceramahAndUstText !== '') {
            
          } else {
            let newArrayCeramahSITweets = ''
            for (let i = 0; i < this.arrayCeramahAndUst.length; i++) {
              if (this.arrayCeramahAndUst[i].completed !== false) {
                newArrayCeramahSITweets += `${this.arrayCeramahAndUst[i].tweets} `
              }
            }

            this.results =  `${this.youtubeVideo} ${newArrayCeramahSITweets.substring(0, newArrayCeramahSITweets.length-1)}\n\n${this.ceramahSingkatIslam}`
            this.isCopyAndCountTweet()
            
            this.allCheckboxesEnabled++
          }



          this.results = `${this.youtubeVideo} ${this.ustadzText}\n\n${this.ceramahSingkatIslam}`
          // pilih hasil, button copy dan button tweet: true
          this.selectResults = true
          this.selectCopy = true
          this.selectTweet = true
          
          this.allCheckboxesEnabled++
        } else {
          let newArrayarrayCeramahAndUstTweets = ''
          for (let i = 0; i < this.arrayCeramahAndUst.length; i++) {
            if (this.arrayCeramahAndUst[i].completed !== false) {
              newArrayarrayCeramahAndUstTweets += `${this.arrayCeramahAndUst[i].tweets} `
            }
          }

          this.results =  `${this.youtubeVideo} ${newArrayarrayCeramahAndUstTweets.substring(0, newArrayarrayCeramahAndUstTweets.length-1)}\n\n${this.ceramahSingkatIslam}`
          this.isCopyAndCountTweet()
          
          this.allCheckboxesEnabled++
        }

        this.count = 280 - this.results.length
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
          this.results = `${this.youtubeVideo}\n\n${this.ustadzText}`
          // pilih hasil, button copy dan button tweet: false
          this.selectResults = false
          this.selectCopy = false
          this.selectTweet = false
          this.count = 280
          
          this.allCheckboxesEnabled = 0
          return
        }
        this.results = this.results.replace(release, '')
        
        this.count = 280 - this.results.length
        this.isCopyAndCountTweet()
        
        this.allCheckboxesEnabled--
      }
    },

    // sama dengan :isCountTweet()
    // adalah textarea hitungan dan tombol tweet
    isCopyAndCountTweet() {
      if (this.results === '' || this.results === 'Tidak ada hasil' 
        || this.results.length > 280) { 
        this.selectCopy = false
        this.selectTweet = false
      } else {
        this.selectCopy = true
        this.selectTweet = true
      }
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
      this.count = 280
      this.selectCopy = false
      this.selectTweet = false
      this.allCheckboxesEnabled = 0
    },
    isResultsSuccess(videoLength) {
      this.selectResults = true
      this.selectCopy = true
      this.selectTweet = true
      this.count = 280 - videoLength
      this.allCheckboxesEnabled = 0
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

    <h4 v-if="results !== '' && results !== 'Loading...'">Kotak Centang: 
    <button @click="btnCheckBoxAll()" data-test="btn-checkbox-all">
      {{ !isCheckBoxAll ? 'diaktifkan': 'tidak diaktifkan' }}
    </button>    
    </h4>
    
    <!-- <p  v-if="results !== '' && results !== 'Loading...'" style="margin-top: -20px; margin-bottom: 10px;" data-test="all-checkboxes-enabled"> -->
    <p  v-if="true" style="margin-top: -20px; margin-bottom: 10px;" data-test="all-checkboxes-enabled">
      diaktifkan: {{ allCheckboxesEnabled }}
    </p>
    
    {{ results !== '' && results !== 'Loading...' ? '📌' : '' }}
    <!-- <div v-if="results !== '' && results !== 'Loading...'"> -->
      <h4 style="margin-top: 0px;margin-bottom: 5px;">Tag Singkat Islam:</h4>
      <div
        v-for="(ceramahAndUst, index) in arrayCeramahAndUst"
        :key="ceramahAndUst.name"
        data-test="array-ceramah-and-Ust"
        :class="[ceramahAndUst.completed ? 'completed' : '']"
        @change="ceramahAndUstChanged($event, index)"
      >
        <input
          type="checkbox"
          v-model="ceramahAndUst.completed"
          data-test="ceramah-and-ust-checkbox"
        />
        <a>{{ ceramahAndUst.name }}</a>
        <div style="margin-left: 20px;">
          <small>{{ ceramahAndUst.tweets }}</small>
        </div>
      </div>
  
      <h4 style="margin-top: 10px;margin-bottom: 5px;">Tag Ustadz:</h4>
      <div
        v-for="(ustadz, index) in arrayCeramahAndUst"
        :key="ustadz.name"
        data-test="array-ustadz"
        :class="[ustadz.completed ? 'completed' : '']"
        @change="ustadzChanged($event, index)"
      >
        <input
          type="checkbox"
          v-model="ustadz.completed"
          data-test="ustadz-checkbox"
        />
        <a :href="ustadz.url" target="_blank">{{ ustadz.name }}</a>
      </div>
    <!-- </div> -->
  </main>
</template>