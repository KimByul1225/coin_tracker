import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Coin from './routes/Coin';
import CoinsList from './routes/CoinsList';


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
                    <CoinsList />
                </Route>
                
            </Switch>
        </BrowserRouter>
    );
}

export default Router;