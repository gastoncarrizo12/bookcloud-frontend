import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import HeaderHome from './headerHome';
import SidebarHome from './sidebarHome';
import DashboardBookHome from './dashboardBookHome';
function Home() {
  return (
    <>
        <HeaderHome />
        <Container fluid>
            <Row>
                <Col md={2}>
                    <SidebarHome />
                </Col>
                <Col md={10}>
                    <DashboardBookHome />
                </Col>
            </Row>
        </Container>
    </>
);
}

export default Home;
