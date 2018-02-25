import React, { Component } from 'react';
import { Field } from 'redux-form/immutable'
import { injectIntl } from 'react-intl';
import Input from '../Input'

class InputField extends Component {
  render() {
    return (
      <Field
        {...this.props}
        component={Input}
      />
    );
  }
}

export default injectIntl(InputField);
