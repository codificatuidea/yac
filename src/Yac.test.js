import React from 'react';
import ReactDOM from 'react-dom';
import Yac from './Yac';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Yac />, div);
  ReactDOM.unmountComponentAtNode(div);
});
