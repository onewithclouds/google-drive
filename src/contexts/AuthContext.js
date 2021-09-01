import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'


const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [ currentUser, setCurrentUser] = useState()

//loading state is monitored and defined explicitely because of firebase. 
//firebase manages tokens in the local storage, so it needs to connect to google and 
//setup asynchronously before any components render on the page. 
//as these components depend on the state of the 'current user'
    const [ loading, setLoading ] = useState(true)

    const [ profileUpdate, setProfileUpdate ] = useState(false)


    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }


    useEffect(() => {
        //firebase method onAuthStateChanged adds a listener to the page that listens for 'signup' events, which needs to be cleaned up after the component is unmounted
        const unsubscribe = auth.onAuthStateChanged( user => {
            setCurrentUser(user)
            //loading state is monitored and defined explicitely because of firebase. firebase manages tokens in the local storage, so it needs to connect to google and setup asynchronously before any components render on the page. as these components depend on the state of the 'current user'
            setLoading(false)
        })
        // unsubscribe removes the listener added to the page by onAuthStateChanged when component unmounts as a cleanup within useEffect 'return' 
        return unsubscribe
    }, [])

    const value = {
    currentUser,

    profileUpdate,
    setProfileUpdate,

    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
}

    return (
        <AuthContext.Provider value={ value }>
            { !loading && children }
        </AuthContext.Provider>
    )
}


