const rankUsers = require('./ranking');

const scores = [
  {
    userid: 1,
    score: 2,
  },
  {
    userid: 2,
    score: 4,
  },
  {
    userid: 3,
    score: 1,
  },
];

const scores2 = [
  {
    userid: 1,
    score: 3,
  },
  {
    userid: 2,
    score: 5,
  },
  {
    userid: 3,
    score: 2,
  },
  {
    userid: 4,
    score: 1,
  },
  {
    userid: 5,
    score: 5,
  },
  {
    userid: 6,
    score: 5,
  },
  {
    userid: 7,
    score: 2,
  },
];

describe.only('rankUsers', () => {
  const expected = [
    {
        "userid": 2,
        "score": 4,
        "rank": 1
    },
    {
        "userid": 1,
        "score": 2,
        "rank": 2
    },
    {
        "userid": 3,
        "score": 1,
        "rank": 3
    }
]
  it('Should rank users by their score', () => {
    expect(rankUsers(scores)).toEqual(expect.arrayContaining(expected));
  })

  const expected2 = [
    {
        "userid": 2,
        "score": 5,
        "rank": 1
    },
    {
        "userid": 5,
        "score": 5,
        "rank": 1
    },
    {
        "userid": 6,
        "score": 5,
        "rank": 1
    },
    {
        "userid": 1,
        "score": 3,
        "rank": 4
    },
    {
        "userid": 3,
        "score": 2,
        "rank": 5
    },
    {
        "userid": 7,
        "score": 2,
        "rank": 5
    },
    {
        "userid": 4,
        "score": 1,
        "rank": 7
    }
]
  it('Should rank users by their score and assign ties appropriately', () => {
    expect(rankUsers(scores2)).toEqual(expect.arrayContaining(expected2));
  })
});

