import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/index';
import { ConnectedDashboard } from './Dashboard';
import { ConnectedLogin } from './Login';
import { Router, Route, BrowserRouter } from 'react-router-dom';
import { history } from '../store/history';
import { ConnectedNavigation } from './Navigation';
import { ConnectedTaskDetail } from './TaskDetail';
import { Redirect } from 'react-router';

const RouteGuard = Component => ({match}) => {
    console.log("Route guard", match);
    if(!store.getState().session.authenticated) {
        //reroute
        return <Redirect to="/" />;
    }
    else {
        return <Component match={match} />
    }
}

export const Main = () => {
    return (
        <Router history={history}>
            <Provider store={store}>
                <div>
                    <ConnectedNavigation />
                    <Route exact path="/" component={ConnectedLogin}/>
                    {/* <ConnectedDashboard /> */}
                    {/* <Route 
                        exact path="/dashboard" 
                        render={() => (<ConnectedDashboard />)} 
                    /> */}
                    <Route 
                        exact path="/dashboard" 
                        render={RouteGuard(ConnectedDashboard)} 
                    />
                    {/* <Route 
                        exact path="/task/:id" 
                        render={({match}) => (<ConnectedTaskDetail match={match} />)} 
                    /> */}
                    <Route 
                        exact path="/task/:id" 
                        render={RouteGuard(ConnectedTaskDetail)} 
                    />
                </div>
            </Provider>
        </Router>
    );
}