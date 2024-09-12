import React from 'react';
import { Link } from 'react-router-dom';

function DashboardAdmin() {
  return (
    <div className="container mt-5">
      <h1>Panel de Administración</h1>
      <p>Bienvenido al panel de control del administrador.</p>
      
      <div className="mt-4">
        <Link to="/admin/books" className="btn btn-primary">
          Ir a la sección de libros
        </Link>
      </div>
    </div>
  );
}

export default DashboardAdmin;
