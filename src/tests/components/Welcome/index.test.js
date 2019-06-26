import React from 'react';
import Welcome from '../../../components/pages/Welcome';

describe('App', () => {
  it('should render the App component correctly', () => {
      const shallowWrapper = shallow(<Welcome />);

      expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
