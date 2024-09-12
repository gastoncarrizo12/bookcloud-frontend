import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import Dashboard from './components/user/dashboard/dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookRoutes from './components/admin/bookRoutes'; // Importamos las rutas de libros para admin
import Home from './components/home';
import DashboardAdmin from './components/admin/adminDashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user/dashboard" element={<Dashboard />} />

            {/* Rutas del administrador */}
            <Route path='/admin/dashboard' element={< DashboardAdmin/>} />
            <Route path='/admin/*' element={<BookRoutes/>} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
