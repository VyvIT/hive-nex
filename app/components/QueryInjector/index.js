import React, { Component } from 'react'
import PropTypes from 'prop-types'

// TODO: not used, but will keep for a while
class QueryInjector extends Component {

  static propTypes = {
    parse: PropTypes.func.isRequired,
  };

  static contextTypes = {
    router: PropTypes.shape({
      route: PropTypes.shape({
        location: PropTypes.shape({
          search: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  };

  componentDidMount() {
    this.context.router.route.location.query = this.props.parse(this.context.router.route.location.search.slice(1));
  }

  componentWillReceiveProps(nextProps, nextContext) {
    // use nextProps in case the parse function changes for some reason
    this.context.router.route.location.query = nextProps.parse(nextContext.router.route.location.search.slice(1))
  }

  render() {
    return this.props.children
      ? this.props.children
      : null
  }
}

export default QueryInjector;
