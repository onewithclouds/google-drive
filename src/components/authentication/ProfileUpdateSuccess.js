import React, { useRef, useState, useEffect } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import CenteredContainer  from './CenteredContainer'


export default function ProfileUpdateSuccess() {
    
    const { profileUpdate, setProfileUpdate } = useAuth()

    const history = useHistory()

    function unlisten (address) {
        history.push(address)
}

    useEffect( () => {

        setProfileUpdate(false)
        console.log(profileUpdate)

        return (
            unlisten
        )
    }, [])
    

    function handleSubmit(e) {

        e.preventDefault()

        unlisten('/login')

        

    }


    return (
     <>
    <CenteredContainer>
       <Card>
           <Card.Body>
               <h2 className="text-center mb-4">Profile Update Success</h2>
               <Form onSubmit={handleSubmit}>

                   <Button className="w-100" type="submit">
                       Go back to Login
                   </Button>
               </Form>
           </Card.Body>
        </Card>   
    </CenteredContainer>
         
        
        <div className="w-100 text-center mt-2"> 
          You have been automatically logged out.            
        </div>
     </>
    )
}
