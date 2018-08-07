import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SongList from '../components/SongList';

export default () => {
    <BrowserRouter >
    <Switch>
        <Route path='/songs' exact component={SongList} />
    </Switch>
    </BrowserRouter>
}