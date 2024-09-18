import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Form, FormControl, Button, Container } from 'react-bootstrap';
import logo from '../../assets/img/logo.png';

function HeaderHome() {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <Navbar bg="light" expand="lg" className="shadow-sm">
        <Container>
            <Navbar.Brand href="#">
                <img src={logo} width="30" height="30" alt="Logo" /> Biblio Fácil
            </Navbar.Brand>
            <Form className="d-flex mx-auto" style={{ flex: 1, maxWidth: '600px' }}>
                <FormControl 
                    type="text" 
                    placeholder="Buscar libros..." 
                    className="mr-sm-2" 
                    style={{ flex: 1 }} 
                />
                <Button variant="outline-primary">Buscar</Button>
            </Form>
            <div className="ml-auto">
                <Button variant="outline-success" onClick={handleLoginClick}>
                    Iniciar Sesión
                </Button>
            </div>
        </Container>
    </Navbar>
    );
}

export default HeaderHome;
