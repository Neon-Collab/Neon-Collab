const pool = require('./db.js');
const problems = require('../problems/problemsSeed.js');

const seedDatabase = async () => {
  for (let problem of problems) {
    const problemInsert = {
      text: 'INSERT INTO problems(problem_name, description, difficulty, problem_code, problem_number) VALUES($1, $2, $3, $4, $5) RETURNING problem_id',
      values: [problem.name, problem.description,
        problem.difficulty, problem.problem_code, problem.problem_number],
    };

    try {
      const res = await pool.query(problemInsert);
      const problemId = res.rows[0].problem_id;

      for (let testCase of problem.testCases) {
        const testInsert = {
          text: 'INSERT INTO tests(problem_id, test_case_input, test_case__output) VALUES($1, $2, $3)',
          values: [problemId, testCase.input, testCase.output],
        };

        await pool.query(testInsert);
        console.log(`Test case for ${problemId} inserted successfully.`);
      }
    } catch (err) {
      console.error('Error during database seeding:', err);
    }
  }

  pool.end();
};

seedDatabase();
