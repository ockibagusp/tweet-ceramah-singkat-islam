<script setup></script>

<script>
const REDIRCETURL = "http://localhost:3000/video";
const YOUTUBEVIDURLS = [
  "https://www.youtube.com",
  "www.youtube.com",
  "youtube.com",
  "https://youtu.be",
  "youtu.be",
  "https://",
];

import axios from "axios";

export default {
  data() {
    return {
      // textarea: ceramahSingkatIslam
      ceramahSingkatIslam: "",
      ceramahSingkatIslamCopy: "",
      // textarea: hasil
      results: "",
      // bool: resultsBool
      resultsBool: false,
      // tweet dihasil maks. 280 karakter
      counts: 280,
      // arrays: ceramah singkat Islam
      arrsCeramahSI: [
        {
          name: "Singkat",
          tweets: "#CeramahPendek #Shorts #Video #YouTube",
          url: "#",
          completed: false,
        },
        {
          name: "Islam",
          tweets:
            "#KajianIslam #Islam #Muslim #Hikmah #IslamItuIndah #IslamAgamaKu",
          url: "#",
          completed: false,
        },
        {
          name: "Pengajian",
          tweets: "#Pengajian",
          url: "https://twitter.com/search?q=%23Pengajian",
          completed: false,
        },
        {
          name: "Sholat",
          tweets: "#Sholat",
          url: "https://twitter.com/search?q=%23Sholat",
          completed: false,
        },
        {
          name: "Al-Qur'an",
          tweets: "#AlQuran #Quran",
          url: "https://twitter.com/search?q=%23AlQuran",
          completed: false,
        },
        {
          name: "Sedekah",
          tweets: "#Sedekah",
          url: "https://twitter.com/search?q=%23Sedekah",
          completed: false,
        },
        {
          name: "Mualaf",
          tweets: "#Mualaf",
          url: "https://twitter.com/search?q=%23Mualaf",
          completed: false,
        },
        {
          name: "Musibah",
          tweets: "#Musibah",
          url: "https://twitter.com/search?q=%23Musibah",
          completed: false,
        },
        {
          name: "Taubat",
          tweets: "#Taubat #TaubatNasuha #TaubatSebelumTerlambat",
          url: "https://twitter.com/search?q=%23Taubat",
          completed: false,
        },
        {
          name: "Dosa",
          tweets: "#Dosa",
          url: "https://twitter.com/search?q=%23Dosa",
          completed: false,
        },
        {
          name: "Utang",
          tweets: "#Utang",
          url: "https://twitter.com/search?q=%23Utang",
          completed: false,
        },
        {
          name: "RIBA",
          tweets: "#RIBA",
          url: "https://twitter.com/search?q=%23RIBA",
          completed: false,
        },
        {
          name: "Azab",
          tweets: "#Azab",
          url: "https://twitter.com/search?q=%23Azab",
          completed: false,
        },
        {
          name: "Zina",
          tweets: "#Zina",
          url: "https://twitter.com/search?q=%23Zina",
          completed: false,
        },
      ],
      // arrays: Ustadz
      arrsUstadz: [
        {
          name: "Dr. Firanda Andirja, Lc., M.A.",
          tweets: "#UstadzFirandaAndirja #FirandaAndirja",
          url: "https://id.wikipedia.org/wiki/Firanda_Andirja",
          completed: false,
        },
        {
          name: "Dr. Khalid Basalamah, Lc., M.A.",
          tweets: "#UstadzKhalidBasalamah #KhalidBasalamah",
          url: "https://id.wikipedia.org/wiki/Khalid_Basalamah",
          completed: false,
        },
        {
          name: "Dr. Syafiq Riza Basalamah, Lc., M.A.",
          tweets: "#UstadzSyafiqBasalamah #SyafiqRizaBasalamah",
          url: "https://id.wikipedia.org/wiki/Syafiq_Riza_Basalamah",
          completed: false,
        },
        {
          name: "Dr. (H.C.) Adi Hidayat, Lc., M.A.",
          tweets: "#UstadzAdiHidayat #UAH",
          url: "https://id.wikipedia.org/wiki/Adi_Hidayat",
          completed: false,
        },
        {
          name: "Prof. Abdul Somad, Lc., D.E.S.A., Ph.D.",
          tweets: "#UstadzAbdulSomad #UAS",
          url: "https://id.wikipedia.org/wiki/Abdul_Somad",
          completed: false,
        },
        {
          name: "(Abu Yahya) Badrusalam, Lc",
          tweets: "#UstadzBadrusalam",
          url: "https://id.wikipedia.org/wiki/Badrusalam",
          completed: false,
        },
      ],

      // TODO: config.json
      // tweets: e.q
      //  [0] => "#CeramahPendek #Shorts #Video #YouTube"
      //  [1] => "#KajianIslam #Islam #Muslim #Hikmah #IslamItuIndah #IslamAgamaKu"
      //  ...
      arrStartCermTweets: [0],
      // tweets: e.q
      //  [0] => "#UstadzFirandaAndirja #FirandaAndirja"
      //  ...
      arrStartUstTweets: [],

      // string: judul
      judulText: "",
      // string: Youtube video
      youtubeVideo: "",

      // pilih button salinan dan tweet: true atau false
      selectResults: false,
      selectCopy: false,
      selectTweet: false,

      // pilih `semua kotak centang`: true atau false
      selectCheckBoxAll: false,

      // `semua kotak centang` diaktifkan
      allCheckboxesEnabled: 0,
    };
  },
  mounted() {
    this.$refs.ceramahSingkatIslam.focus();
  },
  computed: {
    // adalah hasil dan button copy: true atau false
    isResults: function () {
      return !this.selectResults;
    },
    isCopy: function () {
      return !this.selectCopy;
    },
    isTweet: function () {
      return !this.selectTweet;
    },
    // adalah button `semua kotak centang`: true atau false
    isCheckBoxAll: function () {
      return !this.selectCheckBoxAll;
    },
  },
  watch: {
    // textarea: ceramahSingkatIslam
    ceramahSingkatIslam() {
      // vue methods: memuat
      this.carry();
    },
  },
  methods: {
    // dibuat: dari textarea ceramahSingkatIslam ini
    async carry() {
      this.allCheckboxesEnabled = 1;

      let judulText = "";
      let results = "";

      // "https://www.youtube.com/shorts/peUj47yc1xo" => "https://youtu.be/-mD93UwO_40" ?
      if (this.ceramahSingkatIslam === "") {
        this.results = "";
        this.ceramahSingkatIslamCopy = "";
        this.isResultsDefault();
        return;
      }

      if (this.ceramahSingkatIslam !== this.ceramahSingkatIslamCopy) {
        this.arrsCeramahSI.forEach((element) => {
          element.completed = false;
        });
        this.arrsCeramahSI.forEach((element) => {
          element.completed = false;
        });
      } else {
        this.ceramahSingkatIslamCopy = this.ceramahSingkatIslam;
      }

      if (this.ceramahSingkatIslam !== this.ceramahSingkatIslamCopy) {
        this.arrsCeramahSI.forEach((element) => {
          element.completed = false;
        });
        this.arrsCeramahSI.forEach((element) => {
          element.completed = false;
        });
      } else {
        this.ceramahSingkatIslamCopy = this.ceramahSingkatIslam;
      }

      // why? textarea this.ceramahSingkatIslam = '#', '?', etc.
      const regex =
        /(https:\/\/)?(www\.|m\.)?(youtube\.com|youtu\.be)\/(watch\?v=|shorts\/)?([\w\-]+)([^\r\n\t\f\v \?&]+)?/gm;

      // Alternative syntax using RegExp constructor
      // const regex = new RegExp('(https:\\/\\/)?(www\\.|m\\.)?(youtube\\.com|youtu\\.be)\\/(watch\\?v=|shorts\\/)?([\\w\\-]+)(\\S+)?', 'gm')
      let m;

      let quit = false;
      while ((m = regex.exec(this.ceramahSingkatIslam)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
          regex.lastIndex++;
        }

        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {
          if (groupIndex === 0) {
            if (match !== undefined) {
              judulText = match;
            }
          }

          if (groupIndex === 5) {
            if (match !== undefined) {
              // e.g.: youtube.com/watch?v=0123... or youtube.com/shorts/0123...
              if (
                match.search("watch") === -1 &&
                match.search("shorts") === -1
              ) {
                quit = true;
              }
            }
          }
        });
      }

      if (!quit) return this.isResultsError();

      // memotong pada youtube atau youtu ke '': misalnya,
      //  'https://www.youtube.com/shorts/peUj47yc1xo' ke '/shorts/peUj47yc1xo'
      let ceramahSingkatSlice = judulText
        .replace(YOUTUBEVIDURLS.at(0), "")
        .replace(YOUTUBEVIDURLS.at(1), "")
        .replace(YOUTUBEVIDURLS.at(2), "")
        .replace(YOUTUBEVIDURLS.at(3), "")
        .replace(YOUTUBEVIDURLS.at(4), "")
        .replace(YOUTUBEVIDURLS.at(5), "");

      // https://youtu.be/-s0o6o5_ApU -> Tidak ada hasil
      //  => Kenapa Nabi Melarang Duduk di Pinggir Jalan? - Ustadz Dr. Firanda Andirja, Lc, MA ...
      if (
        ceramahSingkatSlice.search("/watch") === -1 &&
        ceramahSingkatSlice.search("/shorts") === -1
      ) {
        ceramahSingkatSlice =
          "/watch?v=" + ceramahSingkatSlice.replace("/", "");
      }

      let ceramahSingkatIslam = REDIRCETURL + ceramahSingkatSlice;

      // textarea hasil: loading...
      this.results = "Loading...";

      try {
        const res = await axios.get(ceramahSingkatIslam);
        if (
          res.status == 200 &&
          (ceramahSingkatSlice == "/shorts/" ||
            ceramahSingkatSlice == "/shorts" ||
            ceramahSingkatSlice == "/watch?v=")
        ) {
          this.isResultsError();
          return;
        } else if (res.status == 404) {
          this.isResultsError();
          return;
        } else if (
          res.data.search(`This video isn't available anymore`) !== -1
        ) {
          this.isResultsError();
          return;
        }

        const regex =
          /<meta name="title" content="(.+)"><meta name="description" content=/gm;
        // Alternative syntax using RegExp constructor
        // const regex = new RegExp('<title>(.+)<\\/title>', 'gm')
        const str = res.data;
        let m;
        while ((m = regex.exec(str)) !== null) {
          // This is necessary to avoid infinite loops with zero-width matches
          if (m.index === regex.lastIndex) {
            regex.lastIndex++;
          }
          // The result can be accessed through the `m`-variable.
          m.forEach((match, groupIndex) => {
            if (groupIndex === 1) {
              // unescape HTML
              const unescapeHtml = match
                .replace(/&amp;/g, "&")
                .replace(/&lt;/g, "<")
                .replace(/&gt;/g, ">")
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'");

              if (unescapeHtml !== undefined) {
                judulText = unescapeHtml;
                return;
              }
            }
          });
        }

        if (judulText != "") {
          // tag tweets: ceramahsi dan ustadz
          let tweetsTags = this.startTweetTagsFunc(judulText);

          this.judulText = judulText;
          this.youtubeVideo = this.isYoutubeComToYoutube(ceramahSingkatSlice);

          // textarea youtube.com ke youtu.be
          results = `${judulText} ${tweetsTags}\n\n${this.youtubeVideo}`;
          this.isResultsSuccess(results.length);
        }

        if (str != "" && results == "") {
          results = "";
          this.isResultsDefault();
        }
        this.results = results;
      } catch {
        this.isResultsError();
      }
    },

    // startTweetTagsFunc("...") => "..."
    // startTweetTagsFunc() => alert
    //
    // e.q
    // Start Ceramah SI and Ustadz Tweets:
    // startTweetTagsFunc("Test One")
    startTweetTagsFunc(judulText = "") {
      // prevDone

      // tag ceramahSI
      let arrStartTweetsTags = [];
      for (let i = 0; i < this.arrsCeramahSI.length; i++) {
        const currCeramahSI = this.arrsCeramahSI.at(i);
        // [i] => i |
        // .at(i) => i | undefined
        if (this.arrStartCermTweets.at(i) !== undefined) {
          const tweetTagsSplit = currCeramahSI.tweets.split(" ");
          if (tweetTagsSplit.length === 0) {
            alert(
              "(method) startTweetsTagsFunc => this.arrStartCermTweets is tweetTagsSplit = []"
            );
            return;
          }

          // tweetTagsSplit.length !== 0
          tweetTagsSplit.forEach((tweet) => {
            const tweetTagRegex = new RegExp(
              // e.q: tweetTagsSplit.at(index).toLowerCase(),
              tweet.toLowerCase(),
              "i"
            );

            // true: !true (false)
            //  eq. "#TestOne #1" => "#TestOne" (!true -> false)
            // false: !false (true)
            //  eq. "#TestFour #4 #Test4 #Four" => "#TestOne" (!false -> true)
            const isTweet = tweetTagRegex.test(judulText.toLowerCase());
            if (!isTweet) {
              arrStartTweetsTags.push(tweet);
            }
          });
          // [i].completed => true
          // arrays: arrsCeramahSI: Singkat => true
          currCeramahSI.completed = true;
          this.allCheckboxesEnabled++;
        }
      }

      // tag Ustadz
      for (let i = 0; i < this.arrsUstadz.length; i++) {
        const currUstadz = this.arrsUstadz.at(i);
        // [i] => i |
        // .at(i) => i | undefined
        if (this.arrStartUstTweets.at(i) !== undefined) {
          const tweetTagsSplit = currUstadz.tweets.split(" ");
          if (tweetTagsSplit.length === 0) {
            alert(
              "(method) startTweetsTagsFunc => this.arrStartUstTweets is tweetTagsSplit = []"
            );
            return;
          }

          // tweetTagsSplit.length !== 0
          tweetTagsSplit.forEach((tweet) => {
            const tweetTagRegex = new RegExp(
              // e.q: tweetTagsSplit.at(index).toLowerCase(),
              tweet.toLowerCase(),
              "i"
            );

            // true: !true (false)
            //  eq. "#TestOne #1" => "#TestOne" (!true -> false)
            // false: !false (true)
            //  eq. "#TestFour #4 #Test4 #Four" => "#TestOne" (!false -> true)
            const isTweet = tweetTagRegex.test(judulText.toLowerCase());
            if (!isTweet) {
              arrStartTweetsTags.push(tweet);
            }
          });
          // [i].completed => true
          // arrays: arrsUstadz: "Dr. Firanda Andirja, Lc., M.A." => true
          currUstadz.completed = true;
          this.allCheckboxesEnabled++;
        }
      }

      return arrStartTweetsTags.join(" ");
    },

    // button: reset, copy dan tweet
    btnReset() {
      this.ceramahSingkatIslam = "";
      // autofocus
      this.$refs.ceramahSingkatIslam.focus();
      this.arrsCeramahSI.forEach((element) => {
        element.completed = false;
      });
      this.arrsCeramahSI.forEach((element) => {
        element.completed = false;
      });
      this.isNotResults();
    },

    btnCopy() {
      if (this.results == "") {
        return;
      }

      this.$refs.results.select();
      // Untuk perangkat seluler
      this.$refs.results.setSelectionRange(0, 99999);

      navigator.clipboard.writeText(this.results);
    },

    btnTweet() {
      if (this.results.length > 280) {
        this.selectTweet = false;
        return;
      }
      const UTF8Hash = this.results
        .replaceAll(":", "%3A")
        .replaceAll("\/", "%2F")
        .replaceAll("|", "%7C")
        .replaceAll(" #", "%20%23")
        .replaceAll(" # ", "%20%23%20")
        .replaceAll("# ", "%23%20")
        .replaceAll(" ", "%20");

      const UTF8HashArray = UTF8Hash.split("\n\n");
      let UTF8HashReal = UTF8HashArray.join("%20");
      window.open(
        "https://twitter.com/intent/tweet?text=" + UTF8HashReal,
        "_blank"
      );
    },

    btnCheckBoxAll() {
      if (this.selectCheckBoxAll === true) {
        // TODO: config.json

        // => tag tweets: ceramahsi dan ustadz
        let tweetsTags = this.startTweetTagsFunc(this.judulText);

        // textarea youtube.com ke youtu.be
        this.results = `${this.judulText} ${tweetsTags}\n\n${this.youtubeVideo}`;
        this.isResultsSuccess(this.results.length);

        this.selectResults = true;
        this.selectCopy = true;
        this.selectTweet = true;

        this.selectCheckBoxAll = false;
      } else {
        this.arrsCeramahSI.forEach((val, index) => {
          this.arrsCeramahSI.at(index).completed = false;
        });
        this.arrsCeramahSI.forEach((ceramahSI) => {
          ceramahSI.completed = false;
        });

        this.results = `${this.judulText}\n\n${this.youtubeVideo}`;
        this.isResultsSuccess(this.results.length);
        this.allCheckboxesEnabled = 0;
        this.selectCheckBoxAll = true;
      }
    },

    // html: Tag Singkat Islam dan Tag Ustadz
    // berubah dalam array untuk ceramah Singkat Islam dan Ustadz
    tweetsTagsChanged(event, index, isArray) {
      // e.q: tweetTag = "#TestOne" dan "#AuthorOne";
      let tweetTag = "";
      // arrays: tweet tag => Ceramah Singkat Islam dan Ustadz
      let arrsTweetsTags = [];

      if (isArray.toLowerCase() === "ceramahsi") {
        tweetTag = this.arrsCeramahSI.at(index).tweets;
      } else if (isArray.toLowerCase() === "ustadz") {
        tweetTag = this.arrsUstadz.at(index).tweets;
      } else {
        alert(
          "(method) tweetsTagsChanged(event, index, isArray). isArray: 'ceramahSI' or 'ustadz'"
        );
      }

      const tweetTagsSplit = tweetTag.split(" ");
      if (tweetTagsSplit.length === 0) {
        alert("(method) tweetsTagsChanged => tweetTagsSplit = []");
        return;
      }

      let arrTweetTagsIndexes = [];
      // tweetTagsSplit.length !== 0
      tweetTagsSplit.forEach((tweet, index) => {
        // "i": a A => a
        const tweetTagRegex = new RegExp(tweet.toLowerCase(), "i");

        // true: !true (false)
        //  eq. "#TestOne #1" => "#TestOne" (!true -> false)
        // false: !false (true)
        //  eq. "#TestFour #4 #Test4 #Four" => "#TestOne" (!false -> true)
        const isTweet = tweetTagRegex.test(this.results.toLowerCase());
        if (!isTweet) {
          arrTweetTagsIndexes.push(index);
        }
      });

      // ObjCeramahSITweets === undefined
      if (event.target.checked) {
        // arrsCeramahSI
        for (let i = 0; i < this.arrsCeramahSI.length; i++) {
          const currCeramahSI = this.arrsCeramahSI.at(i);
          // true: !true (false)
          if (currCeramahSI.completed !== false) {
            arrsTweetsTags.push(currCeramahSI.tweets)
          }

          // ????????

        }
          if (alpha.completed === true) {
            for (let i = 0; i < tweetTagsSplit.length; i++) {
              const iTweet = tweetTagsSplit.at(i);
              console.log("jTweet:", iTweet);
              console.log("checked:", alpha.tweets);
              if (
                tweetTagsSplit.at(i).toLocaleLowerCase() ===
                iTweet.toLowerCase()
              )
                arrsTweetsTags.push(iTweet);
            }
          }
          for (let j = 0; j < betaArray.length; j++) {
            // true == !false
            if (betaArray.at(j).completed !== false) {
              arrsUstadz.push(betaArray.at(j).tweets);
            }
          }
          this.objCeramahSITweets.join(" ");
          newArrayAlphaTweets = newArrayAlphaTweets.substring(
            0,
            newArrayAlphaTweets.length - 1
          );
        } else if (isArray === "ustadz") {
          for (let i = 0; i < betaArray.length; i++) {
            if (betaArray.at(i).completed !== false) {
              newArrayAlphaTweets += `${betaArray.at(i).tweets} `;
            }
          }
          for (let j = 0; j < alphaArray.length; j++) {
            if (alphaArray.at(j).completed !== false) {
              newArrayAlphaTweets += `${alphaArray.at(j).tweets} `;
            }
          }
          newArrayAlphaTweets = newArrayAlphaTweets.substring(
            0,
            newArrayAlphaTweets.length - 1
          );
        }
        this.results = `${this.judulText} ${newArrayAlphaTweets}\n\n${this.youtubeVideo}`;
        if (this.results.length > 280) {
          this.isResultsError();
          return;
        }
        this.isResultsSuccess(this.results.length);
        this.allCheckboxesEnabled++;
      } else {
        const rightComma = `${tweetTag} `;
        const leftComma = ` ${tweetTag}`;
        const bothComma = ` ${tweetTag} `;

        let release = "";
        if (this.results.includes(rightComma)) {
          release = rightComma;
        } else if (this.results.includes(leftComma)) {
          release = leftComma;
        } else if (this.results.includes(bothComma)) {
          release = bothComma;
        }

        this.results = this.results.replace(release, "");
        this.isResultsSuccess(this.results.length);
        this.allCheckboxesEnabled--;
      }
    },
    // adalah textarea youtube.com ke youtu.be
    isYoutubeComToYoutube(link) {
      // memotong pada youtube atau youtu ke '': misalnya,
      //  'https://www.youtube.com/shorts/peUj47yc1xo' ke '/shorts/peUj47yc1xo'
      let ceramahSingkatSlice = link
        .replace(YOUTUBEVIDURLS.at(0), "")
        .replace(YOUTUBEVIDURLS.at(1), "")
        .replace(YOUTUBEVIDURLS.at(2), "")
        .replace(YOUTUBEVIDURLS.at(3), "")
        .replace(YOUTUBEVIDURLS.at(4), "");

      return (
        "youtu.be/" +
        ceramahSingkatSlice
          .replace("/watch?v=", "")
          .replace("/shorts/", "")
          .replace("/", "")
          .replace("?feature=share", "")
          // e.q. https://www.youtube.com/watch?v=012345...&t=1s
          .replace("&t=1s", "")
          .replace(/&list=WL&index=\d{1,}/, "")
      );
    },
    isNotResults() {
      this.results = "";
      this.isResultsDefault();
    },
    isResultsError() {
      this.results = "Tidak ada hasil";
      this.isResultsDefault();
    },
    isResultsDefault() {
      this.resultsBool = false;
      this.counts = 280;
      this.selectCopy = false;
      this.selectTweet = false;
      this.arrsCeramahSI.forEach((val, index) => {
        this.arrsCeramahSI[index].completed = false;
      });
      this.arrsCeramahSI.forEach((element) => {
        element.completed = false;
      });
      this.allCheckboxesEnabled = 0;
    },
    isResultsSuccess(videoLength) {
      this.resultsBool = true;
      this.selectResults = true;
      this.selectCopy = true;
      this.selectTweet = true;
      this.counts = 280 - videoLength;
    },
  },
};
</script>

<template>
  <main>
    <h2 style="margin-top: 2px">Tweet Ceramah Singkat Islam</h2>
    <h3 style="margin-top: -10px; margin-bottom: 5px">Youtube Video Link:</h3>
    <input
      v-model="ceramahSingkatIslam"
      style="width: 500px"
      placeholder="https://www.youtube.com/shorts/peUj47yc1xo"
      cols="38"
      ref="ceramahSingkatIslam"
      data-test="ceramah-singkat-islam"
    />
    <br />
    <button style="margin-top: 4px" @click="btnReset" data-test="btn-reset">
      Reset
    </button>
    <br />
    <h3 style="margin-top: 10px; margin-bottom: -15px">Hasil:</h3>
    <br />
    <textarea
      style="width: 500px; height: 80px"
      v-model="results"
      placeholder="DOSA - Ustadz Dr. Firanda Andirja, MA #CeramahPendek #Shorts #Video #YouTube

https://youtu.be/peUj47yc1xo"
      cols="50"
      rows="3"
      ref="results"
      data-test="results"
    ></textarea>
    <br />
    <button @click="btnCopy" :disabled="isCopy" data-test="btn-copy">
      Copy
    </button>
    <button @click="btnTweet" :disabled="isTweet" data-test="btn-tweet">
      Tweet is: <small v-if="ceramahSingkatIslam.length < 280">+</small>
      {{ counts }}
    </button>
    <br />

    <!-- <h4 v-if="resultsBool">
      Kotak Centang: -->
    <h4 v-if="true">
      Kotak Centang:
      <button @click="btnCheckBoxAll()" data-test="btn-checkbox-all">
        {{ !isCheckBoxAll ? "diaktifkan" : "tidak diaktifkan" }}
      </button>
    </h4>

    <!-- <p
      v-if="resultsBool"
      style="margin-top: -20px; margin-bottom: 10px"
      data-test="all-checkboxes-enabled"
    > -->
    <p
      v-if="true"
      style="margin-top: -20px; margin-bottom: 10px"
      data-test="all-checkboxes-enabled"
    >
      diaktifkan: {{ allCheckboxesEnabled }}
    </p>

    {{ resultsBool ? "📌" : "" }}
    <!-- <div v-if="resultsBool"> -->
    <div v-if="true">
      <h4 style="margin-top: 0px; margin-bottom: 5px">Tag Singkat Islam:</h4>
      <div
        v-for="(ceramahSI, index) in arrsCeramahSI"
        :key="ceramahSI.name"
        data-test="array-ceramahSI"
        :class="[ceramahSI.completed ? 'completed' : '']"
        @change="tweetsTagsChanged($event, index, 'ceramahSI')"
      >
        <input
          type="checkbox"
          v-model="ceramahSI.completed"
          data-test="ceramahSI-checkbox"
        />
        <a :href="ceramahSI.url" v-if="ceramahSI.url !== '#'" target="_blank">{{
          ceramahSI.name
        }}</a>
        <a v-else>{{ ceramahSI.name }}</a>
        <div style="margin-left: 20px">
          <small>{{ ceramahSI.tweets }}</small>
        </div>
      </div>

      <h4 style="margin-top: 10px; margin-bottom: 5px">Tag Ustadz:</h4>
      <div
        v-for="(ustadz, index) in arrsUstadz"
        :key="ustadz.name"
        data-test="array-ustadz"
        :class="[ustadz.completed ? 'completed' : '']"
        @change="tweetsTagsChanged($event, index, 'ustadz')"
      >
        <input
          type="checkbox"
          v-model="ustadz.completed"
          data-test="ustadz-checkbox"
        />
        <a :href="ustadz.url" target="_blank">{{ ustadz.name }}</a>
        <div style="margin-left: 20px">
          <small>{{ ustadz.tweets }}</small>
        </div>
      </div>
    </div>
  </main>
</template>
