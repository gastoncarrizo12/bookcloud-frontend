import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

function DashboardBook() {
    const books = [
        { title: 'El Diario de Ana Frank', img: 'ana frank.jpg' },
        { title: 'Los Juegos del Hambre', img: 'juegos del hambre.jpg' },
        { title: 'El feminismo', img: 'feminismo.jpg' },
        { title: 'Eva Peron', img: 'evaperon.jpg' },
        // Puedes añadir más libros aquí
    ];

    return (
        <Row>
            {books.map((book, index) => (
                <Col key={index} md={3} className="mb-4">
                    <Card>
                        <Card.Img variant="top" src={book.img} />
                        <Card.Body>
                            <Card.Title>{book.title}</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

export default DashboardBook;
