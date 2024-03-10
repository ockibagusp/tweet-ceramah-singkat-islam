<script setup>
import { ref, computed, onMounted, watch, reactive } from "vue";
import axios from "axios";
import {
  arrsCeramahSI,
  arrsUstadz,
  objStartTweets,
  objComplTweets,
  REDIRCETURL,
  STRTWEETS,
} from "./utils";

/**
 * ceramah Singkat Islam
 */
// textarea: ceramahSingkatIslam
const ceramahSingkatIslam = ref("");

// pilih button mengatur ulang dan semua tulisan: true atau false
const selectSelectAll = ref(false);

// select: Copy, Tweet, Youtube, Y2mate and Tweet Create
const selectTweetObj = ref(false);
const isTweetObj = computed(() => !selectTweetObj.value);

// pilih `semua kotak centang`: true atau false
const selectCheckBoxAll = ref(false);

// `semua kotak centang` diaktifkan
const allCheckboxesEnabled = ref(0);

/**
 * functions that mutate state and trigger updates
 */
// dibuat: dari textarea ceramahSingkatIslam ini
async function carry() {
  // textarea hasil: loading...
  results.value = "Loading...";

  let ceramahsi = ceramahSingkatIslam.value;
  let _judulText = "";
  let _videoText = "";
  let _results = "";

  // "https://www.youtube.com/shorts/peUj47yc1xo" => "https://youtu.be/-mD93UwO_40" ?

  const regex =
    /(?:https:\/\/)?(?:www\.|m\.)?(?:youtube\.com|youtu\.be\/)(?:\/?watch\?v=)?(?:\/?shorts\/)?([\w-]{1,})/gm;

  /**
   * TODO:
   *    let ceramahSingkatRegex = regex.exec(ceramahSingkatIslam)
   *      --> ceramahSingkatRegex.at(0) => 'https://www.youtube.com/shorts/0000',
   *      --> ceramahSingkatRegex.at(1) => '0000',
   */

  // Alternative syntax using RegExp constructor
  // const regex = new RegExp('(?:https:\/\/)?(?:www\.|m\.)?(?:youtube\.com|youtu\.be\/)(?:\/?watch\?v=)?(?:\/?shorts\/)?([\w-]{1,12})', 'gm')
  let m;

  let quit = false;
  while ((m = regex.exec(ceramahsi)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
      if (groupIndex === 0) {
        if (match !== undefined) {
          _judulText = match;
        }
      }

      if (groupIndex === 1) {
        if (match !== undefined) {
          _videoText = match;
          quit = true;
        }
      }
    });
  }

  if (!quit) return isResultsError();

  let ceramahSingkatSlice = _videoText;

  // https://youtu.be/-s0o6o5_ApU -> Tidak ada hasil
  //  => Kenapa Nabi Melarang Duduk di Pinggir Jalan? - Ustadz Dr. Firanda Andirja, Lc, MA ...
  ceramahSingkatSlice = "/watch?v=" + ceramahSingkatSlice;

  try {
    const res = await axios.get(REDIRCETURL + ceramahSingkatSlice);
    if (
      res.status == 404 ||
      res.data.search(`This video isn't available anymore`) !== -1
    ) {
      isResultsError();
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
            _judulText = unescapeHtml;
            return;
          }
        }
      });
    }

    if (_judulText !== "") {
      judulText.value = _judulText;

      // tag tweets: ceramahsi dan ustadz
      let tweetsTags = startTweetTagsFunc(_judulText);
      youtubeVideo.value = isYoutubeComToYoutube(_videoText);
      y2mateVideo.value = y2mateComFunc(_videoText);

      // textarea youtube.com ke youtu.be
      if (tweetsTags !== "")
        _results = `${_judulText} ${tweetsTags}\n\n${youtubeVideo.value}`;
      else _results = `${_judulText}\n\n${youtubeVideo.value}`;
      isResultsSuccess(_results.length);
    }

    if (str != "" && _results == "") {
      results.value = "";
      isResultsDefault();
    }
    results.value = _results;
  } catch {
    isResultsError();
  }
}

/**
 * results
 */
const results = ref("");
const selectResults = ref(false);
const isResults = computed(() => !selectResults.value);
// tweet dihasil maks. 280 karakter
const counts = ref(280);

// string: judul, Youtube dan y2mate video
const tweetObj = reactive({
  judulText: "",
  youtubeVideo: "",
  y2mateVideo: "",
});

// pilih button mengatur ulang dan semua tulisan: true atau false
const selectReset = ref(false);
const isReset = ref(false);
const isResets = ref(false);

const isCopy = computed(() => !selectCopy);

// startTweetTagsFunc("...") => "..."
// startTweetTagsFunc() => alert
//
// e.q
// Start Ceramah SI and Ustadz Tweets:
// startTweetTagsFunc("Test One")
function startTweetTagsFunc(judulText = "") {
  // prevDone
  if (judulText == "") {
    alert(
      "(method) startTweetTagsFunc(judulText = /" /
        "). judulText: Ceramah SI or Ustadz Tweets"
    );
    isResultsError();
    return;
  }

  console.log(">>>", objStartTweets);
  // tag ceramahSI
  objStartTweets.ceramahSI.forEach((startCerm) => {
    const currCerm = arrsCeramahSI.value.at(startCerm);
    if (typeString(currCerm.tweetsTags)) {
      const isTweet = tagRegexes(currCerm.tweetsTags);
      if (!isTweet) objComplTweets.ceramahSI[startCerm] = currCerm.tweetsTags;
      else if (isTweet) {
        objComplTweets.ceramahSI[startCerm] = "";
        currCerm.titleExists = true;
      }
    } else {
      // if (typeObject(currCeramahSI.tweetsTags)) {...}
      currCerm.tweetsTags.isTitleAll = true;
      const currCermTag = currCerm.tweetsTags.tags;

      let arrTweetTags = [];
      // typeof currCermTag === 'object' && currCermTag !== null
      for (let j = 0; j < currCermTag.length; j++) {
        const isTweet = tagRegexes(currCermTag.at(j).trend);
        if (isTweet) currCermTag.at(j).titleExists = true;
        else arrTweetTags.push(currCermTag.at(j).trend);
      }

      objComplTweets.ceramahSI[startCerm] = arrTweetTags.join(" ");
    }

    // [i].completed => true
    // arrays: arrsCeramahSI: Singkat => true
    currCerm.completed = true;
    allCheckboxesEnabled.value++;
  });

  // tag Ustadz
  objStartTweets.ustadz.forEach((startUst) => {
    const currUst = arrsUstadz.value.at(startUst);

    if (typeString(currUst.tweetsTags)) {
      const isTweet = tagRegexes(currUst.tweetsTags);
      if (!isTweet) objComplTweets.ustadz[startUst] = currUst.tweetsTags;
      else if (isTweet) {
        objComplTweets.ustadz[startCerm] = "";
        currCerm.titleExists = true;
      }
    } else {
      // if (typeObject(currUstadz.tweetsTags)) {...}
      currUst.tweetsTags.isTitleAll = true;
      const currUstTag = currUst.tweetsTags.tags;

      let arrTweetTags = [];
      // typeof currCermTag === 'object' && currCermTag !== null
      for (let j = 0; j < currUstTag.length; j++) {
        const isTweet = tagRegexes(currUstTag.at(j).trend);
        if (isTweet) currUstTag.at(j).titleExists = true;
        else arrTweetTags.push(currUstTag.at(j).trend);
      }

      objComplTweets.ustadz[startUst] = arrTweetTags.join(" ");
    }

    // [i].completed => true
    // arrays: arrsUstadz: Singkat => true
    currUst.completed = true;
    allCheckboxesEnabled.value++;
  });

  let arrTweetTags = [];
  for (const cerm in objComplTweets.value.ceramahSI) {
    const currCerm = objComplTweets.value.ceramahSI[cerm];
    if (currCerm !== "") arrTweetTags.push(currCerm);
  }

  for (const ust in objComplTweets.value.ustadz) {
    const currUst = objComplTweets.value.ustadz[ust];
    if (currUst !== "") arrTweetTags.push(currUst);
  }

  return arrTweetTags.join(" ");
}

// button: reset, semua tulisan, copy dan tweet
function btnReset() {
  ceramahSingkatIslam.value = "";
  // autofocus
  if (ceramahSingkatIslam.value) {
    ceramahSingkatIslam.value.focus();
  }
  isArraysCermUstFalse();
  isNotResults();
}

function btnSelectAll() {
  const tmpCermSingkatIslamField = document.getElementById(
    "ceramah-singkat-islam"
  );
  tmpCermSingkatIslamField.select();
  // Untuk perangkat seluler
  tmpCermSingkatIslamField.setSelectionRange(0, 99999);

  navigator.clipboard.writeText(ceramahSingkatIslam.value);
}

function btnCopy() {
  if (results.value == "") {
    return;
  }

  const tmpResultsField = document.getElementById("results");
  tmpResultsField.select();
  // Untuk perangkat seluler
  tmpResultsField.setSelectionRange(0, 99999);

  navigator.clipboard.writeText(results.value);
}

function btnYoutube() {
  window.open("https://" + youtubeVideo, "_blank");
}

function btnY2mate() {
  window.open(y2mateVideo, "_blank");
}

function btnTweetCreate() {
  window.open("https://twitter.com/compose/tweet", "_blank");
}

function btnTweet() {
  if (results.value.length > 280) {
    selectTweet.value = false;
    return;
  }
  const UTF8Hash = results
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
}

function btnCheckBoxAll() {
  if (selectCheckBoxAll.value === true) {
    // TODO: config.json

    // => tag tweets: ceramahsi dan ustadz
    let tweetsTags = startTweetTagsFunc(judulText.value);

    // textarea youtube.com ke youtu.be
    results.value = `${judulText} ${tweetsTags}\n\n${youtubeVideo.value}`;
    isResultsSuccess(results.value.length);

    selectResults.value = true;
    selectCopy.value = true;
    selectTweet.value = true;

    selectCheckBoxAll.value = false;
  } else {
    isArraysCermUstFalse();

    results.value = `${judulText.value}\n\n${youtubeVideo.value}`;
    isResultsSuccess(results.value.length);
    allCheckboxesEnabled.value = 0;
    selectCheckBoxAll.value = true;
  }
}

// html: Tag Singkat Islam dan Tag Ustadz
// berubah dalam array untuk ceramah Singkat Islam dan Ustadz
function tweetsTagsChanged(event, index, strChangeTweets = "") {
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
      _objTweets = objComplTweets.ceramahSI;
    else if (_strChangeTweets === STRTWEETS.USTADZ)
      _objTweets = objComplTweets.ustadz;
    else {
      alert(
        "(const) currCermTagStrFunc(..., ..., strChangeTweets). strChangeTweets: 'ceramahSI' or 'ustadz'"
      );
    }

    let [_isTitleExists, _isNotChecked] = [false, false];
    const isTweet = tagRegexes(_currTagsObj.tweetsTags);
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
      _objTweets = objComplTweets.ceramahSI;
    else if (_strChangeTweets === STRTWEETS.USTADZ)
      _objTweets = objComplTweets.ustadz;
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
      const isTweet = tagRegexes(_currCermTag.at(j).trend);
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
    let currCermTagsObj = arrsCeramahSI.at(index);
    if (typeString(currCermTagsObj.tweetsTags)) {
      [isTitleExists, isNotChecked] = currCermTagStrFunc(
        currCermTagsObj,
        targetChecked,
        index,
        strChangeTweets
      );
    } else {
      // if (typeObject(currCeramahSI.tweetsTags)) {...}
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
    let currUstTagsObj = arrsUstadz.at(index);
    if (typeString(currUstTagsObj.tweetsTags)) {
      [isTitleExists, isNotChecked] = currCermTagStrFunc(
        currUstTagsObj,
        targetChecked,
        index,
        strChangeTweets
      );
    } else {
      // if (typeObject(currustadz.tweetsTags)) {...}
      [isTitleExists, isNotChecked] = currCermTagObjFunc(
        currUstTagsObj,
        targetChecked,
        index,
        strChangeTweets
      );
    }
  }

  if (isTitleExists) allCheckboxesEnabled.value++;
  if (isNotChecked) allCheckboxesEnabled.value--;

  // arrays: tweet tag => Ceramah Singkat Islam dan Ustadz
  let arrTweetTags = [];
  for (const cerm in objComplTweets.value.ceramahSI) {
    const currCerm = objComplTweets.value.ceramahSI[cerm];
    if (currCerm !== "") arrTweetTags.push(currCerm);
  }

  for (const ust in objComplTweets.value.ustadz) {
    const currUerm = objComplTweets.value.ustadz[ust];
    if (currUerm !== "") arrTweetTags.push(currUerm);
  }

  results.value = `${judulText.value} ${arrTweetTags.join(" ")}\n\n${
    youtubeVideo.value
  }`;

  if (results.value.length > 280) {
    isResultsError();
    return;
  }
  isResultsSuccess(results.length);
}

// type of at 'object' or 'string'
function typeObject(value) {
  return typeof value === "object" && value !== null;
}

function typeString(value) {
  return typeof value === "string";
}

// tag regexes: isTweet (true, false)
function tagRegexes(tweetsTags) {
  const tagRegex = new RegExp(
    // case-insenitive match "i": (a,A) => a
    // e.q: tweetTag.toLowerCase()
    tweetsTags,
    "i"
  );

  const isTweet = tagRegex.test(judulText.value.toLowerCase());
  return isTweet;
}

// adalah textarea youtube.com ke youtu.be
function isYoutubeComToYoutube(link) {
  return "youtu.be/" + link;
}

function y2mateComFunc(link) {
  return "https://www.y2mate.com/youtube/" + link;
}

function isArraysCermUstFalse() {
  arrsCeramahSI.value.forEach((ceramahSI) => {
    ceramahSI.completed = false;
  });
  arrsUstadz.value.forEach((ustadz) => {
    ustadz.completed = false;
  });
}

function isNotResults() {
  results.value = "";
  selectReset.value = false;
  selectSelectAll.value = false;
  selectTweetObj.value = false;
  isResultsDefault();
}

function isResultsError() {
  results.value = "Tidak ada hasil";
  selectReset.value = true;
  selectSelectAll.value = false;
  selectTweetObj.value = false;
  isResultsDefault();
}

function isResultsDefault() {
  counts.value = 280;
  selectTweetObj.value = false;
  isArraysCermUstFalse();
  allCheckboxesEnabled.value = 0;
}

function isResultsSuccess(videoLength) {
  selectReset.value = true;
  selectSelectAll.value = true;
  selectResults.value = true;
  selectTweetObj.value = true;
  counts.value = 280 - videoLength;
}

/**
 * mounted
 */
onMounted(() => {
  if (ceramahSingkatIslam.value) {
    ceramahSingkatIslam.value.focus();
  }
});

/**
 * computed
 */

const isSelectAll = computed(() => !selectSelectAll);
// adalah hasil, button copy dan button Tweet: true atau false
const isYoutube = computed(() => !selectYoutube);
const isTweet = computed(() => !selectTweet);
const isY2mate = computed(() => !selectY2mate);
const isTweetCreate = computed(() => !selectTweetCreate);
// adalah button `semua kotak centang`: true atau false
const isCheckBoxAll = computed(() => !selectCheckBoxAll);

// watch(ceramahSingkatIslam, () => {
//   // vue methods: memuat
//   carry(ceramahSingkatIslam.value);
// });

// // textarea: hasil, tanpa ceramahSingkatIslam
// watch(results, () => {
//   if (ceramahSingkatIslam.value == "" && results.value != "") {
//     results.value = "";
//   }
// });
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
      id="ceramah-singkat-islam"
      data-test="ceramah-singkat-islam"
      @change="carry"
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
      id="results"
      data-test="results"
      :disabled="isResults"
    ></textarea>
    <br />
    <button @click="btnCopy" :disabled="isTweetObj" data-test="btn-copy">
      Copy
    </button>
    <button
      @click="btnYoutube"
      :disabled="isTweetObj"
      data-test="btn-youtube-vid"
    >
      YouTube Video
    </button>
    <button
      @click="btnY2mate"
      :disabled="isTweetObj"
      data-test="btn-y2mate-vid"
    >
      Y2mate Video
    </button>
    <button
      @click="btnTweetCreate"
      :disabled="isTweetObj"
      data-test="btn-tweet-create"
    >
      Tweet Create
    </button>
    <button @click="btnTweet" :disabled="isTweetObj" data-test="btn-tweet">
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

      <div style="float: left; width: 40%">
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
      </div>

      <div style="float: left; width: 40%">
        <h4 style="margin-top: 0px; margin-bottom: 5px">📌 Tag Ustadz:</h4>
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
