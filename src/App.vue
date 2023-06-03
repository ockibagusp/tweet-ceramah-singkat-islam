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
      // array: ceramah singkat Islam
      arrayCeramahSI: [
        {
          name: 'Singkat',
          tweets: '#CeramahPendek #Shorts #Video #YouTube',
          completed: true
        },
        {
          name: 'Islam',
          tweets: '#KajianIslam #Islam #Muslim #Hikmah #IslamItuIndah #IslamAgamaKu',
          completed: false
        },
        {
          name: 'Pengajian',
          tweets: '#Pengajian',
          completed: false
        },
        {
          name: 'RIBA',
          tweets: '#RIBA',
          completed: false
        },
        {
          name: 'Azab',
          tweets: '#Azab',
          completed: false
        }
      ],
      // array: Ustadz
      arrayUstadz: [
        {
          name: 'Dr. Firanda Andirja Abidin, Lc., M.A.',
          url: 'https://id.wikipedia.org/wiki/Firanda_Andirja',
          completed: false
        },
        {
          name: 'Dr. Khalid Zeed Abdullah Basalamah, Lc., M.A.',
          url: 'https://id.wikipedia.org/wiki/Khalid_Basalamah',
          completed: false
        },
        {
          name: 'Dr. Syafiq Riza Hasan Basalamah, Lc., M.A.',
          url: 'https://id.wikipedia.org/wiki/Syafiq_Riza_Basalamah',
          completed: false
        },
        {
          name: 'Dr. (H.C.) Adi Hidayat, Lc., M.A.',
          url: 'https://id.wikipedia.org/wiki/Adi_Hidayat',
          completed: false
        },
        {
          name: 'Prof. Abdul Somad Batubara, Lc., D.E.S.A., Ph.D.',
          url: 'https://id.wikipedia.org/wiki/Abdul_Somad',
          completed: false
        },
        {
          name: '(Abu Yahya) Badrusalam, Lc',
          url: 'https://id.wikipedia.org/wiki/Badrusalam',
          completed: false
        },
      ],

      // array: ceramah singkat Islam dan Ustadz
      ceramahSIText: '',
      ustadzTest: '',
      
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
      if (this.ceramahSingkatIslam == '') {
        this.results = ''
        this.count = 280
        this.selectCopy = false
        this.selectTweet = false
        return
      }

      this.allCheckboxesEnabled = 0

      const regex = /(https:\/\/)?(www\.|m\.)?(youtube\.com|youtu\.be)\/(watch\?v=|shorts\/)?([\w\-]+)(\S+)?/gm

      // Alternative syntax using RegExp constructor
      // const regex = new RegExp('(https:\\/\\/)?(www\\.|m\\.)?(youtube\\.com|youtu\\.be)\\/(watch\\?v=|shorts\\/)?([\\w\\-]+)(\\S+)?', 'gm')

      const str = this.ceramahSingkatIslam
      let m
      let i = 0

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

        this.allCheckboxesEnabled++
        i++
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
      if (ceramahSingkatSlice.search('/watch?v=') === -1 && ceramahSingkatSlice.search('/shorts') === -1) {
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
          this.ceramahSIText = this.arrayCeramahSI[0].tweets
          if (this.ceramahSIText !== '' && this.ustadzTest)
            youtubeVideoHtml = `${youtubeVideoHtml} ${this.ceramahSIText} ${this.ustadzTest}`
          else if (this.ceramahSIText !== '')
            youtubeVideoHtml = youtubeVideoHtml + ' ' + this.ceramahSIText
          else if (this.ustadzTest !== '')
            youtubeVideoHtml = youtubeVideoHtml + ' ' + this.ustadzTest

          youtubeVideoHtml = `${youtubeVideoHtml}

${this.ceramahSingkatIslam}`
          this.selectResults = true
          this.selectCopy = true
          this.selectTweet = true
          this.count = 280 - youtubeVideoHtml.length
        } 

        if (str != '' && youtubeVideoHtml == '') {          
          youtubeVideoHtml = ''
          this.selectResults = false
          this.selectCopy = false
          this.selectTweet = false

          this.count = 280
        }
        this.results = youtubeVideoHtml

        this.isCopyAndCountTweet()
      } catch {
        this.results = 'Tidak ada hasil'
        this.selectResults = false
        this.selectSubmit = false
        this.selectCopy = false
        this.selectTweet = false
      }
    },
    // button: reset, copy dan tweet
    btnReset() {
      this.ceramahSingkatIslam = ''
      // autofocus
      this.$refs.ceramahSingkatIslam.focus()
      this.results = ''
      this.selectCopy = false
      this.selectTweet = false
      this.count = 280
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

    // #KajianIslam #Hikmah #Pengajian #CeramahPendek #Ngaji #Sunnah #Shorts #Video #YouTube #Islam #Muslim
    btnCheckBoxAll() {
      if (this.selectCheckBoxAll === true) {
        let newArrayCeramahSIName = ''
        this.allCheckboxesEnabled = 0

        for (let i = 0; i < this.arrayCeramahSI.length; i++) {
          this.arrayCeramahSI[i].completed = true
          newArrayCeramahSIName += `${this.arrayCeramahSI[i].name}, `
          this.allCheckboxesEnabled++
        }
        this.selectResults = true
        this.selectCopy = true
        this.selectTweet = true

        this.selectCheckBoxAll = false
        
        this.results = TAGS + newArrayCeramahSIName.substring(0, newArrayCeramahSIName.length-2)
        this.count = 280 - this.results.length
        this.isCopyAndCountTweet()
      } else {
        this.arrayCeramahSI.forEach((val, index) => {
          this.arrayCeramahSI[index].completed = false
        })
        this.count = 280
        this.results = 'Tidak ada hasil'
        this.isCopyAndCountTweet()
        this.allCheckboxesEnabled = 0
        
        this.selectResults = false
        this.selectCopy = false
        this.selectTweet = false        
        this.selectCheckBoxAll = true
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
    isResultsError() {
      this.results = 'Tidak ada hasil'
      this.count = 280
      this.selectCopy = false
      this.selectTweet = false
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
      placeholder="DOSA - Ustadz Dr. Firanda Andirja, MA

https://www.youtube.com/shorts/peUj47yc1xo" cols="50" rows="3" ref="results" data-test="results"></textarea>
    <br>
    <button @click="btnCopy" :disabled="isCopy" data-test="btn-copy">Copy</button>
    <button @click="btnTweet" :disabled="isTweet" data-test="btn-tweet">Tweet is: <small v-if="ceramahSingkatIslam.length < 280">+</small> {{count}}</button>
    <br>

    <h4 v-if="results !== ''">Kotak Centang: 
    <button @click="btnCheckBoxAll()" data-test="btn-checkbox-all">
      {{ !isCheckBoxAll ? 'diaktifkan': 'tidak diaktifkan' }}
    </button>    
    </h4>
    
    <p  v-if="results !== ''" style="margin-top: -20px; margin-bottom: 10px;" data-test="all-checkboxes-enabled">
      diaktifkan: {{ allCheckboxesEnabled }}
    </p>
    
    {{ results !== '' ? '📌' : '' }}
    <div v-if="results !== ''">
      <h4 style="margin-top: 0px;margin-bottom: 5px;">Singkat Islam:</h4>
      <div
        v-for="(ceramahSI, index) in arrayCeramahSI"
        :key="ceramahSI.name"
        data-test="array-ceramahSI"
        :class="[ceramahSI.completed ? 'completed' : '']"
        @change="trendsChanged($event, index)"
      >
        <input
          type="checkbox"
          v-model="ceramahSI.completed"
          data-test="ceramahSI-checkbox"
        />
        <a>{{ ceramahSI.name }}</a>
      </div>
  
      <h4 style="margin-top: 10px;margin-bottom: 5px;">Ustadz:</h4>
      <div
        v-for="(ustadz, index) in arrayUstadz"
        :key="ustadz.name"
        data-test="array-ustadz"
        :class="[ustadz.completed ? 'completed' : '']"
        @change="trendsChanged($event, index)"
      >
        <input
          type="checkbox"
          v-model="ustadz.completed"
          data-test="ustadz-checkbox"
        />
        <a :href="ustadz.url" target="_blank">{{ ustadz.name }}</a>
      </div>
    </div>
  </main>
</template>