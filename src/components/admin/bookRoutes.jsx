import { Routes, Route } from 'react-router-dom';
import BookList from './bookList';   // Asegúrate de que estos componentes están bien importados
import BookForm from './bookForm';   // Asegúrate de que estos componentes están bien importados

function BookRoutes() {
  return (
    <Routes>
      {/* La ruta es relativa a "/admin" porque en `App.jsx` has definido "/admin/*" */}
      <Route path="books" element={<BookList />} />
      <Route path="books/new" element={<BookForm />} />
      <Route path="books/:id" element={<BookForm />} />
    </Routes>
  );
}

export default BookRoutes;

