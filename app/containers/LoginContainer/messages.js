import {
  defineMessages,
} from 'react-intl';

export default defineMessages({
  loginFail: {
    id: 'LoginContainer.LoginFail',
    defaultMessage: 'Credentials not found using Username / Password.',
  },
  defaultError: {
    id: 'LoginContainer.defaultError',
    defaultMessage: 'Error: {message}',
  },
  accountLocked: {
    id: 'LoginContainer.AccountLocked',
    defaultMessage: 'Authentication Failed: User account is locked.',
  },
  requiredUserName: {
    id: 'LoginContainer.RequiredUserName',
    defaultMessage: 'The Username field is required.',
  },
  requiredPassword: {
    id: 'LoginContainer.RequiredPassword',
    defaultMessage: 'The Password field is required.',
  },
  userNameLabel: {
    id: 'LoginContainer.UsernameLabel',
    defaultMessage: 'Username',
  },
  passwordLabel: {
    id: 'LoginContainer.PasswordLabel',
    defaultMessage: 'Password',
  },
  loginLabel: {
    id: 'LoginContainer.LoginLabel',
    defaultMessage: 'Login',
  },
  forgotPassword: {
    id: 'LoginContainer.forgotPassword',
    defaultMessage: 'Forgot password?',
  },
  loginTitle: {
    id: 'LoginContainer.LoginTitle',
    defaultMessage: 'Please enter your credentials',
  },
  sessionStorageError: {
    id: 'LoginContainer.sessionStorageError',
    defaultMessage: 'Failed writing to sessionStorage. Make sure browser is not in Private Mode.',
  },
});
