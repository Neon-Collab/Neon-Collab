/**
 * @jest-environment jsdom
 */
/* eslint-env jest */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import Leaderboard from './Leaderboard';

jest.mock('axios');

describe('Leaderboard', () => {
  it('fetches and displays leaderboard data', async () => {

    axios.get.mockResolvedValueOnce({
      data: [
        { user_id: 27, score: 41, rank: 1 },
      ],
    });

    render(<Leaderboard />);

    expect(screen.getByText('Leaderboard')).toBeTruthy();

    await waitFor(() => screen.getByText('27'));
    expect(screen.getByText('1')).toBeTruthy();
    expect(screen.getByText('27')).toBeTruthy();
    expect(screen.getByText('41')).toBeTruthy();
    expect(axios.get).toHaveBeenCalledWith('/api/rank/');
  });
});
