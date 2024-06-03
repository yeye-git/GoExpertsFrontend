import 'jest-localstorage-mock';
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';

test('renders learn react link', async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const linkElement = await screen.findByText(/learn react/i);

  expect(linkElement).toBeInTheDocument();
});

