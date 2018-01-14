import React from 'react';
import Loadable from 'react-loadable';
import LoadingIndicator from '../../shared/LoadingIndicator/index';

export default Loadable({
  loader: () => {
    // TODO: check permissions
    return import('./index');
  },
  loading: LoadingIndicator,
  render(loaded, props) {
    let Component = loaded.default;
    return <Component {...props}/>;
  },
});
