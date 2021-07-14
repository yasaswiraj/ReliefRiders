import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import styles from './AssignRequest.module.css';

export default function AssignRequest() {
  return(
    <div>
      <div className={styles.border}>
        <h5 className={styles.header}>Assign Request</h5>
        <p className={styles.pow}>Choosen order has to be a pending order</p>
        {/* Search Order ID */}
        <div>
          <Form>
            <Container className={styles.ordersearch}>
              <Row>
                <Col><Form.Control type="email" placeholder="Enter Order ID #" /></Col>
                <Col xs lg="2"><Button variant="primary" type="submit">Fetch Order</Button></Col>
              </Row>
            </Container>
          </Form>
        </div>

        {/* Request Details */}
        <div className={styles.border2}>
          <Row style={{marginTop: '1%'}}>
            <Col md="auto"><h6>Request Status:</h6></Col>
            <Col md='auto'><h6 style={{color: 'red'}}>Pending</h6></Col>
          </Row>
          <Row style={{marginTop: '2%'}}>
            <Col md="auto"><h6>Date:</h6></Col>
            <Col md='auto'><h6 style={{color: 'blue'}}>16/05/21</h6></Col>
          </Row>
          <Row style={{marginTop: '2%'}}>
            <Col md="auto"><h6>Requester Name:</h6></Col>
            <Col md='auto'><h6 style={{color: 'blue'}}>John Doe</h6></Col>
          </Row>
          <Row style={{marginTop: '2%'}}>
            <Col md="auto"><h6>Request Type:</h6></Col>
            <Col md='auto'><h6 style={{color: 'blue'}}>General Request</h6></Col>
          </Row>
          <h6 style={{marginTop: '2%'}}>Delivery Address/Location:</h6>
          <p>G3, Sunshine Villas, sainikpuri, Secunderabad - 500069</p>
          <h6 style={{marginTop: '2%'}}>Items Requested:</h6>
          <ul>
            <li>Dolo 650, 5 Strips</li>
            <li>Ivermectin, 4 Strips</li>
            <li>Food Packets, 3</li>
          </ul>
        </div>

        {/* Assign Request Search Bar */}
        <div style={{marginTop: '3%'}}>
          <Form>
            <Container>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Assign Request:</Form.Label>
                <Col sm="10">
                  <Form.Control type="text" placeholder="Enter Rider Name" />
                </Col>
              </Form.Group>
            </Container>
          </Form>
        </div>

        {/* Header */}
        <div style={{marginTop: '2%'}}>
          <div className={styles.border4}>
            <Row style={{textAlign: 'center', alignItems: 'center'}}>
              <Col><h6>Name</h6></Col>
              <Col><h6>Deliveries Completed</h6></Col>
              <Col><h6>Assign Request</h6></Col>
            </Row>
          </div>

          {/* Dummy Values */}
          <div className={styles.border3}>
            <Row style={{textAlign: 'center', alignItems: 'center'}}>
              <Col><h6>Sai Kiran</h6></Col>
              <Col><h6>40 Deliveries</h6></Col>
              <Col><Button variant="dark" type="submit">Assign</Button></Col>
            </Row>
          </div>
          <div className={styles.border3}>
            <Row style={{textAlign: 'center', alignItems: 'center'}}>
              <Col><h6>Shiva</h6></Col>
              <Col><h6>25 Deliveries</h6></Col>
              <Col><Button variant="dark" type="submit">Assign</Button></Col>
            </Row>
          </div>
          <div className={styles.border3}>
            <Row style={{textAlign: 'center', alignItems: 'center'}}>
              <Col><h6>Venkat sai ram</h6></Col>
              <Col><h6>32 Deliveries</h6></Col>
              <Col><Button variant="dark" type="submit">Assign</Button></Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}
