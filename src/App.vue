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
const SHORTSANDWATCH= [
  '/watch?v=',
  '/shorts/',
  '/watch',
  '/shorts'
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
      
      // pilih button salinan dan tweet: true atau false
      selectResults: false,
      selectCopy: false,
      selectTweet: false
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
    }
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
          // console.log(`Found match, group ${groupIndex}: ${match}`)
          if (groupIndex === 0) {
              if (match !== undefined) {
                youtubeVideoHtml = match
                quit = true
              }
            }
        })
      }

      if (!quit)
        this.results = 'Tidak ada hasil'

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

        console.log(res.status);
        if (res.status == 200 ) {
          // ?
          console.log(res.status)
        } else if (res.status == 404) {
          this.results = 'Tidak ada hasil'
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
          youtubeVideoHtml = `${youtubeVideoHtml} 

${this  .ceramahSingkatIslam}`
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
    <textarea style="width: 500px;height: 50px;" v-model="results"
      placeholder="DOSA - Ustadz Dr. Firanda Andirja, MA #ceramahsingkat

https://www.youtube.com/shorts/peUj47yc1xo" cols="50" rows="3" ref="results" data-test="results"></textarea>
    <br>
    <button @click="btnCopy" :disabled="isCopy" data-test="btn-copy">Copy</button>
    <button @click="btnTweet" :disabled="isTweet" data-test="btn-tweet">Tweet is: <small v-if="ceramahSingkatIslam.length < 280">+</small> {{count}}</button>
    <br>
  </main>
</template>