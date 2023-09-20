/**
 * @jest-environment jsdom
 */
/* eslint-env jest */
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import Ranking from './RankingbyProblem';

jest.mock('axios');

describe('Ranking Component', () => {
  it('fetches and displays users ranked by score', async () => {
    const users = [
      {
        id: 1,
        name: 'User1',
        problems: [{ id: 1, score: 2 }],
      },
      {
        id: 2,
        name: 'User2',
        problems: [{ id: 1, score: 4 }],
      },
      {
        id: 3,
        name: 'User3',
        problems: [{ id: 1, score: 1 }],
      },
    ];

    axios.get.mockResolvedValue({ data: users });

    const { getByText } = render(<Ranking problemId={1} />);

    await waitFor(() => getByText('User2 - 4'));
    expect(getByText('User2 - 4')).toBeTruthy();
  });
});
