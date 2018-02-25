import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Test extends React.Component {

  login = () => {
    fetch('/login', {
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify({
        'email': 'peter@klaven',
        'password': 'cityslicka',
      }),
    }).then(function (res) {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    }).then(function (data) {
      console.log(data);
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.login}>Test!</button>
        <Link to={{ pathname: '/page2', query: { a: 'a' } }}>Lin2</Link>
      </div>
    )
  }
}

export default Test;