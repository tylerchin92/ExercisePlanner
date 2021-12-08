import Navbar from 'react-bootstrap/Navbar';
import {Container, Nav} from 'react-bootstrap';

function WorkoutNavbar() {

    return (
        <Navbar bg="secondary" expand="lg" fixed="top" variant='dark'>
            <Container>
                <Navbar.Brand>Workout Planner</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href='/workouts'>View Workouts</Nav.Link>
                        <Nav.Link href='/create-workout'>Add a New Workout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default WorkoutNavbar