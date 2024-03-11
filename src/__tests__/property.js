export default {
  // array: ceramah singkat Islam
  arrsCeramahSI: [
    {
      id: 0,
      name: 'Test Zero',
      tweetsTags: '#TestZero',
      urlRoot: '#',
      titleExists: false,
      completed: false
    },
    {
      id: 1,
      name: 'Test One',
      tweetsTags: '#TestOne',
      urlRoot: '#',
      titleExists: false,
      completed: false
    },
    {
      id: 2,
      name: 'Test Two',
      tweetsTags: '#TestTwo',
      urlRoot: '#',
      titleExists: false,
      completed: false
    },
    {
      id: 3,
      name: 'Test Three',
      tweetsTags: '#TestThree',
      urlRoot: '#',
      titleExists: false,
      completed: false
    },
    {
      id: 4,
      name: 'Test Four',
      tweetsTags: {
        isTitleAll: false,
        tags: [
          {
            trend: '#TestFour',
            urlChild: "#",
            titleExists: false,
          },
          {
            trend: '#Four',
            urlChild: "#",
            titleExists: false,

          },
          {
            trend: '#4',
            urlChild: "#",
            titleExists: false,
          },
        ]
      },
      completed: false
    },
    {
      id: 5,
      name: 'Test Five',
      tweetsTags: {
        isTitleAll: false,
        tags: [
          {
            trend: '#TestFive',
            urlChild: "#",
            titleExists: false,
          },
          {
            trend: '#5',
            urlChild: "#",
            titleExists: false,
          },
        ]
      },
      completed: false
    },
    {
      id: 6,
      name: 'Failure One',
      tweetsTags: '#FailureOne',
      urlRoot: '#',
      titleExists: false,
      completed: false
    },
    {
      id: 7,
      name: 'Failure Two',
      tweetsTags: {
        isTitleAll: false,
        tags: [
          {
            trend: '#FailureTwo',
            urlChild: "#",
            titleExists: false,
          },
          {
            trend: '#Failure2',
            urlChild: "#",
            titleExists: false,

          }
        ]
      },
      completed: false
    }
  ],
  // array: Ustadz
  arrsUstadz: [
    {
      id: 0,
      name: 'Author Zero',
      tweetsTags: '#AuthorZero',
      urlRoot: '#',
      titleExists: false,
      completed: false
    },
    {
      id: 1,
      name: 'Author One',
      tweetsTags: '#AuthorOne',
      urlRoot: '#',
      titleExists: false,
      completed: false
    },
    {
      id: 2,
      name: 'Author Two',
      tweetsTags: '#AuthorTwo',
      urlRoot: '#',
      titleExists: false,
      completed: false
    },
    {
      id: 3,
      name: 'AuthorThree',
      tweetsTags: '#AuthorThree',
      urlRoot: '#',
      titleExists: false,
      completed: false
    },
    {
      id: 4,
      name: 'Author Four',
      tweetsTags: {
        isTitleAll: false,
        tags: [
          {
            trend: "#AuthorFour",
            urlChild: "#",
            titleExists: false,
          },
          {
            trend: "#Author4",
            urlChild: "#",
            titleExists: false,
          }
        ]
      },
      urlRoot: '#',
      completed: false
    },
    {
      id: 5,
      name: 'Author Five',
      tweetsTags: {
        isTitleAll: false,
        tags: [
          {
            trend: "#AuthorFive",
            urlChild: "#",
            titleExists: false,
          },
          {
            trend: "#Author5",
            urlChild: "#",
            titleExists: false,
          }
        ]
      },
      urlRoot: '#',
      completed: false
    }
  ],
  objStartTweets: {
    ceramahSI: [0],
    ustadz: [5],
  },
  objComplTweets: {
    ceramahSI: {},
    ustadz: {},
  }
}
