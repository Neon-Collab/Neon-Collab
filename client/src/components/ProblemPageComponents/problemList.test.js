/**
 * @jest-environment jsdom
 */
/* eslint-env jest */

import React from 'react';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import ProblemsList from './ProblemsList';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('ProblemsList', () => {
  const mockData = [
    {
      problem_id: 1,
      problem_name: 'First Problem',
      description: 'This is the first problem description.',
    },
    {
      problem_id: 2,
      problem_name: 'Second Problem',
      description: 'This is the second problem description.',
    },
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockData });
  });

  test('Fetch and display problems', async () => {
    render(<ProblemsList />);

    const firstProblem = await screen.findByText('First Problem');
    const firstProblemDescription = await screen.findByText('This is the first problem description.');

    const secondProblem = await screen.findByText('Second Problem');
    const secondProblemDescription = await screen.findByText('This is the second problem description.');

    expect(firstProblem).toBeTruthy();
    expect(firstProblemDescription).toBeTruthy();
    expect(secondProblem).toBeTruthy();
    expect(secondProblemDescription).toBeTruthy();
  });
});
