import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para la redirección

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Para redirigir al dashboard

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Limpiar mensaje de error

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
              // Limpiar el almacenamiento local antes de guardar el nuevo token
              localStorage.removeItem('token');
              localStorage.setItem('token', data.token);

            // Verificar el rol para redirigir
            if (data.role === 'admin') {
                navigate('/admin/dashboard'); // Redirigir al dashboard de admin
            } else {
                navigate('/user/dashboard'); // Redirigir al dashboard de usuario
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
