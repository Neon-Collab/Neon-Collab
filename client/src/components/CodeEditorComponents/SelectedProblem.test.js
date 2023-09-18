/**
 * @jest-environment jsdom
 */
/* eslint-env jest */
import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import SelectedProblem from './SelectedProblem.jsx';

jest.mock('axios');
axios.get.mockResolvedValue({
  data: {
    problem_name: 'hahaha',
    description: 'CoolCool',
    difficulty: 'Hell',
  },
});

describe('SelectedProblem Component', () => {
  test('Getting problem and renders the data', async () => {
    render(<SelectedProblem />);

    expect(screen.getByText('Loading...')).toBeDefined();

    await waitFor(() => expect(screen.getByText('hahaha')).toBeDefined());

    expect(screen.getByText('CoolCool')).toBeDefined();
    expect(screen.getByText('Hell')).toBeDefined();
  });
});