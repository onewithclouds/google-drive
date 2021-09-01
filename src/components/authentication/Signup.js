import React, { useRef, useState, useEffect } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import CenteredContainer from './CenteredContainer'


export default function Signup() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const history = useHistory()

    const { signup } = useAuth()
    
    const [error, setError] = useState('')

    //loading state controls the 'Sign Up' button and prevent adding mulitiple users to the database with muiltiple clicks on the button   
    const [loading, setLoading] = useState(false)

    function unlisten (address) {
        history.push(address)
}

    useEffect( () => {
        return unlisten
    }, [])
    

    async function handleSubmit(e) {

        e.preventDefault()

        if (passwordRef.current.value !==
            passwordConfirmRef.current.value) {
                return setError('Passwords do not match')
            }

        try {
            //clears up the current error message state to possibly catch a new error in a catch-block below
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            unlisten('/')
 //           history.push("/")
        } catch (error) {
            console.log(error)
            setError(error.message)
        }

        setLoading(false)
    }

    return (
     <>
     <CenteredContainer>
       <Card>
           <Card.Body>
               <h2 className="text-center mb-4">Sign Up</h2>
               {error && <Alert variant="danger">{`Failed: ${error}`}</Alert>}
               <Form onSubmit={handleSubmit}>
                   <Form.Group id="email">
                       <Form.Label>Email</Form.Label>
                       <Form.Control type="email" ref={emailRef} required />
                   </Form.Group>

                   <Form.Group id="password">
                       <Form.Label>Password</Form.Label>
                       <Form.Control type="password" ref={passwordRef} required />
                   </Form.Group>

                   <Form.Group id="password-confirm">
                       <Form.Label>Password Confirmation</Form.Label>
                       <Form.Control type="password-confirm" ref={passwordConfirmRef} required />
                   </Form.Group>
                   <Button disabled={loading} className="w-100" type="submit">
                       Sign Up
                   </Button>
               </Form>
           </Card.Body>       
       </Card>   
    </CenteredContainer>    
        <div className="w-100 text-center mt-2"> 
          Already have an account? <Link to='/login'>Log in</Link>            
        </div>
     </>
    )
}
