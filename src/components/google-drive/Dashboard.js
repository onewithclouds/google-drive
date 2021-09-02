import React from 'react'
import { Container } from 'react-bootstrap'
import Navbar from './Navbar'
import AddFolderButton from './AddFolderButton';

export default function Dashboard() {
    return (
        <>
        <Navbar />
            <Container fluid>
                <AddFolderButton />
                
            </Container>
        </>
    )
}