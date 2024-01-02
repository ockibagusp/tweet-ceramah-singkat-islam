<script>
import { ref } from "vue";

export const arrsCeramahSI = ref([
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
  {
    id: 6,
    name: "Sedekah",
    tweetsTags: "#Sedekah",
    urlRoot: "https://twitter.com/search?q=%23Sedekah",
    titleExists: false,
    completed: false,
  },
  {
    id: 7,
    name: "Mualaf",
    tweetsTags: "#Mualaf",
    urlRoot: "https://twitter.com/search?q=%23Mualaf",
    titleExists: false,
    completed: false,
  },
  {
    id: 8,
    name: "Musibah",
    tweetsTags: "#Musibah",
    urlRoot: "https://twitter.com/search?q=%23Musibah",
    titleExists: false,
    completed: false,
  },
  {
    id: 9,
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
          urlChild: "https://twitter.com/search?q=%23TaubatSebelumTerlambat",
          titleExists: false,
        },
      ],
    },
    urlRoot: "https://twitter.com/search?q=%23Taubat",
    completed: false,
  },
  {
    id: 10,
    name: "Dosa",
    tweetsTags: "#Dosa",
    urlRoot: "https://twitter.com/search?q=%23Dosa",
    titleExists: false,
    completed: false,
  },
  {
    id: 11,
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
    id: 12,
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
    id: 13,
    name: "Utang",
    tweetsTags: "#Utang",
    urlRoot: "https://twitter.com/search?q=%23Utang",
    titleExists: false,
    completed: false,
  },
  {
    id: 14,
    name: "RIBA",
    tweetsTags: "#RIBA",
    urlRoot: "https://twitter.com/search?q=%23RIBA",
    titleExists: false,
    completed: false,
  },
  {
    id: 15,
    name: "Azab",
    tweetsTags: "#Azab",
    urlRoot: "https://twitter.com/search?q=%23Azab",
    titleExists: false,
    completed: false,
  },
  {
    id: 16,
    name: "Hawa Nafsu",
    tweetsTags: {
      isTitleAll: false,
      tags: [
        {
          trend: "#HawaNafsu",
          urlChild: "https://twitter.com/search?q=%23HawaNafsu",
          titleExists: false,
        },
        {
          trend: "#UjianHawaNafsu",
          urlChild: "https://twitter.com/search?q=%23UjianHawaNafsu",
          titleExists: false,
        },
      ],
    },
    urlRoot: "https://twitter.com/search?q=%23HawaNafsu",
    titleExists: false,
    completed: false,
  },
  {
    id: 17,
    name: "Zina",
    tweetsTags: "#Zina",
    urlRoot: "https://twitter.com/search?q=%23Zina",
    titleExists: false,
    completed: false,
  },
]);
</script>
