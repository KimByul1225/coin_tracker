import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Coin from './src/routes/Coin';
import Coins from './src/routes/Coins';


interface IRouterProps {
    
}

function Router({}: IRouterProps) {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/:coinId">
                    <Coin />
                </Route>
                <Route path="/">
                    <Coins />
                </Route>
                
            </Switch>
        </BrowserRouter>
    );
}

export default Router;