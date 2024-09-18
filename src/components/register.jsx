import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Importar Bootstrap Icons

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Limpiar mensaje de error

        if (!email || !password) {
            setErrorMessage('Todos los campos son obligatorios');
            return;
        }

        try {
            const res = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                // Mostrar mensaje de error en caso de fallo
                setErrorMessage(data.message || 'Error al registrar');
            } else {
                console.log('Registro exitoso');
                // Aquí puedes redirigir o realizar otras acciones tras el registro exitoso
            }
        } catch (error) {
            setErrorMessage('Error al comunicarse con el servidor');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg p-4">
                        {/* Flecha para volver al inicio */}
                        <div className="mb-3">
                            <i
                                className="bi bi-arrow-left-circle-fill"
                                style={{ fontSize: '24px', cursor: 'pointer' }}
                                onClick={() => navigate('/')}
                            ></i>
                        </div>

                        <h2 className="text-center mb-4">Regístrate</h2>

                        {errorMessage && (
                            <div className="alert alert-danger" role="alert">
                                {errorMessage}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Ingrese su email"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Ingrese su contraseña"
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary w-100">
                                Registrarse
                            </button>
                        </form>

                        <hr />

                        <div className="text-center mt-3">
                            <p>¿Ya tienes una cuenta? <span className="text-primary">Inicia Sesión</span></p>
                            <button
                                className="btn btn-secondary w-100 mt-2"
                                style={{ fontWeight: 'bold', fontSize: '16px' }}
                                onClick={() => navigate('/login')}
                            >
                                Iniciar Sesión
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
