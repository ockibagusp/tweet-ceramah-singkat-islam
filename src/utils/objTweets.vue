<script>
import { reactive } from "vue";

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
export const objStartTweets = reactive({
  ceramahSI: [0, 1, 2],
  ustadz: [],
});

/**
 * object completed Ceramah Singat Islam dan Ustadz
 * tweets: e.q
 *  {
 *    0 => "#CeramahPendek #Shorts #Video #YouTube"
 *    ...
 *  }
 */
export const objComplTweets = reactive({
  ceramahSI: {},
  ustadz: {},
});
</script>
