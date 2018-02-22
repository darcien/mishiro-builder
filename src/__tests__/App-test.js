//@flow
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import App from '../App';

it('Should render the app', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<App />);
  const result = renderer.getRenderOutput();
  expect(result.type).toBe('div');
});
