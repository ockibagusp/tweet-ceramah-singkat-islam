<script setup></script>

<script>
const REDIRCETURL = "http://localhost:3000/video";
const STRTWEETS = {
  CERAMAHSI: "ceramahSI",
  USTADZ: "ustadz",
};

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
          titleExists: false,
          completed: false,
        },
        {
          id: 3,
          name: "Sholat",
          tweetsTags: "#Sholat",
          urlRoot: "https://twitter.com/search?q=%23Sholat",
          titleExists: false,
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
          titleExists: false,
          completed: false,
        },
        {
          id: 6,
          name: "Mualaf",
          tweetsTags: "#Mualaf",
          urlRoot: "https://twitter.com/search?q=%23Mualaf",
          titleExists: false,
          completed: false,
        },
        {
          id: 7,
          name: "Musibah",
          tweetsTags: "#Musibah",
          urlRoot: "https://twitter.com/search?q=%23Musibah",
          titleExists: false,
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
          titleExists: false,
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
          titleExists: false,
          completed: false,
        },
        {
          id: 12,
          name: "RIBA",
          tweetsTags: "#RIBA",
          urlRoot: "https://twitter.com/search?q=%23RIBA",
          titleExists: false,
          completed: false,
        },
        {
          id: 13,
          name: "Azab",
          tweetsTags: "#Azab",
          urlRoot: "https://twitter.com/search?q=%23Azab",
          titleExists: false,
          completed: false,
        },
        {
          id: 14,
          name: "Zina",
          tweetsTags: "#Zina",
          urlRoot: "https://twitter.com/search?q=%23Zina",
          titleExists: false,
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
      //  {
      //    "ceramahSI":
      //      [0] => "#CeramahPendek #Shorts #Video #YouTube"
      //      [1] => "#KajianIslam #Islam #Muslim #Hikmah #IslamItuIndah #IslamAgamaKu"
      //      ...,
      //    "ustadz"
      //      [0] => "#UstadzFirandaAndirja #FirandaAndirja"
      //      ...
      //  }
      objStartTweets: {
        ceramahSI: [0, 1, 2],
        ustadz: [],
      },

      /**
       * object completed Ceramah Singat Islam dan Ustadz
       * tweets: e.q
       *  {
       *    0 => "#CeramahPendek #Shorts #Video #YouTube"
       *    ...
       *  }
       */
      objComplTweets: {
        ceramahSI: {},
        ustadz: {},
      },

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
      let videoText = "";
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
        /(?:https:\/\/)?(?:www\.|m\.)?(?:youtube\.com|youtu\.be\/)(?:\/?watch\?v=)?(?:\/?shorts\/)?([\w-]{1,12})/gm;

      /**
       * TODO:
       *    let ceramahSingkatRegex = regex.exec(this.ceramahSingkatIslam)
       *      --> ceramahSingkatRegex.at(0) => 'https://www.youtube.com/shorts/0000',
       *      --> ceramahSingkatRegex.at(1) => '0000',
       */

      // Alternative syntax using RegExp constructor
      // const regex = new RegExp('(?:https:\/\/)?(?:www\.|m\.)?(?:youtube\.com|youtu\.be\/)(?:\/?watch\?v=)?(?:\/?shorts\/)?([\w-]{1,12})', 'gm')
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

          if (groupIndex === 1) {
            if (match !== undefined) {
              videoText = match;
              quit = true;
            }
          }
        });
      }

      if (!quit) return this.isResultsError();

      let ceramahSingkatSlice = videoText;

      // https://youtu.be/-s0o6o5_ApU -> Tidak ada hasil
      //  => Kenapa Nabi Melarang Duduk di Pinggir Jalan? - Ustadz Dr. Firanda Andirja, Lc, MA ...
      ceramahSingkatSlice = "/watch?v=" + ceramahSingkatSlice;

      let ceramahSingkatIslam = REDIRCETURL + ceramahSingkatSlice;

      // textarea hasil: loading...
      this.results = "Loading...";

      try {
        const res = await axios.get(ceramahSingkatIslam);
        if (
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
          this.judulText = judulText;

          // tag tweets: ceramahsi dan ustadz
          let tweetsTags = this.startTweetTagsFunc(judulText);
          this.youtubeVideo = this.isYoutubeComToYoutube(videoText);
          this.y2mateVideo = this.y2mateComFunc(videoText);

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
      this.objStartTweets.ceramahSI.forEach((startCerm) => {
        const currCerm = this.arrsCeramahSI.at(startCerm);

        if (this.typeString(currCerm.tweetsTags)) {
          const isTweet = this.tagRegexes(currCerm.tweetsTags);
          if (!isTweet)
            this.objComplTweets.ceramahSI[startCerm] = currCerm.tweetsTags;
          else if (isTweet) {
            this.objComplTweets.ceramahSI[startCerm] = "";
            currCerm.titleExists = true;
          }
        } else {
          // if (this.typeObject(currCeramahSI.tweetsTags)) {...}
          currCerm.tweetsTags.isTitleAll = true;
          const currCermTag = currCerm.tweetsTags.tags;

          let arrTweetTags = [];
          // typeof currCermTag === 'object' && currCermTag !== null
          for (let j = 0; j < currCermTag.length; j++) {
            const isTweet = this.tagRegexes(currCermTag.at(j).trend);
            if (isTweet) currCermTag.at(j).titleExists = true;
            else arrTweetTags.push(currCermTag.at(j).trend);
          }

          this.objComplTweets.ceramahSI[startCerm] = arrTweetTags.join(" ");
        }

        // [i].completed => true
        // arrays: arrsCeramahSI: Singkat => true
        currCerm.completed = true;
        this.allCheckboxesEnabled++;
      });

      // tag Ustadz
      this.objStartTweets.ustadz.forEach((startUst) => {
        const currUst = this.arrsUstadz.at(startUst);

        if (this.typeString(currUst.tweetsTags)) {
          const isTweet = this.tagRegexes(currUst.tweetsTags);
          if (!isTweet)
            this.objComplTweets.ustadz[startUst] = currUst.tweetsTags;
          else if (isTweet) {
            this.objComplTweets.ustadz[startCerm] = "";
            currCerm.titleExists = true;
          }
        } else {
          // if (this.typeObject(currUstadz.tweetsTags)) {...}
          currUst.tweetsTags.isTitleAll = true;
          const currUstTag = currUst.tweetsTags.tags;

          let arrTweetTags = [];
          // typeof currCermTag === 'object' && currCermTag !== null
          for (let j = 0; j < currUstTag.length; j++) {
            const isTweet = this.tagRegexes(currUstTag.at(j).trend);
            if (isTweet) currUstTag.at(j).titleExists = true;
            else arrTweetTags.push(currUstTag.at(j).trend);
          }

          this.objComplTweets.ustadz[startUst] = arrTweetTags.join(" ");
        }

        // [i].completed => true
        // arrays: arrsUstadz: Singkat => true
        currUst.completed = true;
        this.allCheckboxesEnabled++;
      });

      let arrTweetTags = [];
      for (const cerm in this.objComplTweets.ceramahSI) {
        const currCerm = this.objComplTweets.ceramahSI[cerm];
        if (currCerm !== "") arrTweetTags.push(currCerm);
      }

      for (const ust in this.objComplTweets.ustadz) {
        const currUst = this.objComplTweets.ustadz[ust];
        if (currUst !== "") arrTweetTags.push(currUst);
      }

      return arrTweetTags.join(" ");
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
    tweetsTagsChanged(event, index, strChangeTweets = "") {
      const targetChecked = event.target.checked;
      let [isTitleExists, isNotChecked] = [false, false];

      const currCermTagStrFunc = (
        _currTagsObj,
        _targetChecked,
        _index,
        _strChangeTweets
      ) => {
        let _objTweets = {};
        if (_strChangeTweets === STRTWEETS.CERAMAHSI)
          _objTweets = this.objComplTweets.ceramahSI;
        else if (_strChangeTweets === STRTWEETS.USTADZ)
          _objTweets = this.objComplTweets.ustadz;
        else {
          alert(
            "(const) currCermTagStrFunc(..., ..., strChangeTweets). strChangeTweets: 'ceramahSI' or 'ustadz'"
          );
        }

        let [_isTitleExists, _isNotChecked] = [false, false];
        const isTweet = this.tagRegexes(_currTagsObj.tweetsTags);
        if (isTweet) _currTagsObj.completed = true;
        else if (!isTweet && _targetChecked) {
          _objTweets[_index] = _currTagsObj.tweetsTags;
          _isTitleExists = true;
        } else if (!isTweet && _targetChecked === false) {
          delete _objTweets[_index];
          _isNotChecked = true;
        }

        return [_isTitleExists, _isNotChecked];
      };

      const currCermTagObjFunc = (
        _currTagsObj,
        _targetChecked,
        _index,
        _strChangeTweets
      ) => {
        let _objTweets = {};
        if (_strChangeTweets === STRTWEETS.CERAMAHSI)
          _objTweets = this.objComplTweets.ceramahSI;
        else if (_strChangeTweets === STRTWEETS.USTADZ)
          _objTweets = this.objComplTweets.ustadz;
        else
          alert(
            "(const) currCermTagObjFunc(..., ..., strChangeTweets). strChangeTweets: 'ceramahSI' or 'ustadz'"
          );

        _currTagsObj.tweetsTags.isTitleAll = true;

        const _currCermTag = _currTagsObj.tweetsTags.tags;
        let [_isTitleExists, _isNotChecked] = [false, false];
        let _arrTweetTags = [];
        let _tweetTags = "";

        // typeof currCermTag === 'object' && currCermTag !== null
        for (let j = 0; j < _currCermTag.length; j++) {
          const isTweet = this.tagRegexes(_currCermTag.at(j).trend);
          if (isTweet && !_targetChecked) {
            _currTagsObj.tweetsTags.isTitleAll = false;
            _tweetTags = _currCermTag.at(j).trend;

            _currTagsObj.completed = true;
          } else if (!isTweet && _targetChecked) {
            _arrTweetTags.push(_currCermTag.at(j).trend);
            _isTitleExists = true;
          } else if (!isTweet && !_targetChecked) {
            _isNotChecked = true;
          }
        }
        if (_tweetTags) _objTweets[_index] = "";
        else if (!_tweetTags) _objTweets[_index] = _arrTweetTags.join(" ");

        return [_isTitleExists, _isNotChecked];
      };

      if (strChangeTweets === STRTWEETS.CERAMAHSI) {
        /**
         * 1. arrsCeramahSI
         * */
        let currCermTagsObj = this.arrsCeramahSI.at(index);
        if (this.typeString(currCermTagsObj.tweetsTags)) {
          [isTitleExists, isNotChecked] = currCermTagStrFunc(
            currCermTagsObj,
            targetChecked,
            index,
            strChangeTweets
          );
        } else {
          // if (this.typeObject(currCeramahSI.tweetsTags)) {...}
          [isTitleExists, isNotChecked] = currCermTagObjFunc(
            currCermTagsObj,
            targetChecked,
            index,
            strChangeTweets
          );
        }
      } else if (strChangeTweets === STRTWEETS.USTADZ) {
        /**
         * 2. arrsUstadz
         * */
        let currUstTagsObj = this.arrsUstadz.at(index);
        if (this.typeString(currUstTagsObj.tweetsTags)) {
          [isTitleExists, isNotChecked] = currCermTagStrFunc(
            currUstTagsObj,
            targetChecked,
            index,
            strChangeTweets
          );
        } else {
          // if (this.typeObject(currustadz.tweetsTags)) {...}
          [isTitleExists, isNotChecked] = currCermTagObjFunc(
            currUstTagsObj,
            targetChecked,
            index,
            strChangeTweets
          );
        }
      }

      if (isTitleExists) this.allCheckboxesEnabled++;
      if (isNotChecked) this.allCheckboxesEnabled--;

      // arrays: tweet tag => Ceramah Singkat Islam dan Ustadz
      let arrTweetTags = [];
      for (const cerm in this.objComplTweets.ceramahSI) {
        const currCerm = this.objComplTweets.ceramahSI[cerm];
        if (currCerm !== "") arrTweetTags.push(currCerm);
      }

      for (const ust in this.objComplTweets.ustadz) {
        const currUerm = this.objComplTweets.ustadz[ust];
        if (currUerm !== "") arrTweetTags.push(currUerm);
      }

      this.results = `${this.judulText} ${arrTweetTags.join(" ")}\n\n${
        this.youtubeVideo
      }`;

      if (this.results.length > 280) {
        this.isResultsError();
        return;
      }
      this.isResultsSuccess(this.results.length);
    },

    // type of at 'object' or 'string'
    typeObject(value) {
      return typeof value === "object" && value !== null;
    },

    typeString(value) {
      return typeof value === "string";
    },

    // tag regexes: isTweet (true, false)
    tagRegexes(tweetsTags) {
      const tagRegex = new RegExp(
        // case-insenitive match "i": (a,A) => a
        // e.q: tweetTag.toLowerCase()
        tweetsTags,
        "i"
      );

      const isTweet = tagRegex.test(this.judulText.toLowerCase());
      return isTweet;
    },

    // adalah textarea youtube.com ke youtu.be
    isYoutubeComToYoutube(link) {
      return "youtu.be/" + link;
    },

    y2mateComFunc(link) {
      return "https://www.y2mate.com/youtube/" + link;
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
