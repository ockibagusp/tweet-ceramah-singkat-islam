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
          id: 0,
          name: "Singkat",
          tweetsTags: {
            isTitleAll: false,
            tags: [
              {
                trend: "#CeramahPendek",
                urlChild: "https://twitter.com/search?q=%23CeramahPendek",
                titleExists: false,
              },
              {
                trend: "#Shorts",
                urlChild: "https://twitter.com/search?q=%23Shorts",
                titleExists: false,
              },
              {
                trend: "#Video",
                urlChild: "https://twitter.com/search?q=%23Video",
                titleExists: false,
              },
              {
                trend: "#YouTube",
                urlChild: "https://twitter.com/search?q=%23YouTube",
                titleExists: false,
              },
            ],
          },
          completed: false,
        },
        {
          id: 1,
          name: "Islam",
          tweetsTags: {
            isTitleAll: false,
            tags: [
              {
                trend: "#KajianIslam",
                urlChild: "https://twitter.com/search?q=%23KajianIslam",
                titleExists: false,
              },
              {
                trend: "#Islam",
                urlChild: "https://twitter.com/search?q=%23Islam",
                titleExists: false,
              },
              {
                trend: "#Muslim",
                urlChild: "https://twitter.com/search?q=%23Muslim",
                titleExists: false,
              },
              {
                trend: "#Hikmah",
                urlChild: "https://twitter.com/search?q=%23Hikmah",
                titleExists: false,
              },
              {
                trend: "#IslamItuIndah",
                urlChild: "https://twitter.com/search?q=%23IslamItuIndah",
                titleExists: false,
              },
              {
                trend: "#IslamAgamaKu",
                urlChild: "https://twitter.com/search?q=%23IslamAgamaKu",
                titleExists: false,
              },
            ],
          },
          completed: false,
        },
        {
          id: 2,
          name: "Pengajian",
          tweetsTags: "#Pengajian",
          urlRoot: "https://twitter.com/search?q=%23Pengajian",
          completed: false,
        },
        {
          id: 3,
          name: "Sholat",
          tweetsTags: "#Sholat",
          urlRoot: "https://twitter.com/search?q=%23Sholat",
          completed: false,
        },
        {
          id: 4,
          name: "Al-Qur'an",
          tweetsTags: {
            isTitleAll: false,
            tags: [
              {
                trend: "#AlQuran",
                urlChild: "https://twitter.com/search?q=%23AlQuran",
                titleExists: false,
              },
              {
                trend: "#Quran",
                urlChild: "https://twitter.com/search?q=%23Quran",
                titleExists: false,
              },
            ],
          },
          completed: false,
        },
        {
          id: 5,
          name: "Sedekah",
          tweetsTags: "#Sedekah",
          urlRoot: "https://twitter.com/search?q=%23Sedekah",
          completed: false,
        },
        {
          id: 6,
          name: "Mualaf",
          tweetsTags: "#Mualaf",
          urlRoot: "https://twitter.com/search?q=%23Mualaf",
          completed: false,
        },
        {
          id: 7,
          name: "Musibah",
          tweetsTags: "#Musibah",
          urlRoot: "https://twitter.com/search?q=%23Musibah",
          completed: false,
        },
        {
          id: 8,
          name: "Taubat",
          tweetsTags: {
            isTitleAll: false,
            tags: [
              {
                trend: "#Taubat",
                urlChild: "https://twitter.com/search?q=%23Taubat",
                titleExists: false,
              },
              {
                trend: "#TaubatNasuha",
                urlChild: "https://twitter.com/search?q=%23TaubatNasuha",
                titleExists: false,
              },
              {
                trend: "#TaubatSebelumTerlambat",
                urlChild:
                  "https://twitter.com/search?q=%23TaubatSebelumTerlambat",
                titleExists: false,
              },
            ],
          },
          urlRoot: "https://twitter.com/search?q=%23Taubat",
          completed: false,
        },
        {
          id: 9,
          name: "Dosa",
          tweetsTags: "#Dosa",
          urlRoot: "https://twitter.com/search?q=%23Dosa",
          completed: false,
        },
        {
          id: 10,
          name: "Musik",
          tweetsTags: {
            isTitleAll: false,
            tags: [
              {
                trend: "#Musik",
                urlChild: "https://twitter.com/search?q=%23Musik",
                titleExists: false,
              },
              {
                trend: "#MusikHaram",
                urlChild: "https://twitter.com/search?q=%23MusikHaram",
                titleExists: false,
              },
            ],
          },
          urlRoot: "https://twitter.com/search?q=%23MusikHaram",
          completed: false,
        },
        {
          id: 11,
          name: "Aib",
          tweetsTags: {
            isTitleAll: false,
            tags: [
              {
                trend: "#Aib",
                urlChild: "https://twitter.com/search?q=%23Aib",
                titleExists: false,
              },
              {
                trend: "#AibKu",
                urlChild: "https://twitter.com/search?q=%23AibKu",
                titleExists: false,
              },
              {
                trend: "#AibOrangLain",
                urlChild: "https://twitter.com/search?q=%23AibOrangLain",
                titleExists: false,
              },
            ],
          },
          urlRoot: "https://twitter.com/search?q=%23Aib",
          completed: false,
        },
        {
          id: 11,
          name: "Utang",
          tweetsTags: "#Utang",
          urlRoot: "https://twitter.com/search?q=%23Utang",
          completed: false,
        },
        {
          id: 12,
          name: "RIBA",
          tweetsTags: "#RIBA",
          urlRoot: "https://twitter.com/search?q=%23RIBA",
          completed: false,
        },
        {
          id: 13,
          name: "Azab",
          tweetsTags: "#Azab",
          urlRoot: "https://twitter.com/search?q=%23Azab",
          completed: false,
        },
        {
          id: 14,
          name: "Zina",
          tweetsTags: "#Zina",
          urlRoot: "https://twitter.com/search?q=%23Zina",
          completed: false,
        },
        {
          id: 15,
          name: "Dzikir",
          tweetsTags: {
            isTitleAll: false,
            tags: [
              {
                trend: "#Dzikir",
                urlChild: "https://twitter.com/search?q=%23Dzikir",
                titleExists: false,
              },
              {
                trend: "#Zikir",
                urlChild: "https://twitter.com/search?q=%23Zikir",
                titleExists: false,
              },
              {
                trend: "#Istighfar",
                urlChild: "https://twitter.com/search?q=%23Istighfar",
                titleExists: false,
              },
            ],
          },
          urlRoot: "https://twitter.com/search?q=%23Zikir",
          completed: false,
        },
      ],
      // arrays: Ustadz
      arrsUstadz: [
        {
          id: 0,
          name: "Dr. Firanda Andirja, Lc., M.A.",
          tweetsTags: {
            isTitleAll: false,
            tags: [
              {
                trend: "#UstadzFirandaAndirja",
                urlChild:
                  "https://twitter.com/search?q=%23UstadzFirandaAndirja",
                titleExists: false,
              },
              {
                trend: "#FirandaAndirja",
                urlChild: "https://twitter.com/search?q=%23FirandaAndirja",
                titleExists: false,
              },
            ],
          },
          urlRoot: "https://id.wikipedia.org/wiki/Firanda_Andirja",
          completed: false,
        },
        {
          id: 1,
          name: "Dr. Khalid Basalamah, Lc., M.A.",
          tweetsTags: {
            isTitleAll: false,
            tags: [
              {
                trend: "#UstadzKhalidBasalamah",
                urlChild:
                  "https://twitter.com/search?q=%23UstadzKhalidBasalamah",
                titleExists: false,
              },
              {
                trend: "#KhalidBasalamah",
                urlChild: "https://twitter.com/search?q=%23KhalidBasalamah",
                titleExists: false,
              },
            ],
          },
          urlRoot: "https://id.wikipedia.org/wiki/Khalid_Basalamah",
          completed: false,
        },
        {
          id: 2,
          name: "Dr. Syafiq Riza Basalamah, Lc., M.A.",
          tweetsTags: {
            isTitleAll: false,
            tags: [
              {
                trend: "#UstadzSyafiqBasalamah",
                urlChild:
                  "https://twitter.com/search?q=%23UstadzSyafiqBasalamah",
                titleExists: false,
              },
              {
                trend: "#SyafiqRizaBasalamah",
                urlChild: "https://twitter.com/search?q=%23SyafiqRizaBasalamah",
                titleExists: false,
              },
            ],
          },
          urlRoot: "https://id.wikipedia.org/wiki/Syafiq_Riza_Basalamah",
          completed: false,
        },
        {
          id: 3,
          name: "Dr. (H.C.) Adi Hidayat, Lc., M.A.",
          tweetsTags: {
            isTitleAll: false,
            tags: [
              {
                trend: "#UstadzAdiHidayat",
                urlChild: "https://twitter.com/search?q=%23UstadzAdiHidayat",
                titleExists: false,
              },
              {
                trend: "#UAH",
                urlChild: "https://twitter.com/search?q=%23UAH",
                titleExists: false,
              },
            ],
          },
          urlRoot: "https://id.wikipedia.org/wiki/Adi_Hidayat",
          completed: false,
        },
        {
          id: 4,
          name: "Prof. Abdul Somad, Lc., D.E.S.A., Ph.D.",
          tweetsTags: {
            isTitleAll: false,
            tags: [
              {
                trend: "#UstadzAbdulSomad",
                urlChild: "https://twitter.com/search?q=%23UstadzAbdulSomad",
                titleExists: false,
              },
              {
                trend: "#UAS",
                urlChild: "https://twitter.com/search?q=%23UAS",
                titleExists: false,
              },
            ],
          },
          urlRoot: "https://id.wikipedia.org/wiki/Abdul_Somad",
          completed: false,
        },
        {
          id: 5,
          name: "(Abu Yahya) Badrusalam, Lc",
          tweetsTags: {
            isTitleAll: false,
            tags: [
              {
                trend: "#UstadzBadrusalam",
                urlChild: "https://twitter.com/search?q=%23UstadzBadrusalam",
                titleExists: false,
              },
            ],
          },
          urlRoot: "https://id.wikipedia.org/wiki/Badrusalam",
          completed: false,
        },
      ],

      // TODO: config.json
      // tweets: e.q
      //  [0] => "#CeramahPendek #Shorts #Video #YouTube"
      //  [1] => "#KajianIslam #Islam #Muslim #Hikmah #IslamItuIndah #IslamAgamaKu"
      //  ...
      arrStartCermTweets: [0, 1, 2],
      // tweets: e.q
      //  [0] => "#UstadzFirandaAndirja #FirandaAndirja"
      //  ...
      arrStartUstTweets: [],

      // string: judul
      judulText: "",
      // string: Youtube dan y2mate video
      youtubeVideo: "",
      y2mateVideo: "",

      // pilih button mengatur ulang dan semua tulisan: true atau false
      selectReset: false,
      selectSelectAll: false,

      // pilih button salinan dan tweet: true atau false
      selectResults: false,
      selectCopy: false,
      selectTweet: false,
      selectYoutube: false,
      selectY2mate: false,
      selectTweetCreate: false,

      // pilih `semua kotak centang`: true atau false
      selectCheckBoxAll: false,

      // `semua kotak centang` diaktifkan
      allCheckboxesEnabled: 0,

      copyVitestErrors: 1,
    };
  },
  mounted() {
    this.$refs.ceramahSingkatIslam.focus();
  },
  computed: {
    // adalah button mengatur ulang dan semua tulisan: true atau false
    isReset: function () {
      return !this.selectReset;
    },
    isSelectAll: function () {
      return !this.selectSelectAll;
    },
    // adalah hasil, button copy dan button Tweet: true atau false
    isResults: function () {
      return !this.selectResults;
    },
    isCopy: function () {
      return !this.selectCopy;
    },
    isYoutube: function () {
      return !this.selectYoutube;
    },
    isTweet: function () {
      return !this.selectTweet;
    },
    isY2mate: function () {
      return !this.selectY2mate;
    },
    isTweetCreate: function () {
      return !this.selectTweetCreate;
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

    // textarea: hasil, tanpa ceramahSingkatIslam
    results() {
      if (this.ceramahSingkatIslam === "" && this.results !== "") {
        this.results = "";
      }
    },
  },
  methods: {
    // dibuat: dari textarea ceramahSingkatIslam ini
    async carry() {
      let judulText = "";
      let results = "";

      // "https://www.youtube.com/shorts/peUj47yc1xo" => "https://youtu.be/-mD93UwO_40" ?
      if (this.ceramahSingkatIslam === "") {
        this.isNotResults();
        return;
      }

      if (this.ceramahSingkatIslam !== this.ceramahSingkatIslamCopy) {
        this.isArraysCermUstFalse();
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
          (res.status == 200 &&
            (ceramahSingkatSlice == "/shorts/" ||
              ceramahSingkatSlice == "/shorts" ||
              ceramahSingkatSlice == "/watch?v=")) ||
          res.status == 404 ||
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

        if (judulText !== "") {
          // tag tweets: ceramahsi dan ustadz
          let tweetsTags = this.startTweetTagsFunc(judulText);

          this.judulText = judulText;
          this.youtubeVideo = this.isYoutubeComToYoutube(ceramahSingkatSlice);
          this.y2mateVideo = this.y2mateComFunc(ceramahSingkatSlice);

          // textarea youtube.com ke youtu.be
          if (tweetsTags !== "")
            results = `${judulText} ${tweetsTags}\n\n${this.youtubeVideo}`;
          else results = `${judulText}\n\n${this.youtubeVideo}`;
          this.isResultsSuccess(results.length);
        }

        if (str != "" && results == "") {
          results = "";
          this.isResultsDefault();
        }
        this.results = results;

        // Copy!
        setTimeout(
          () =>
            // Why? hmmm
            this.btnCopy(),
          this.copyVitestErrors
        );
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
      if (judulText === "") {
        alert(
          "(method) startTweetTagsFunc(judulText = /" /
            "). judulText: Ceramah SI or Ustadz Tweets"
        );
        this.isResultsError();
        return;
      }

      // tag ceramahSI
      let arrStartTweetsTags = [];
      for (let i = 0; i < this.arrsCeramahSI.length; i++) {
        const currCeramahSI = this.arrsCeramahSI.at(i);
        // [i] => i |
        // .at(i) => i | undefined
        this.arrStartCermTweets.forEach((startCerm) => {
          if (i === startCerm) {
            if (this.typeString(currCeramahSI.tweetsTags)) {
              const cermTagRegex = new RegExp(
                // case-insenitive match "i": (a,A) => a
                // e.q: tweetTag.toLowerCase()
                currCeramahSI.tweetsTags,
                "i"
              );

              const isTweet = cermTagRegex.test(judulText.toLowerCase());
              if (!isTweet) arrStartTweetsTags.push(currCeramahSI.tweetsTags);
            } else {
              // if (this.typeObject(currCeramahSI.tweetsTags)) {...}
              currCeramahSI.tweetsTags.isTitleAll = true;

              const currCermTag = currCeramahSI.tweetsTags.tags;
              // typeof currCermTag === 'object' && currCermTag !== null
              for (let j = 0; j < currCermTag.length; j++) {
                const currTweetTag = currCermTag.at(j);

                const cermTrendRegex = new RegExp(
                  // case-insenitive match "i": (a,A) => a
                  // e.q: tweetTag.toLowerCase()
                  currTweetTag.trend,
                  "i"
                );

                const isTweet = cermTrendRegex.test(judulText.toLowerCase());
                if (isTweet) currTweetTag.titleExists = true;
                else arrStartTweetsTags.push(currTweetTag.trend);
              }
            }

            // [i].completed => true
            // arrays: arrsCeramahSI: Singkat => true
            currCeramahSI.completed = true;
            this.allCheckboxesEnabled++;
          }
        });
      }

      // tag Ustadz
      for (let j = 0; j < this.arrsUstadz.length; j++) {
        const currUstadz = this.arrsUstadz.at(j);
        // [i] => i |
        // .at(i) => i | undefined
        this.arrStartUstTweets.forEach((startUst) => {
          if (j === startUst) {
            if (typeof currUstadz.tweetsTags === "string") {
              const ustTagRegex = new RegExp(
                // case-insenitive match "i": (a,A) => a
                // e.q: tweetTag.toLowerCase()
                currUstadz.tweetsTags,
                "i"
              );

              // true: !true (false)
              //  eq. "#TestOne #1" => "#TestOne" (!true -> false)
              // false: !false (true)
              //  eq. "#TestFour #4 #Test4 #Four" => "#TestOne" (!false -> true)
              const isTweet = ustTagRegex.test(judulText.toLowerCase());
              if (!isTweet) arrStartTweetsTags.push(currUstadz.tweetsTags);
            } else {
              currUstadz.tweetsTags.isTitleAll = true;
              // Array.isArray(ceramahSI.tweetsTags)
              for (let m = 0; m < currUstadz.tweetsTags.length; m++) {
                const currTweetTag = currUstadz.tweetsTags.at(m);

                const ustTrendRegex = new RegExp(
                  // case-insenitive match "i": (a,A) => a
                  // e.q: tweetTag.toLowerCase()
                  currTweetTag.trend,
                  "i"
                );

                const isTweet = ustTrendRegex.test(judulText.toLowerCase());
                if (isTweet) currTweetTag.titleExists = true;
                else arrStartTweetsTags.push(currTweetTag.trend);
              }

              currUstadz.completed = true;
              this.allCheckboxesEnabled++;
            }
          }
        });
      }

      return arrStartTweetsTags.join(" ");
    },

    // button: reset, semua tulisan, copy dan tweet
    btnReset() {
      this.ceramahSingkatIslam = "";
      // autofocus
      this.$refs.ceramahSingkatIslam.focus();
      this.isArraysCermUstFalse();
      this.isNotResults();
    },

    btnSelectAll() {
      this.$refs.ceramahSingkatIslam.select();
      // Untuk perangkat seluler
      this.$refs.ceramahSingkatIslam.setSelectionRange(0, 99999);

      navigator.clipboard.writeText(this.ceramahSingkatIslam);
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

    btnYoutube() {
      window.open("https://" + this.youtubeVideo, "_blank");
    },

    btnY2mate() {
      window.open(this.y2mateVideo, "_blank");
    },

    btnTweetCreate() {
      window.open("https://twitter.com/compose/tweet", "_blank");
    },

    btnTweet() {
      if (this.results.length > 280) {
        this.selectTweet = false;
        return;
      }
      const UTF8Hash = this.results
        .replaceAll(":", "%3A")
        .replaceAll("/", "%2F")
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
        this.isArraysCermUstFalse();

        this.results = `${this.judulText}\n\n${this.youtubeVideo}`;
        this.isResultsSuccess(this.results.length);
        this.allCheckboxesEnabled = 0;
        this.selectCheckBoxAll = true;
      }
    },

    // html: Tag Singkat Islam dan Tag Ustadz
    // berubah dalam array untuk ceramah Singkat Islam dan Ustadz
    tweetsTagsChanged(event, index, isArray = "") {
      const targetChecked = event.target.checked;
      let _checked = false;

      // arrays: tweet tag => Ceramah Singkat Islam dan Ustadz
      let arrsNewTweetsTags = [];

      const currCermTagStrFunc = (_tweetsTags) => {
        const cermTagRegex = new RegExp(
          // case-insenitive match "i": (a,A) => a
          // e.q: tweetTag.toLowerCase()
          _tweetsTags,
          "i"
        );

        const isTweet = cermTagRegex.test(this.judulText.toLowerCase());
        if (!isTweet) return _tweetsTags;

        return "";
      };

      const currCermTagObjFunc = (_currCermTag) => {
        let _arrsNewTweetsTags = [];

        // typeof currCermTag === 'object' && currCermTag !== null
        for (let j = 0; j < _currCermTag.length; j++) {
          const currTweetTag = _currCermTag.at(j);

          const cermTrendRegex = new RegExp(
            // case-insenitive match "i": (a,A) => a
            // e.q: tweetTag.toLowerCase()
            currTweetTag.trend,
            "i"
          );

          const isTweet = cermTrendRegex.test(this.judulText.toLowerCase());

          if (!isTweet) _arrsNewTweetsTags.push(currTweetTag.trend);
        }

        return _arrsNewTweetsTags;
      };

      /**
       * 1. arrsCeramahSI
       * */
      for (let i = 0; i < this.arrsCeramahSI.length; i++) {
        const currCeramahSI = this.arrsCeramahSI.at(i);
        // ?
        if (currCeramahSI.completed) console.log(i, currCeramahSI.completed);

        if (currCeramahSI.completed === true) {
          console.log("check", currCeramahSI.completed, currCeramahSI.name);

          if (this.typeString(currCeramahSI.tweetsTags)) {
            let newTweetsTags = currCermTagStrFunc(currCeramahSI.tweetsTags);

            if (newTweetsTags !== "") {
              arrsNewTweetsTags.push(newTweetsTags);
              _checked = true;
            }
          } else if (this.typeObject(currCeramahSI.tweetsTags)) {
            const currCermTag = currCeramahSI.tweetsTags.tags;

            currCeramahSI.tweetsTags.isTitleAll = true;
            const _arrsNewTweetsTags = currCermTagObjFunc(currCermTag);
            console.log("currCermTagFunc: true", _arrsNewTweetsTags);

            arrsNewTweetsTags.push(..._arrsNewTweetsTags);
            _checked = true;

            //currCeramahSI.completed = true;
          }
        } else if (currCeramahSI.completed === false) {
          if (this.typeString(currCeramahSI.tweetsTags)) {
            console.log("uncheck", false, currCeramahSI.name);
            const cermTagRegex = new RegExp(
              // case-insenitive match "i": (a,A) => a
              // e.q: tweetTag.toLowerCase()
              currCeramahSI.tweetsTags,
              "i"
            );

            const isTweet = cermTagRegex.test(this.judulText.toLowerCase());
            if (isTweet) currCeramahSI.completed = true;
            else {
              // this.allCheckboxesEnabled--;
            }
          }
        }
      }

      /**
       * 2. arrsUstadz
       * */
      for (let j = 0; j < this.arrsUstadz.length; j++) {
        const currUstadz = this.arrsUstadz.at(j);
        // true: !false (true)
        if (currUstadz.completed !== false) {
          if (typeof currUstadz.tweetsTags === "string") {
            const ustTagRegex = new RegExp(
              // case-insenitive match "i": (a,A) => a
              // e.q: tweetTag.toLowerCase()
              currUstadz.tweetsTags,
              "i"
            );

            // true: !true (false)
            //  eq. "#TestOne #1" => "#TestOne" (!true -> false)
            // false: !false (true)
            //  eq. "#TestFour #4 #Test4 #Four" => "#TestOne" (!false -> true)
            const isTweet = ustTagRegex.test(this.judulText.toLowerCase());
            if (!isTweet) arrsNewTweetsTags.push(currUstadz.tweetsTags);
          }
          // true: !false (true)
          else {
            const currUstTag = currUstadz.tweetsTags.tags;
            currUstTag.forEach((tweetTag, index) => {
              // case-insenitive match "i": (a,A) => a
              const ustTagRegex = new RegExp(tweetTag, "i");

              const isTweet = ustTagRegex.test(this.judulText.toLowerCase());
              // true: !true (false)
              //  eq. "#TestOne #1" => "#TestOne" (!true -> false)
              // false: !false (true)
              //  eq. "#TestFour #4 #Test4 #Four" => "#TestOne" (!false -> true)
              if (!isTweet) arrsNewTweetsTags.push(tweetTag);
              else currUstadz.tweetsTags.isTitleAll = true;
            });
          }
        }
      }

      this.results = `${this.judulText} ${arrsNewTweetsTags.join(" ")}\n\n${
        this.youtubeVideo
      }`;

      console.log("diaktifkan:", this.allCheckboxesEnabled);
      console.log("sukses:", this.results);
      if (this.results.length > 280) {
        this.isResultsError();
        return;
      }
      this.isResultsSuccess(this.results.length);

      if (_checked) this.allCheckboxesEnabled++;
      // } else {
      //   /**
      //    * checked
      //    */
      //   // e.q: Tag Tweets = "#TestOne" dan "#AuthorOne";
      //   let arrsNewTweetsTags = [];

      //   console.log("uncheck ceramahsi");
      //   if (isArray.toLowerCase() === "ceramahsi") {
      //     // // ???
      //     for (let i = 0; i < this.arrsCeramahSI.length; i++) {
      //       const currCeramahSI = this.arrsCeramahSI.at(i);
      //       if (currCeramahSI.completed === true) {
      //         if (this.typeString(currCeramahSI.tweetsTags)) {
      //           const cermTagRegex = new RegExp(
      //             // case-insenitive match "i": (a,A) => a
      //             // e.q: tweetTag.toLowerCase()
      //             currCeramahSI.tweetsTags,
      //             "i"
      //           );

      //           const isTweet = cermTagRegex.test(this.judulText.toLowerCase());
      //           if (!isTweet) arrsNewTweetsTags.push(currCeramahSI.tweetsTags);
      //         } else {
      //           const currCermTag = currCeramahSI.tweetsTags.tags;
      //           currCeramahSI.tweetsTags.isTitleAll = true;

      //           // typeof currCermTag === 'object' && currCermTag !== null
      //           for (let j = 0; j < currCermTag.length; j++) {
      //             const currTweetTag = currCermTag.at(j);

      //             const cermTrendRegex = new RegExp(
      //               // case-insenitive match "i": (a,A) => a
      //               // e.q: tweetTag.toLowerCase()
      //               currTweetTag.trend,
      //               "i"
      //             );

      //             const isTweet = cermTrendRegex.test(
      //               this.judulText.toLowerCase()
      //             );
      //             if (!isTweet) arrsNewTweetsTags.push(currTweetTag.trend);
      //             //else currCeramahSI.tweetsTags.isTitleAll = true;
      //           }
      //         }
      //       }
      //     }
      //     this.results = `${this.judulText} ${arrsNewTweetsTags.join(" ")}\n\n${
      //       this.youtubeVideo
      //     }`;
      //     if (this.results.length > 280) {
      //       this.isResultsError();
      //       return;
      //     }
      //     this.isResultsSuccess(this.results.length);
      //     this.allCheckboxesEnabled--;
      //   }
      //}

      console.log("------");
    },

    // type of at 'object' or 'string'
    typeObject(value) {
      return typeof value === "object" && value !== null;
    },

    typeString(value) {
      return typeof value === "string";
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
          .replace(/[?|&]t=\d{1,}s/, "")
          .replace(/([?|&]list=WL&index=\d{1,})|([?|&]ab_channel=\w+)/, "")
      );
    },

    y2mateComFunc(link) {
      // memotong pada youtube atau youtu ke '': misalnya,
      //  '/shorts/peUj47yc1xo' ke '/peUj47yc1xo'
      let ceramahSingkatSlice = link
        .replace("/shorts", "")
        .replace("/watch?v=", "")
        .replace("/shorts/", "")
        .replace("/", "")
        .replace("?feature=share", "")
        // e.q. https://www.youtube.com/watch?v=012345...&t=1s
        .replace(/[?|&]t=\d{1,}s/, "")
        .replace(/[?|&]list=WL&index=\d{1,}/, "")
        .replace(/[?|&]ab_channel=\w+/, "");

      return "https://www.y2mate.com/youtube/" + ceramahSingkatSlice;
    },

    isArraysCermUstFalse() {
      this.arrsCeramahSI.forEach((ceramahSI) => {
        ceramahSI.completed = false;
      });
      this.arrsUstadz.forEach((ustadz) => {
        ustadz.completed = false;
      });
    },

    isNotResults() {
      this.results = "";
      this.selectReset = false;
      this.selectSelectAll = false;
      this.selectYoutube = false;
      this.selectY2mate = false;
      this.selectTweetCreate = false;
      this.isResultsDefault();
    },

    isResultsError() {
      this.results = "Tidak ada hasil";
      this.selectReset = true;
      this.selectSelectAll = false;
      this.selectYoutube = false;
      this.selectY2mate = false;
      this.selectTweetCreate = false;
      this.isResultsDefault();
    },

    isResultsDefault() {
      this.resultsBool = false;
      this.counts = 280;
      this.selectCopy = false;
      this.selectTweet = false;
      this.isArraysCermUstFalse();
      this.allCheckboxesEnabled = 0;
    },

    isResultsSuccess(videoLength) {
      this.resultsBool = true;
      this.selectReset = true;
      this.selectSelectAll = true;
      this.selectResults = true;
      this.selectCopy = true;
      this.selectYoutube = true;
      this.selectTweet = true;
      this.selectY2mate = true;
      this.selectTweetCreate = true;
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
    https://www.youtube.com/shorts/sqY-2c96UrI
    <button
      style="margin-top: 4px"
      @click="btnReset"
      :disabled="isReset"
      data-test="btn-reset"
    >
      Reset
    </button>
    <button
      style="margin-left: 2px; margin-top: 4px"
      @click="btnSelectAll"
      :disabled="isSelectAll"
    >
      Copy
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
    <button @click="btnYoutube" :disabled="isYoutube">YouTube Video</button>
    <button @click="btnY2mate" :disabled="isY2mate">Y2mate Video</button>
    <button @click="btnTweetCreate" :disabled="isTweetCreate">
      Tweet Create
    </button>
    <button @click="btnTweet" :disabled="isTweet" data-test="btn-tweet">
      Tweet is: <small v-if="ceramahSingkatIslam.length < 280">+</small>
      {{ counts }}
    </button>
    <br />

    <!-- <template v-if="resultsBool"> -->
    <template v-if="true">
      <h4>
        Kotak Centang:
        <button @click="btnCheckBoxAll()" data-test="btn-checkbox-all">
          {{ !isCheckBoxAll ? "diaktifkan" : "tidak diaktifkan" }}
        </button>
      </h4>

      <p
        style="margin-top: -20px; margin-bottom: 10px"
        data-test="all-checkboxes-enabled"
      >
        diaktifkan: {{ allCheckboxesEnabled }}
      </p>

      <div>
        <h4 style="margin-top: 0px; margin-bottom: 5px">
          📌 Tag Singkat Islam:
        </h4>
        <div
          v-for="(ceramahSI, index) in arrsCeramahSI"
          :key="ceramahSI.id"
          data-test="array-ceramahSI"
          :class="[ceramahSI.completed ? 'completed' : '']"
          @change="tweetsTagsChanged($event, index, 'ceramahSI')"
        >
          <input
            type="checkbox"
            v-model="ceramahSI.completed"
            data-test="ceramahSI-checkbox"
          />
          <a
            v-if="ceramahSI.urlRoot !== '#'"
            :href="ceramahSI.urlRoot"
            target="_blank"
            >{{ ceramahSI.name }}</a
          >
          <a v-else :href="ceramahSI.urlRoot">{{ ceramahSI.name }}</a>
          <div style="margin-left: 20px">
            <template v-if="typeof ceramahSI.tweetsTags === 'string'">
              <small> {{ ceramahSI.tweetsTags }} </small>
            </template>
            <template v-else>
              <small
                v-for="tweet in ceramahSI.tweetsTags.tags"
                :key="tweet.trend"
              >
                <a :href="tweet.urlChild" target="_blank">
                  <template
                    v-if="!ceramahSI.tweetsTags.isTitleAll && tweet.titleExists"
                    >➠</template
                  >
                  {{ tweet.trend }}
                </a>
                {{ " " }}
              </small>
            </template>
          </div>
        </div>

        <h4 style="margin-top: 10px; margin-bottom: 5px">📌 Tag Ustadz:</h4>
        <div
          v-for="(ustadz, index) in arrsUstadz"
          :key="ustadz.id"
          data-test="array-ustadz"
          :class="[ustadz.completed ? 'completed' : '']"
          @change="tweetsTagsChanged($event, index, 'ustadz')"
        >
          <input
            type="checkbox"
            v-model="ustadz.completed"
            data-test="ustadz-checkbox"
          />

          <a :href="ustadz.urlRoot" target="_blank">{{ ustadz.name }}</a>
          <div style="margin-left: 20px">
            <template
              v-if="
                typeof ustadz.tweetsTags === 'object' &&
                ustadz.tweetsTags !== null
              "
            >
              <small v-for="tweet in ustadz.tweetsTags.tags" :key="tweet.trend">
                <a :href="tweet.urlChild" target="_blank">{{ tweet.trend }}</a>
                {{ " " }}
              </small>
            </template>

            <template v-else>
              <small> {{ ustadz.tweetsTags }} </small>
            </template>
          </div>
        </div>
      </div>
    </template>
  </main>
</template>
