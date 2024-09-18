import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Importar Bootstrap Icons

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (!email || !password) {
            setErrorMessage('Todos los campos son obligatorios');
            return;
        }

        const res = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.removeItem('token');
            localStorage.setItem('token', data.token);

            if (data.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/user/dashboard');
            }
        } else {
            setErrorMessage(data.message || 'Error al iniciar sesión');
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

                        <h2 className="text-center mb-4">Iniciar Sesión</h2>

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
                                Iniciar Sesión
                            </button>
                        </form>

                        <hr />

                        <div className="text-center mt-3">
                            <p>¿No tienes cuenta? <span className="text-primary">Regístrate</span></p>
                            <button
                                className="btn btn-secondary w-100 mt-2"
                                style={{ fontWeight: 'bold', fontSize: '16px' }}
                                onClick={() => navigate('/register')}
                            >
                                Registrarse
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
