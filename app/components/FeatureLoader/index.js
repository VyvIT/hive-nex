import React from 'react';
import Loadable from 'react-loadable';
import LoadingIndicator from '../../shared/LoadingIndicator/index';

const NoAccess = () => <div>No!</div>;

export default ({ name }) => Loadable({
  loader: () => {
    // TODO: check permissions
    /*if (true) {
      return new Promise((resolve) => {
        resolve({ default: NoAccess });
      });
    }*/
    /* webpackMode: "lazy-once" */
    return import(`../../containers/lazy/${name}/index.js`).then(res => {
      console.log(res);
      return res;
    });
  },
  loading: LoadingIndicator,
  render(loaded, props) {
    let Component = loaded.default;
    return <Component {...props}/>;
  },
});
