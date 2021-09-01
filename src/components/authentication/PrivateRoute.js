import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function PrivateRoute( { component: Component, ...rest }) {

    const { currentUser, profileUpdate, setProfileUpdate } = useAuth()

    console.log(profileUpdate)
    console.log(Boolean(currentUser))

    return (
        <Route

            {...rest}


            render = { ( props ) => {
                return (currentUser && !profileUpdate) ? <Component {...props} /> : 
                profileUpdate ? <Redirect to="/update-profile-success" /> :
                <Redirect to="/login" />


            // render = { ( props ) => {
            //     return currentUser ? <Component {...props} /> : <Redirect to="/login" />
            }}
        >
        </Route>
    )
}
