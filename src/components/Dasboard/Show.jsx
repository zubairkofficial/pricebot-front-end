import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, Row, Col, Card, Alert, ListGroup, Badge } from 'react-bootstrap';
import Sidebar from '../Sidebar/Sidebar'; // Adjust the import path according to your project structure
// import Helpers from "./Helpers/Helpers";
import Helpers from '../../Helpers/Helpers';


const YourComponent = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/fetchData`);
        setItems(response.data.message); // Adjust according to your API response structure
        setIsLoading(false);
      } catch (error) {
        setError("Failed to fetch data");
        setIsLoading(false);
      }
    };

    

    fetchData();
  }, []);

  const handleItemAction = (itemId) => navigate(`/Data/${itemId}`);
  const handleAddAction = () => navigate("/"); // Adjust according to your app's routing

  return (
    <Container fluid className="p-0 min-vh-100 d-flex flex-column bg-light" style={{ overflow: 'hidden' }}>
    <Row className="flex-grow-1">
      <Col xs={12} lg={3} className="px-0">
        {/* Sidebar Component Placeholder */}
      </Col>
      <Col xs={12} lg={8} className="px-0"> {/* Remove padding here for full width */}
        <Container fluid className="pt-5"> {/* Make this Container fluid as well */}
          <Row className="justify-content-center">
            <Col xs={12}> {/* Use xs={12} to ensure full width usage */}
              <h2 className="mb-4 text-center"> Preisbot</h2>
              <Card className="shadow bg-white rounded" style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                <Card.Header className="bg-light text-dark d-flex justify-content-between align-items-center">
                  <h5 className="m-0"> Preisbot</h5>
                  <Button variant="primary" onClick={handleAddAction}>
                    Neue hinzufügen
                  </Button>
                </Card.Header>
                <Card.Body>
                  {isLoading ? (
                    <div className="text-center py-3">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : error ? (
                    <Alert variant="danger">{error}</Alert>
                  ) : (
                    <ListGroup variant="flush">
                      {items.map((item, index) => (
                        <ListGroup.Item key={index} action onClick={() => handleItemAction(item.id)} className="mb-3" style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)' }}>
                          <Row className="align-items-center p-2 rounded">
                            <Col md={8}>
                              <Link to={`/Data/${item.id}`} className="text-decoration-none" style={{ color: "black" }}>
                                {item.title}
                              </Link>
                              <Badge bg="secondary" className="ms-2">{item.status}</Badge>
                            </Col>
                            <Col md={4} className="text-md-end">
                              <small>{new Date(item.created_at).toLocaleDateString()} {new Date(item.created_at).toLocaleTimeString()}</small>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Col>
    </Row>
  </Container>
  
  
  );
};

export default YourComponent;
