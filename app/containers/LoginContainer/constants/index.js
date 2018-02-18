import { asyncActionType } from '../../../utils/actions';

export const SESSION_STORAGE_CHECKED = 'SESSION_STORAGE_CHECKED';
export const SESSION_STORAGE_KEY = '_LoggedInUserName';
export const LOCKED_ACCOUNT_CODE = '0006';

const namespace = 'LoginContainer';

export const LOGIN = asyncActionType(namespace, 'login');
