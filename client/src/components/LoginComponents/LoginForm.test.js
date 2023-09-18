/**
 * @jest-environment jsdom
 */
/* eslint-env jest */
import React from 'react';
import { render, waitFor, fireEvent, screen } from '@testing-library/react';
//import axios from 'axios';
import LoginPage from '../../pages/LoginPage.jsx';
import SignupForm from './SignupForm.jsx';
import LoginForm from './LoginForm.jsx';

describe('Login Page', () => {
  test('Render Login and SignUp forms conditionally', async () => {
    await waitFor(() => render(<LoginPage />));

    await waitFor(() => expect(screen.queryByText('New to NeonCollab? Create an Account')).toBeTruthy());
    await waitFor(() => expect(screen.queryByText('Already a member? Log In')).toBeNull());
    await waitFor(() => expect(screen.queryByText('Create Account')).toBeNull());
    await waitFor(() => fireEvent.click(screen.queryByText('New to NeonCollab? Create an Account')));
    await waitFor(() => expect(screen.queryByText('Create Account')).toBeTruthy());
    await waitFor(() => expect(screen.queryByText('Already a member? Log In')).toBeTruthy());
    await waitFor(() => expect(screen.queryByText('New to NeonCollab? Create an Account')).toBeNull());
    await waitFor(() => fireEvent.click(screen.queryByText('Already a member? Log In')));
    await waitFor(() => expect(screen.queryByText('New to NeonCollab? Create an Account')).toBeTruthy());
    await waitFor(() => expect(screen.queryByText('Already a member? Log In')).toBeNull());
  });
});
