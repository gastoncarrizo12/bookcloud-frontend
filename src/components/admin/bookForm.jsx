import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function BookForm() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [publishedDate, setPublishedDate] = useState('');
    const [price, setPrice] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (id) {
            setLoading(true);
            fetch(`http://localhost:5000/api/admin/books/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    setTitle(data.title);
                    setAuthor(data.author);
                    setGenre(data.genre);
                    setDescription(data.description);
                    setCoverImage(data.coverImage);
                    setPublishedDate(data.publishedDate);
                    setPrice(data.price);
                    setIsEditing(true);
                })
                .catch((error) => setError('Error al cargar el libro'))
                .finally(() => setLoading(false));
        }
    }, [id, token]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const method = isEditing ? 'PUT' : 'POST';
        const url = isEditing ? `http://localhost:5000/api/admin/books/${id}` : 'http://localhost:5000/api/admin/books';

        fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title, author, genre, description, coverImage, publishedDate, price }),
        })
            .then((response) => response.json())
            .then(() => navigate('/admin/books'))
            .catch((error) => setError('Error al guardar el libro'))
            .finally(() => setLoading(false));
    };

    // Solo para depuración, eliminar cuando no sea necesario
    useEffect(() => {
        console.log('Token:', token);
    }, [token]);


    return (
        <div className="container mt-5">
            <h2>{isEditing ? 'Editar Libro' : 'Agregar Libro'}</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {loading && <div className="alert alert-info">Cargando...</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Título</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Autor</label>
                    <input
                        type="text"
                        className="form-control"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Género</label>
                    <input
                        type="text"
                        className="form-control"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <textarea
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Imagen de Portada</label>
                    <input
                        type="text"
                        className="form-control"
                        value={coverImage}
                        onChange={(e) => setCoverImage(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Fecha de Publicación</label>
                    <input
                        type="date"
                        className="form-control"
                        value={publishedDate}
                        onChange={(e) => setPublishedDate(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Precio</label>
                    <input
                        type="number"
                        className="form-control"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {isEditing ? 'Actualizar Libro' : 'Agregar Libro'}
                </button>
            </form>
        </div>
    );
}


export default BookForm;
