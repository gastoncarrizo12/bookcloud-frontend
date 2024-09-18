import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';

function DashboardBookHome() {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);

    // URL del endpoint del backend para obtener los libros
    const API_URL = 'http://localhost:5000/api/books'; // Ajusta la URL según tu backend

    useEffect(() => {
        // Función para obtener los libros del backend
        const fetchBooks = async () => {
            try {
                // Obtén el token desde el almacenamiento local (localStorage o sessionStorage)
                const token = localStorage.getItem('token');

                const response = await fetch(API_URL, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Añadir el token JWT en los headers
                    },
                });

                if (!response.ok) {
                    throw new Error('Error fetching books');
                }

                const data = await response.json();
                setBooks(data); // Asigna los datos de los libros al estado
            } catch (error) {
                console.error('Error fetching books:', error);
                setError('Error al cargar los libros');
            }
        };

        fetchBooks();
    }, []); // El array vacío asegura que solo se ejecute una vez, al montar el componente

    return (
        <div className="container mt-5">
            <h2>Lista de Libros</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <Row>
                {books.length > 0 ? (
                    books.map((book) => (
                        <Col key={book._id} md={4} className="mb-4"> {/* Ajuste para tarjetas más pequeñas */}
                            <Card style={{ width: '18rem' }}> {/* Ajusta el ancho de la tarjeta */}
                                <Card.Img variant="top" src={book.coverImage || 'default-image.jpg'} alt={book.title} />
                                <Card.Body>
                                    <Card.Title>{book.title}</Card.Title>
                                    <Card.Text>
                                        Autor: {book.author}
                                    </Card.Text>
                                    <Card.Text>
                                        Precio: ${book.price} {/* Mostrar el precio */}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col>
                        <div className="alert alert-info">No hay libros disponibles</div>
                    </Col>
                )}
            </Row>
        </div>
    );
}

export default DashboardBookHome;
