/**
 * @jest-environment jsdom
 */
/* eslint-env jest */
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import ProblemsListFri from './ProblemsListFri';

// Mock the Axios module
jest.mock('axios');

describe('Problem List on Friday with average scores', () => {
  const dummyProblems = [
    {
      problem_id: 1,
      problem_name: 'Problem 1',
      description: 'Description 1',
      scores: [85, 95, 75],
    },
    {
      problem_id: 2,
      problem_name: 'Problem 2',
      description: 'Description 2',
      scores: [70, 80, 90, 100],
    },
    {
      problem_id: 3,
      problem_name: 'Problem 3',
      description: 'Description 3',
      scores: [90, 100],
    },
    {
      problem_id: 4,
      problem_name: 'Problem 4',
      description: 'Description 4',
      scores: [70, 80, 90],
    },
  ];

  it('renders problems fetched from the API with correct average scores', async () => {
    axios.get.mockResolvedValue({ data: dummyProblems.map((problem) => ({
      ...problem,
      averageScore: problem.scores.reduce((a, b) => a + b, 0) / problem.scores.length,
    }))});

    const { getByText } = render(<ProblemsListFri />);

    await waitFor(() => expect(getByText('Problem 3')).toBeTruthy());

    for (const problem of dummyProblems) {
      expect(getByText(problem.problem_name)).toBeTruthy();
      expect(getByText(problem.description)).toBeTruthy();
      const averageScore = problem.scores.reduce((a, b) => a + b, 0) / problem.scores.length;
      expect(getByText(`Average Score: ${averageScore}`)).toBeTruthy();
    }
  });
});
