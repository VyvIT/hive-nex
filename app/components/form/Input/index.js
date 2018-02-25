import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

const ValidationError = ({ meta: { error } }) => {
  return (
    error &&
    <span style={{ color: 'red' }}>
      <FormattedMessage {...error}/>
    </span> || null
  );
};

const ValidationWarning = ({ meta: { warning } }) => {
  return (
    warning &&
    <span style={{ color: 'orange' }}>
      <FormattedMessage {...warning}/>
    </span> || null
  );
};

class Input extends Component {
  render() {
    const {
      input,
      label,
      type,
      meta: { touched },
      intl: { formatMessage },
    } = this.props;
    return (
      <div>
        <label><FormattedMessage {...label}/></label>
        <div>
          <input
            {...input}
            type={type}
            placeholder={formatMessage(label)}
          />
          {touched && (<ValidationError {...this.props}/> || <ValidationWarning {...this.props}/>)}
        </div>
      </div>
    );
  }
}

export default Input;
