import React from 'react';
import Dashboard from "./components/Dashboard";
import 'bootstrap/dist/css/bootstrap.css';
import { Col, Row } from 'reactstrap';

function App() {
  return (
    <Row className="justify-content-center mx-0">
      <Col lg={7}>
       <Dashboard/>
      </Col>
    </Row>
  );
}

export default App;
