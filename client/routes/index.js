import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainRoute from '../../shared/router';

const Routes = () => (
    <BrowserRouter >
        <MainRoute />
    </BrowserRouter>
)

export default Routes;