import React from 'react';
import { App } from './app';
import { render, screen } from '@testing-library/react'

test("Приложение запускается", ()=>{
  render(<App />);
  expect(screen.getByText(/мбоу алгосош/i)).toBeInTheDocument();
});