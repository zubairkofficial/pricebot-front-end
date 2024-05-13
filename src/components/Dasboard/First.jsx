import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

const FileUpload = () => {
  const [userServices, setUserServices] = useState([]);

  useEffect(() => {
    // Retrieve user services from local storage
    const storedServices = localStorage.getItem("user_Services");
    if (storedServices) {
      const parsedServices = JSON.parse(storedServices);
      setUserServices(parsedServices);
    } else {
      // If no services stored, set userServices to an empty array
      setUserServices([]);
    }
  }, []);

  const services = [
    {
      id: "Listing",
      name: "Preisbot",
      description: "Pricebot automatisiert die Preisverfolgung",
      img: "1.webp",
      link: "/preisbot"
    },
    {
      id: "Voice-Assistant",
      name: "Protokoll",
      description: "Erstelle automatisch Protokolle aus Memos",
      img: "2.webp",
      link: "/protokoll"
    },
    {
      id: "Delivery-Bills",
      name: "Preishistorie",
      description: "Suche nach Preisen in vergangenen Daten",
      img: "4.webp",
      link: "/preishistorie"
    },
    {
      id: "Edit-tool",
      name: "Finde Lieferscheine mit",
      description: "manuellen Änderungen",
      img: "6.jpg",
      link: "/Edit-tool"

    }
  ];

  // Check if a service is enabled or if the userServices array is empty
  const isServiceEnabled = (serviceName) => {
    // If no services stored, return true (all services enabled)
    if (userServices.length === 0) return true;

    // Otherwise, check if the service is included in userServices
    return userServices.includes(serviceName);
  };

  return (
    <Container
      fluid
      className="p-0 min-vh-100 d-flex flex-column bg-light"
      style={{ overflow: "hidden" }}
    >
      <Row className="flex-grow-1">
        <Col xs={12} lg={2} className="px-0">
          {/* Sidebar Placeholder */}
        </Col>
        <Col xs={12} lg={10} className="mt-3">
          <h2 className="ps-3 text-center">Tool-Dashboard</h2>
          <Container className="px-lg-5">
            <Row className="mb-4 g-4 pt-4">
              {services.map((service) => (
                <Col lg={4} key={service.id}>
                  {service.id && service.link ? (
                    <Link
                      to={isServiceEnabled(service.name) ? `/${service.id}` : "#"}
                      className="text-decoration-none"
                      style={{ position: "relative" }}
                    >
                      <Card
                        className={`shadow-sm ${
                          isServiceEnabled(service.name) ? "" : "disabled"
                        }`}
                        style={{
                          cursor: "pointer",
                          borderRadius: "0.75rem",
                          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("../assets/images/${service.img}")`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          color: "white",
                          height: "180px",
                          opacity: isServiceEnabled(service.name) ? 0.9 : 0.5, // Adjust opacity to indicate disabled
                        }}
                      >
                        {!isServiceEnabled(service.name) && (
                          <div
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                            }}
                          >
                            <FontAwesomeIcon icon={faLock} size="2x" />
                          </div>
                        )}
                        <Row />
                        <Card.Body className="d-flex flex-column ">
                          <Card.Title style={{ color: "white" }}>
                            {service.name}
                          </Card.Title>
                          <Card.Text>{service.description}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
                  ) : (
                    <Card
                      className={`shadow-sm ${
                        isServiceEnabled(service.name) ? "" : "disabled"
                      }`}
                      style={{
                        cursor: "pointer",
                        borderRadius: "0.75rem",
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("../assets/images/${service.img}")`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        color: "white",
                        height: "180px",
                        opacity: isServiceEnabled(service.name) ? 0.9 : 0.5, // Adjust opacity to indicate disabled
                      }}
                    >
                      {!isServiceEnabled(service.name) && (
                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                          }}
                        >
                          <FontAwesomeIcon icon={faLock} size="2x" />
                        </div>
                      )}
                      <Row />
                      <Card.Body className="d-flex flex-column ">
                        <Card.Title style={{ color: "white" }}>
                          {service.name}
                        </Card.Title>
                        <Card.Text>{service.description}</Card.Text>
                      </Card.Body>
                    </Card>
                  )}
                </Col>
              ))}
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default FileUpload;
