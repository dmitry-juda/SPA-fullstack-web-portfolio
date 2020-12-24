import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import {LinksPage} from './pages/LinksPage'
import {CreatePost} from './pages/CreatePost'
import {DetailPage} from './pages/DetailPage'
import {AuthPage} from './pages/AuthPage'

import {TestPage} from './pages/forTestes'



export const useRoutes = isAuth => {

    isAuth = true

    if(isAuth) return(
        <Switch>
            <Route path="/links" exact>
                <LinksPage />
            </Route>
            <Route path="/create" exact>
                <CreatePost />
            </Route>
            <Route path="/detail/:id">
                <DetailPage />
            </Route>
            <Route path="/t">
                <TestPage />
            </Route>
            <Redirect to="/links" />
        </Switch>
    ) 
    else return(
        <Switch>
            <Route path="/control-panel" >
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}