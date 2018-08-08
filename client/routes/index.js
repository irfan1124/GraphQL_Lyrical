import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SongList from '../components/SongList';

const Routes = () => {
    <BrowserRouter >
    <Switch>
        <Route path='/songs' exact component={SongList} />
    </Switch>
    </BrowserRouter>
}

export default Routes;