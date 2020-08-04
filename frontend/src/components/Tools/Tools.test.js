import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Tools from './Tools';

describe('<Tools />', () => {
  test('it should mount', () => {
    render(<Tools />);
    
    const tools = screen.getByTestId('Tools');

    expect(tools).toBeInTheDocument();
  });
});