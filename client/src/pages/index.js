import React, { Fragment } from 'react';
import { Router } from '@reach/router';
  
import Restaurants from './restaurants';
import { PageContainer } from '../components';

export default function Pages() {
  return (
    <Fragment>
      <PageContainer>
        <Router primary={false} component={Fragment}>
          <Restaurants path="/" />  
        </Router>
      </PageContainer> 
    </Fragment>
  );
}
