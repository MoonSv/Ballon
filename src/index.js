import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'

import Welcome from './container/welcome'
import Home from './container/home/home'
import Login from './container/login/login'
import Register from './container/register/register'
import UserModule from './container/user_module'
import Profile from './container/profile'
import EditUnit from './container/edit_unit'
import SearchResult from './container/searchResult'
import UnitInfo from './container/unitInfo'
import ViewOrder from './container/viewOrder'
import Payment from './container/payment'

import reducers from './reducer'
import AuthRoute from './component/authRoute'
import './config'

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
                <div>
                    <AuthRoute></AuthRoute>
                    <Welcome>
                        <Route exact path='/home' component={Home}></Route>
                        {/*<Route path='/test' component={Test}></Route>*/}
                        <Route path='/login' component={Login}></Route>
                        {/*<Route path='/userModule' component={UserModule}>*/}
                            <Route path='/editUser' component={Profile}></Route>
                            <Route path='/editUnit' component={EditUnit}></Route>
                        {/*</Route>*/}

                        {/*<Route path='/userInfo' component={UserInfo}></Route>*/}
                        <Route path='/register' component={Register}></Route>
                        <Route path='/searchResult' component={SearchResult}></Route>
                        <Route path='/unitInfo/:unitId' component={UnitInfo}></Route>
                        <Route path='/viewOrder' component={ViewOrder}></Route>
                        <Route path='/payment/:orderId' component={Payment}></Route>


                    </Welcome>
                </div>

        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

