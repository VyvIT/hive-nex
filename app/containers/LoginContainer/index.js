import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form/immutable'
import injectReducer from '../../utils/injectReducer';
import reducerConfig from './reducers';
import * as actions from './actions';

// import { withRouter } from 'react-router';
// import css from './LoginContainer.css';
// import * as actions from '../../actions/Auth';
// import { reduxForm } from 'redux-form';
// import { getFormState } from '../../utils/forms';
// import Login from './Login';

/*
export class LoginContainer extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    fields: PropTypes.object.isRequired,
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    session: PropTypes.any,
    checkSessionStorage: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if (!this.props.session.sessionStorageChecked) {
      this.props.checkSessionStorage();
    } else {
      if (this.props.session.isAuthenticated) {
        this.redirectToPage();
      }
    }
  }

  onSubmit = (formData) => {
    return this.props.login(formData).then((/!* payload *!/) => {
      this.redirectToPage();
    });
  };

  redirectToPage = () => {
    const { next, ...rest } = this.props.location.query;
    this.props.router.push({
      pathname: next,
      query: rest,
    });
  };

  render() {
    return (
      <Login
        {...this.props}
        onSubmit={this.onSubmit}
      />
    );
  }
}


function validate(values) {
  const errors = {};
  if (!values.username || values.username.trim() === '') {
    errors.username = 'The Username field is required.';
  }
  if (!values.password || values.password.trim() === '') {
    errors.password = 'The Password field is required.';
  }
  return errors;
}

const reduxFormConfig = {
  form: 'loginForm',
  fields: ['username', 'password'],
  getFormState,
  validate,
};

export default withRouter(reduxForm(
  reduxFormConfig,
  (store) => store.get('Auth').toJS(),
  actions
)(LoginContainer));
*/

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label}/>
      {touched &&
      ((error && <span>{error}</span>) ||
        (warning && <span>{warning}</span>))}
    </div>
  </div>
);

class LoginContainer extends Component {

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field
          name="username"
          type="text"
          component={renderField}
          label="Username"
        />
        <Field name="email" type="email" component={renderField} label="Email"/>
        <Field name="age" type="number" component={renderField} label="Age"/>
        <div>
          <button type="submit" disabled={submitting}>
            Submit
          </button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </button>
        </div>
      </form>
    )
  }
}

const validate = (values) => {
  console.log(values);
  /*const errors = {};
  if (!values.username || values.username.trim() === '') {
    errors.username = 'The Username field is required.';
  }
  if (!values.password || values.password.trim() === '') {
    errors.password = 'The Password field is required.';
  }
  return errors;*/
};


const withReducer = injectReducer(reducerConfig);
const withReduxForm = reduxForm({
  form: 'login', // a unique identifier for this form
  validate,
});

const mapStateToProps = (state) => {
  console.log(state);
  return {
    test: 'a',
  }
};
const withConnect = connect(null, { ...actions });

export default compose(
//  withReducer,
  // withRouter ??? not required,
  withConnect,
  withReduxForm
)(LoginContainer);
