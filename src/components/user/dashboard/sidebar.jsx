import React from 'react';
import { ListGroup } from 'react-bootstrap';

function Sidebar() {
    const categories = [
        'Ciencia Ficción (18)',
        'Economía (13)',
        'Infantil y Juvenil (17)',
        'Poesía (14)',
        'Historia y Crítica (21)',
        'Biografía (11)'
    ];

    return (
        <ListGroup>
            <h2>Categorías</h2>
            {categories.map((category, index) => (
                <ListGroup.Item key={index}>{category}</ListGroup.Item>
            ))}
        </ListGroup>
    );
}

export default Sidebar;
