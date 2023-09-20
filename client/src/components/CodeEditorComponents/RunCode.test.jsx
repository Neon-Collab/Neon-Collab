/**
 * @jest-environment jsdom
 */
/* eslint-env jest */
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import RunCode from './RunCode';

jest.mock('axios');

describe('RunCode component', () => {
  it('Run code when button is clicked', async () => {
    axios.post.mockResolvedValue({
      data: { consoleOutput: 'Cool!' },
    });

    const setConsoleOutput = jest.fn();

    window.confirm = jest.fn(() => true);

    const { getByText } = render(
      <RunCode userId="123" problemId="321" code="console.log('Hello, Eric!')" setConsoleOutput={setConsoleOutput} />
    );

    const runButton = getByText('Run Code');
    fireEvent.click(runButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/api/codeEditor/runCode', {
        userId: '123',
        problemId: '321',
        code: "console.log('Hello, Eric!')",
      });
      expect(setConsoleOutput).toHaveBeenCalledWith('Cool!');
    });
  });
});
