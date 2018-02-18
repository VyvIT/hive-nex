import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import FeatureLoader from '../components/FeatureLoader';
import LocaleToggle from '../containers/LocaleToggle';
import Test from '../components/Test/Test';

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
      <LocaleToggle/>
      <Test/>
      {/*<Header />*/}
      <Switch>
        <Route exact path="/" component={FeatureLoader({ name: 'HomePage' })}/>
        <Route exact path="/page2" component={FeatureLoader({ name: 'Page2' })}/>
        <Route path="" component={FeatureLoader({ name: 'NotFoundPage' })}/>
      </Switch>
      {/*<Footer />*/}
    </AppWrapper>
  );
}
