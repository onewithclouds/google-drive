import React from 'react'
import Signup from './authentication/Signup'
import { Container } from 'react-bootstrap'
import { AuthProvider } from '../contexts/AuthContext'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Dashboard from './Dashboard'
import Login from './authentication/Login'
import PrivateRoute from './authentication/PrivateRoute'
import ForgotPassword from "./authentication/ForgotPassword"
import UpdateProfile from './authentication/UpdateProfile'
import ProfileUpdateSuccess from './authentication/ProfileUpdateSuccess'




function App () {
    return (
        
                    <Router>
                        <AuthProvider>
                            <Switch>
                                <PrivateRoute exact path="/" component={ Dashboard } />
                                <PrivateRoute path="/update-profile" component={ UpdateProfile } />
                                <Route path="/update-profile-success" component={ ProfileUpdateSuccess } />
                                <Route path="/signup" component={ Signup } />
                                <Route path="/login" component={ Login } />
                                <Route path="/forgot-password" component={ ForgotPassword } />
                            </Switch>
                        </AuthProvider>
                    </Router>

    )
}

export default App;