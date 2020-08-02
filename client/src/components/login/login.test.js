import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import login from './login';

describe('<login />', () => {
  test('it should mount', () => {
    render(<login />);
    
    const login = screen.getByTestId('login');

    expect(login).toBeInTheDocument();
  });
});