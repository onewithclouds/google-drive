import React, { useRef, useState, useEffect } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'
import CenteredContainer from './CenteredContainer'

export default function ForgotPassword() {

    const emailRef = useRef()

    const { resetPassword } = useAuth()
    
    const [error, setError] = useState('')
    
    const [message, setMessage] = useState('')

    //loading state controls the 'Sign Up' button and prevent adding mulitiple users to the database with muiltiple clicks on the button   
    const [loading, setLoading] = useState(false)


    async function handleSubmit(e) {

        e.preventDefault()
        

        try {
            //clears up the current error message state to possibly catch a new error in a catch-block below
            setError('')
            setMessage('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for further instructions')
            
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
               <h2 className="text-center mb-4">Password Reset</h2>
               {error && <Alert variant="danger">{`Failed: ${error}`}</Alert>}
               {message && <Alert variant="success">{message}</Alert>}
               <Form onSubmit={handleSubmit}>

                   <Form.Group id="email">
                       <Form.Label>Email</Form.Label>
                       <Form.Control type="email" ref={emailRef} required />
                   </Form.Group>

                   <Button disabled={loading} className="w-100" type="submit">
                       Reset Password
                   </Button>
               </Form>
               <div className="w-100 text-center mt-3">
                    <Link to="/login">Login</Link>
               </div>
           </Card.Body>
       </Card>
        <div className="w-100 text-center mt-2"> 
          Would like to create an account? <Link to='/signup'>Sign Up</Link>            
        </div>
        </CenteredContainer>
     </>
    )
}
