/**
 * @jest-environment jsdom
 */
/* eslint-env jest */
import React, { useState, useContext } from 'react';
import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../../server/firebase.js';
import LoginPage from '../../pages/LoginPage.jsx';
import AppContext from '../../contexts/AppContext.jsx';

jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn(),
}));

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Login Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Render Login and SignUp forms conditionally', async () => {
    useAuthState.mockReturnValue([null, false, null]);

    const Wrapper = () => {
      const [newUser, setNewUser] = useState(false);
      const [account, setAccount] = useState({ loggedIn: false});
      return (
        <AppContext.Provider
          value={{account, setAccount}}
        >
          <LoginPage
            setNewUser={setNewUser}
            newUser={newUser}
          />
        </AppContext.Provider>
      );
    };

    const { queryByText } = await render(<Wrapper />);
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

  test('Passwords must match', async () => {
    useAuthState.mockReturnValue([null, false, null]);
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    const Wrapper = () => {
      const [newUser, setNewUser] = useState(false);
      const [account, setAccount] = useState({
        loggedIn: false,
        firstname: 'test',
        lastname: 'test',
        username: 'test',
        email: 'test@test.com',
        password: '12345678',
        verifyPassword: 'asdfghjk'
      });
      //const { account, setAccount } = useContext(AppContext);
      return (
        <AppContext.Provider
          value={{account, setAccount}}
        >
          <LoginPage
            setNewUser={setNewUser}
            newUser={newUser}
          />
        </AppContext.Provider>
      );
    };

    const { queryByText } = await render(<Wrapper />);
    await waitFor(() => fireEvent.click(screen.queryByText('New to NeonCollab? Create an Account')));
    await waitFor(() => fireEvent.click(screen.queryByText('Create Account')));
    await waitFor(() => expect(window.alert).toHaveBeenCalled());
  });

  test('Passwords must be at least 8 characters', async () => {
    useAuthState.mockReturnValue([null, false, null]);
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    const Wrapper = () => {
      const [newUser, setNewUser] = useState(false);
      const [account, setAccount] = useState({
        loggedIn: false,
        firstname: 'test',
        lastname: 'test',
        username: 'test',
        email: 'test@test.com',
        password: '1234567',
        verifyPassword: '1234567'
      });
      //const { account, setAccount } = useContext(AppContext);
      return (
        <AppContext.Provider
          value={{account, setAccount}}
        >
          <LoginPage
            setNewUser={setNewUser}
            newUser={newUser}
          />
        </AppContext.Provider>
      );
    };

    const { queryByText } = await render(<Wrapper />);
    await waitFor(() => fireEvent.click(screen.queryByText('New to NeonCollab? Create an Account')));
    await waitFor(() => fireEvent.click(screen.queryByText('Create Account')));
    await waitFor(() => expect(window.alert).toHaveBeenCalled());
  });
});
