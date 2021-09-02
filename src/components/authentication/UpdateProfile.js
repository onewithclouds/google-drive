import React, { useRef, useState, useEffect } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import CenteredContainer  from './CenteredContainer'



export default function UpdateProfile() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const history = useHistory()

    const { currentUser, updateEmail, updatePassword, setProfileUpdate, profileUpdate } = useAuth()
    
    const [error, setError] = useState('')

//loading state controls the 'Sign Up' button and prevent adding mulitiple users to the database 
//with muiltiple clicks on the button   
    const [loading, setLoading] = useState(false)

//not the greatest name for a function that pushes new current address to history object 
//(redirects to page after action). the listener that it adds to the page is being unmounted by useEffect() 
//to prevent memory leak
    function unlisten (address) {
        history.push(address)
}

    useEffect( () => {
        return unlisten
    }, [])
    

    function handleSubmit(e) {

        e.preventDefault()

// below checks if passwords match

        if (passwordRef.current.value !==
            passwordConfirmRef.current.value) {
                return setError('Passwords do not match')
            }

// a container for array of promises, e.g. for updating password and email 

        const promises = []

        setLoading(true)
        setError("")

        // if ( emailRef.current.value !== currentUser.email ) {
        //     promises.push(updateEmail( emailRef.current.value ))
        // }
        // else if (emailRef.current.value === currentUser.email) {
        //     promises.push(updateEmail( emailRef.current.value ))
        // }

        if ( emailRef.current.value ) {
            promises.push(updateEmail( emailRef.current.value ))
            setProfileUpdate(true)
            console.log(profileUpdate)           
        }

        console.log(promises)

        if ( passwordRef.current.value ) {
            promises.push(updatePassword( passwordRef.current.value ))
        }
        console.log(promises)

// if ALL promises resolve in the array 'promises' declared, above => then udpate profile

        Promise.all(promises).then( ()=> {
            setLoading(false)
            unlisten("/update-profile-success")
        }).catch( (error) => {
            console.log(error)
            console.log(`profile update state is ${profileUpdate}`)

            // setError(error)
        }).finally( ()=> {
            console.log('1')
            
        })
    }


    return (
     <>
     <CenteredContainer>
       <Card>
           <Card.Body>
               <h2 className="text-center mb-4">Update Profile</h2>
               {error && <Alert variant="danger">{`Failed: ${error}`}</Alert>}
               <Form onSubmit={handleSubmit}>
                   <Form.Group id="email">
                       <Form.Label>Email</Form.Label>
                       <Form.Control type="email" ref={emailRef} required 
                       defaultValue={ currentUser.email } />
                   </Form.Group>

                   <Form.Group id="password">
                       <Form.Label>Password</Form.Label>
                       <Form.Control type="password" ref={passwordRef}  
                       placeholder="Leave blank to keep the same"/>
                   </Form.Group>

                   <Form.Group id="password-confirm">
                       <Form.Label>Password Confirmation</Form.Label>
                       <Form.Control type="password-confirm" ref={passwordConfirmRef}  
                       placeholder="Leave blank to keep the same" />
                   </Form.Group>
                   <Button disabled={loading} className="w-100" type="submit">
                       Update
                   </Button>
               </Form>
           </Card.Body>        
       </Card>
    </CenteredContainer>   
        
        <div className="w-100 text-center mt-2"> 
          <Link to='/user'>Cancel</Link>            
        </div>
     </>
    )
}

