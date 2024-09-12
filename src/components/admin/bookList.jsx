import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function BookList() {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);

    // Obtener el token del almacenamiento local
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            setError('No se ha encontrado el token de autenticación');
            return;
        }

        fetch('http://localhost:5000/api/admin/books', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('No autorizado');
            }
            return response.json();
        })
        .then((data) => setBooks(data))
        .catch((error) => {
            console.error('Error:', error);
            setError('Error al cargar los libros');
            setBooks([]); // Asegurarse de que `books` sea un array vacío en caso de error
        });
    }, [token]);

    // Definir la función handleDelete
    const handleDelete = (id) => {
        fetch(`http://localhost:5000/api/admin/books/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error al eliminar el libro');
            }
            return response.json();
        })
        .then(() => setBooks(books.filter((book) => book._id !== id)))
        .catch((error) => {
            console.error('Error:', error);
            setError('Error al eliminar el libro');
        });
    };

    // Verifica que `books` sea un array antes de usar `.map`
    if (!Array.isArray(books)) {
        return <div>Error: Datos no válidos.</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Lista de Libros</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <Link to="/admin/books/new" className="btn btn-primary mb-3">Agregar Libro</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Género</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book._id}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.genre}</td>
                            <td>
                                <Link to={`/admin/books/${book._id}`} className="btn btn-warning btn-sm">Editar</Link>
                                <button onClick={() => handleDelete(book._id)} className="btn btn-danger btn-sm ms-2">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BookList;
