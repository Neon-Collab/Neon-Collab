const axios = require('axios');
const codeEditorModel = require('../models/codeEditorModel.js');

const wrapCode = (code, functionName, args) => `${code} console.log(${functionName}(${args}));`;

module.exports = {
  submitCode: async (req, res) => {
    const { userId, problemId, code } = req.body;

    try {
      const submission = await codeEditorModel.addCode(userId, problemId, code);
      const functionSignture = await codeEditorModel.getProblemCode(problemId);
      const tests = await codeEditorModel.getTests(problemId);

      let testPassed = 0;
      // For every test cases(I/O)
      for (let test of tests) {
        const wrappedCode = wrapCode(code, functionSignture, test.test_case_input);
        // Encode user submitted code and test input to base64
        let bufferCodeObj = Buffer.from(wrappedCode, 'utf8');
        let base64Code = bufferCodeObj.toString('base64');
        let bufferInputObj = Buffer.from(test.test_case_input, 'utf8');
        let base64TestInput = bufferInputObj.toString('base64');

        const submissionOptions = {
          method: 'POST',
          url: 'https://judge0-ce.p.rapidapi.com/submissions',
          params: {
            base64_encoded: 'true',
            fields: '*',
          },
          headers: {
            // 'content-type': 'application/json',
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': process.env.RAPID_JUDGE_API_KEY,
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
          },
          data: {
            // JavcScript id
            language_id: 63,
            source_code: base64Code,
            stdin: base64TestInput,
          },
        };
        const submissionResponse = await axios.request(submissionOptions);
        // Getting token back from Judge0
        const { token } = submissionResponse.data;
        // Timeout for execution, might change
        await new Promise((resolve) => setTimeout(resolve, 10000));
        const resultOptions = {
          method: 'GET',
          url: `https://ce.judge0.com/submissions/${token}?base64_encoded=true&fields=*`,
          headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': process.env.RAPID_JUDGE_API_KEY,
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
          },
        };
        const resultResponse = await axios.request(resultOptions);
        const statusId = resultResponse.data.status.id;
        // Even if the Code cause error, still store it and give it 0
        // Check for Compilation Error and Runtime Error
        if ([6, 7, 8, 9, 10, 11, 12].includes(statusId)) {
          await codeEditorModel.updateScore(userId, problemId, 0);
          await codeEditorModel.updateCompletion(userId, problemId, true);
          return res.status(200).send({
            message: 'Code stored. But it is not gradable.',
            score: 0
          });
        }
        console.log('Stdout:', resultResponse.data.stdout);
        if (!resultResponse.data.stdout) {
          console.error('API response:', resultResponse.data);
          throw new Error('Failed to get stdout from Judge0.');
        }
        const output = Buffer.from(resultResponse.data.stdout, 'base64').toString('utf8').trim();
        const expected = test.test_case__output.trim();
        // Check single or double quotes and remove it
        const transformOutput = output.replace(/^["']|["']$/g, '');
        const transformExpected = expected.replace(/^["']|["']$/g, '');
        console.log('Match?:', transformOutput === transformExpected);

        if (transformOutput === transformExpected) {
          testPassed += 1;
        }
      }

      let score = testPassed / tests.length;
      await codeEditorModel.updateScore(userId, problemId, score);
      console.log('Score:', score);
      await codeEditorModel.updateCompletion(userId, problemId, true)
      res.status(201).send({ submission, score });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  },
};