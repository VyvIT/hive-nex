import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

export class Page2 extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
  }

  render() {
    const { loading, error, repos } = this.props;

    return (
      <div>Page2!!!
        <FormattedMessage {...messages.test} />
      </div>
    );
  }
}

export default Page2;
