import { render, screen } from '@testing-library/react';
import App from './App';
import Stopwatch from './Stopwatch';

// smoke test
it("renders without crashing", function () {
  render(<App />);
});

// snapshot test
it("matches snapshot", function () {
  const { asFragment } = render(<Stopwatch />);
  expect(asFragment()).toMatchSnapshot();
});