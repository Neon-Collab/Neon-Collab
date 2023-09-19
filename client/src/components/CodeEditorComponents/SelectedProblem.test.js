/**
 * @jest-environment jsdom
 */
/* eslint-env jest */
import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import CodeEditorPage from '../../pages/CodeEditorPage.jsx';

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
    render(<CodeEditorPage />);

    expect(screen.getByText('Loading...')).toBeDefined();

    await waitFor(() => expect(screen.getByText('hahaha')).toBeDefined());

    expect(screen.getByText('CoolCool')).toBeDefined();
    expect(screen.getByText('Hell')).toBeDefined();
  });
});
