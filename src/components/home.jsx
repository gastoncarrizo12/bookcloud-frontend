import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate(); // Inicializa useNavigate

  // Obtener los libros desde la API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/books'); 
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error al obtener los libros:', error);
      }
    };

    fetchBooks();
  }, []);

  // Funciones para manejar la navegación
  const handleRegisterClick = () => {
    navigate('/register'); // Redirige a la página de registro
  };

  const handleLoginClick = () => {
    navigate('/login'); // Redirige a la página de login
  };

  return (
    <div className="container">
      <h1 className="mt-4">Lista de Libros</h1>
      <div className="mb-3">
        {/* Botones de Login y Register */}
        <button className="btn btn-primary me-2" onClick={handleRegisterClick}>
          Register
        </button>
        <button className="btn btn-secondary" onClick={handleLoginClick}>
          Login
        </button>
      </div>
      <div className="row">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book.id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Autor: {book.author}</h6>
                  <p className="card-text">
                    <strong>Descripción:</strong> {book.description}
                  </p>
                  <p className="card-text">
                    <strong>Género:</strong> {book.genre}
                  </p>
                  <p className="card-text">
                    <strong>Año de publicación:</strong> {book.year}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No hay libros disponibles</p>
        )}
      </div>
    </div>
  );
}

export default Home;
