<script setup>
</script>

<script>
const REDIRCETURL = 'http://localhost:3000/video'
import axios from 'axios'

export default {
  data() {
    return {
      // textarea: ceramahSingkatIslam dan ceramahSingkatIslam
      ceramahSingkatIslam: '',
      youtubeVideoHtml: '',
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
      this.beMade()
    }
  },
  methods: {
    // dibuat: dari textarea ceramahSingkatIslam ini
    async beMade() {
      this.selectResults = false
      this.selectSubmit = false
      this.selectCopy = false
      this.selectTweet = false
      this.count = 280

      // textarea hasil: loading...
      this.results = 'Loading...'

      try {
        let ceramahSingkatIslam = REDIRCETURL + '/shorts/peUj47yc1xo'
        
        const res = await axios.get(ceramahSingkatIslam)
        
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
                if (match !== undefined)
                  this.youtubeVideoHtml = match
                  return
                }
            })
        }
      } catch (error) {
        this.ceramahSingkatIslam = ''
        this.selectResults = false
        this.selectSubmit = false
        this.selectCopy = false
        this.selectTweet = false
        alert(error)
      }

      // if (trends != '') {
      //   trends = TAGS + trends.substring(0, trends.length-2)
      //   this.selectResults = true
      //   this.selectCopy = true
      //   this.selectTweet = true

      //   this.count = 280 - trends.length
      // } if (str != '' && trends == '') {
      //   trends = 'Tidak ada hasil'
      //   this.selectResults = false
      //   this.selectCopy = false
      //   this.selectTweet = false

      //   this.count = 280
      // }

      // if (profile != '' && status != '') {
      //   newceramahSingkatIslam = `https://twitter.com/${profile}/status/${status}/video/1`
      //   this.selectResults = true
      //   this.selectCopy = true
      //   this.selectTweet = true

      //   this.count = 280 - newceramahSingkatIslam.length
      // } else {
      //   newceramahSingkatIslam = this.ceramahSingkatIslam
      //   this.selectResults = false
      //   this.selectCopy = false
      //   this.selectTweet = false

      //   this.count = 280
      // }
      this.results = this.youtubeVideoHtml
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
  }
}
</script>

<template>
  <main>
    <h2 style="margin-top: 2px;">Tweet Ceramah Singkat Islam</h2>
    <h3 style="margin-top: -10px; margin-bottom: 5px;">Youtube Video Link:</h3>
    <textarea v-model="ceramahSingkatIslam" style="width: 500px;"
      placeholder="https://www.youtube.com/shorts/peUj47yc1xo" cols="38" ref="ceramahSingkatIslam" data-test="ceramah-singkat-islam"></textarea>
    <br>
    <button style="margin-top: 4px;" @click="btnReset" data-test="btn-reset">Reset</button>
    <br>
    <h3 style="margin-top: 10px; margin-bottom: -15px;">Hasil:</h3>
    <br>
    <textarea style="width: 500px;height: 50px;" v-model="results"
      placeholder="DOSA - Ustadz Dr. Firanda Andirja, MA #ceramahsingkat

https://www.youtube.com/shorts/peUj47yc1xo
      " cols="50" rows="3" ref="results" data-test="results"></textarea>
    <br>
    <button @click="btnCopy" :disabled="isCopy" data-test="btn-copy">Copy</button>
    <button @click="btnTweet" :disabled="isTweet" data-test="btn-tweet">Tweet is: <small v-if="ceramahSingkatIslam.length < 280">+</small> {{count}}</button>
    <br>
  </main>
</template>