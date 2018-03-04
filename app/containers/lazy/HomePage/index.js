import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Switch, Route } from 'react-router-dom';
import messages from './messages';
import FeatureLoader from '../../../components/FeatureLoader';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <FormattedMessage {...messages.homePage} />
        <FormattedMessage {...messages.test} />
        {/*<Route exact path="/page3" component={FeatureLoader({ name: 'Page3' })}/>*/}
        {/*<Route render={(props) => {
          return JSON.stringify(props)
        }}/>*/}
      </div>
    );
  }
}

export default HomePage;
