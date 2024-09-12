import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './header';
import Sidebar from './sidebar';
import DashboardBook from './dashboardBook';
function Dashboard() {
    return (
        <>
            <Header />
            <Container fluid>
                <Row>
                    <Col md={2}>
                        <Sidebar />
                    </Col>
                    <Col md={10}>
                        <DashboardBook />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Dashboard;
