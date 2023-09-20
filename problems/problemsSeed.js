module.exports = [
  {
    name: 'First Characters of Words',
    description: 'In this exercise, a string is passed to a method and a new string has to be returned with the first character of each word in the string. Strings will only contain letters and spaces, with exactly 1 space between words, and no leading/trailing spaces.',
    difficulty: 'Easy',
    problem_function_name: 'firstCharactersOfWords',
    problem_number: 1,
    testCases: [
      { input: '"This Is A Test"', output: '"TIAT"' },
      { input: '"This Is A Joke"', output: '"TIAJ"' },
      { input: '"My Name Is Not Eric"', output: '"MNINE"' },
      { input: '"JavaScript Is Fun"', output: '"JIF"' },
      { input: '"Hacker Reactor Is Fun"', output: '"HRIF"' },
    ]
  },
  {
    name: 'Mean Between Means',
    description: 'Write a function that takes as parameters an array (arr) and 2 integers (x and y). The function should return the mean between the mean of the first x elements of the array and the mean of the last y elements of the array. The mean should be computed if both x and y have values higher than 1 but less or equal to the array\'s length. Otherwise the function should return -1.',
    difficulty: 'Medium',
    problem_function_name: 'meanBetweenMeans',
    problem_number: 2,
    testCases: [
      { input: '[1, 3, 2, 4], 2, 3', output: '2.5' },
      { input: '[1, 3, 2, 4], 1, 2', output: '-1' },
      { input: '[1, 3, 2, 4], 2, 8', output: '-1' },
      { input: '[5, 5, 5, 5], 2, 2', output: '5' },
      { input: '[10, 20, 30, 40, 50], 3, 2', output: '30' },
    ]
  },
  {
    name: 'Compound Tax Calculation',
    description: 'Write a function to calculate compound tax using the following table: For $10 and under, the tax rate should be 10%. For $20 and under, the tax rate on the first $10 is %10, and the tax on the rest is 7%. For $30 and under, the tax rate on the first $10 is still %10, the rate for the next $10 is still 7%, and everything else is 5%. Tack on an additional 3% for the portion of the total above $30. Return 0 for invalid input (anything that\'s not a positive real number).',
    difficulty: 'Medium',
    problem_function_name: 'compoundTax',
    problem_number: 3,
    testCases: [
      { input: '10', output: '1' },
      { input: '21', output: '1.75' },
      { input: '25', output: '2.05' },
      { input: '30', output: '2.5' },
      { input: '35', output: '3.05' },
    ]
  },
  {
    name: 'Progressive Concatenation',
    description: 'Given a string, you progressively need to concatenate the first letter from the left and the first letter to the right and "1", then the second letter from the left and the second letter to the right and "2", and so on. If the string\'s length is odd drop the central element.',
    difficulty: 'Easy',
    problem_function_name: 'progressiveConcatenation',
    problem_number: 4,
    testCases: [
      { input: '"abcdef"', output: '"af1be2cd3"' },
      { input: '"abc!def"', output: '"af1be2cd3"' },
      { input: '"hello"', output: '"ho1el2ll3"' },
      { input: '"worlds"', output: '"ws1od2rl3"' },
      { input: '"abcd"', output: '"ad1bc2"' },
    ]
  }
];
