import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UserList from './UserList';

describe('<UserList />', () => {
  test('it should mount', () => {
    render(<UserList />);
    
    const userList = screen.getByTestId('UserList');

    expect(userList).toBeInTheDocument();
  });
});