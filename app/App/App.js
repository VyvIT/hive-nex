import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import LoginContainer from '../containers/LoginContainer';
import HomePage from '../containers/HomePage/Loadable';
import LocaleToggle from '../containers/LocaleToggle';

/*
 import FeaturePage from 'containers/FeaturePage/Loadable';
 import NotFoundPage from 'containers/NotFoundPage/Loadable';
 import Header from 'components/Header';
 import Footer from 'components/Footer';
 */

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js"
        defaultTitle="React.js"
      >
        <meta name="description" content="A React.js application"/>
      </Helmet>
      <LocaleToggle />
      {/*<Header />*/}
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route path="/login" component={LoginContainer}/>
      {/* <Route path="/features" component={FeaturePage} />
       <Route path="" component={NotFoundPage} />*/}
       </Switch>
       {/*<Footer />*/}
    </AppWrapper>
  );
}
