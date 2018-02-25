import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable'
import injectReducer from '../../utils/injectReducer';
import reducerConfig from './reducers';
import * as actions from './actions';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import InputField from '../../components/form/InputField';

 //import { withRouter } from 'react-router';
import { withRouter } from 'react-router-dom'
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

class LoginContainer extends Component {

  onSubmit = (formData) => {
    return this.props.login(formData.toJS())
      .then((/* payload */) => {
        this.redirectToPage();
      }).catch(error => {
        console.log(error.statusText);
      });
  };

  redirectToPage = () => {
    console.log(this.props.location.query);
    const { next, ...rest } = this.props.location.query;
    this.props.history.push({
      pathname: next,
      query: rest,
    });
  };

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <InputField
          name="username"
          type="text"
          label={messages.userName}
        />
        <InputField
          name="password"
          type="password"
          label={messages.password}
        />
        <div>
          <button type="submit" disabled={submitting}>
            <FormattedMessage {...messages.login}/>
          </button>
        </div>
      </form>
    )
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.get('username') || values.get('username').trim() === '') {
    errors.username = messages.requiredUserName;
  }
  if (!values.get('password') || values.get('password').trim() === '') {
    errors.password = messages.requiredPassword;
  }
  return errors;
};

const withReducer = injectReducer(reducerConfig);
const withReduxForm = reduxForm({
  form: 'login', // a unique identifier for this form
  validate,
});

/*const mapStateToProps = (state) => {
 console.log(state);
 return {
 test: 'a',
 }
 };*/
const withConnect = connect(null, { ...actions });

export default compose(
  //  withReducer,
  withRouter,// ??? not required,
  withConnect,
  withReduxForm,
)(LoginContainer);
