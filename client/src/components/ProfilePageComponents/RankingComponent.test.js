/**
 * @jest-environment jsdom
 */
/* eslint-env jest */
import React, { useState, useContext } from 'react';
import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import axios from 'axios';
import Ranking from './Ranking';
import AppContext from '../../contexts/AppContext';

jest.mock('axios');

describe('Ranking Component', () => {
  it('should display the current ranking of the logged in user', async () => {
    axios.get = jest.fn().mockResolvedValue({
      data: {
        rank: 4,
      },
    });
    render(
      // <AppContext.Provider>
        <Ranking />
     // </AppContext.Provider>,
    );
    // await waitFor(() => expect(screen.queryByText('Current Ranking')).toBeTruthy());
    await waitFor(() => expect(screen.queryByText('4th')).toBeTruthy());
  });
});
