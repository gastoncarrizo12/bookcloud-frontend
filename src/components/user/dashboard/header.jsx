import React from 'react';
import { Navbar, Form, FormControl, Button } from 'react-bootstrap';

function Header() {
    return (
        <Navbar bg="light" expand="lg" className="shadow-sm">
            <Navbar.Brand href="#">
                <img src="" width="30" height="30" alt="Logo" /> Biblio Fácil
            </Navbar.Brand>
            <Form inline className="ml-auto">
                <FormControl type="text" placeholder="Buscar libros..." className="mr-sm-2" />
                <Button variant="outline-primary">Buscar</Button>
            </Form>
            <div className="ml-3 d-flex align-items-center">
                <Button variant="outline-secondary" className="mr-2">
                    <img src="/agregar-usuario.png" alt="usuario" width="30" height="30" />
                </Button>
            </div>
        </Navbar>
    );
}

export default Header;
