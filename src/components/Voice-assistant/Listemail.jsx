import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Alert, ListGroup, Button, InputGroup, FormControl, Spinner } from 'react-bootstrap';

const SentEmails = () => {
  const [emails, setEmails] = useState([]);
  const [filteredEmails, setFilteredEmails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/getSentEmails`);
        setEmails(response.data.emails);
        setFilteredEmails(response.data.emails);
        setIsLoading(false);
      } catch (error) {
        setError("Fehler beim Abrufen gesendeter E-Mails");
        setIsLoading(false);
      }
    };

    fetchEmails();
  }, []);

  useEffect(() => {
    const results = emails.filter(email => {
      const name = email.email ? email.email.toLowerCase() : "";
      const title = email.transcriptionText ? email.transcriptionText.toLowerCase() : "";
      return (
        name.includes(searchTerm.toLowerCase()) ||
        title.includes(searchTerm.toLowerCase())
      );
    });
    setFilteredEmails(results);
  }, [searchTerm, emails]);
  
  const handleEmailClick = (email) => {
    navigate(`/Resend-Email/${email.id}`);
  };

  return (
    <Container fluid className="p-0 min-vh-100 d-flex flex-column bg-light" style={{ overflow: 'hidden' }}>
      <Row className="flex-grow-1">
        <Col xs={12} lg={3} className="px-0">
          {/* Sidebar Component Placeholder */}
        </Col>
        <Col xs={12} lg={8} className="px-0">
          <Container fluid className="pt-5">
            <Row>
              <Col xs={12}>
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="flex-grow-1">Gesendete E-Mails</h2>
                    <InputGroup size="sm" className="mr-3" style={{ maxWidth: '300px' }}>
                      <FormControl
                        placeholder="Nach email oder Transkriptions suchen..."
                        aria-label="Suche"
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </InputGroup>
                    <Link to="/voice-assistant" className="btn btn-primary ms-2">Sprachassistent</Link>
                  </div>
                </div>
                <Card className="shadow bg-white rounded">
                  <Card.Body>
                    {isLoading ? (
                      <div className="text-center py-3">
                        <Spinner animation="border" role="status">
                          <span className="visually-hidden">Laden...</span>
                        </Spinner>
                      </div>
                    ) : error ? (
                      <Alert variant="danger">{error}</Alert>
                    ) : (
                      <ListGroup variant="flush">
                        {filteredEmails.map((email, index) => (
                          <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center" style={{ cursor: 'pointer' }} onClick={() => handleEmailClick(email)}>
                            <div>
                              <div><strong>{email.title}</strong></div>
                              <div>{email.transcriptionText.substring(0, 70)}{email.transcriptionText.length > 70 && '...'}</div>
                              {email.transcriptionText.length > 70 && (
                                <div className="text-muted">Vollständige E-Mail anzeigen</div>
                              )}
                            </div>
                            <small>{email.email}</small>
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

export default SentEmails;
