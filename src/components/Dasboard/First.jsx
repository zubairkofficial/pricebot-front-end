// Ensure your component imports at the top of the file
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  Alert,
  Navbar,
  ListGroup,
  Badge,
} from "react-bootstrap";
import Sidebar from "../Sidebar/Sidebar"; // Ensure this path is correct for your project

// FileUpload component
const FileUpload = () => {
  const [items, setItems] = useState([]);
  const [showList, setShowList] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/fetchData`
        );
        setItems(response.data.message); // Adjust according to your API response structure
        setIsLoading(false);
      } catch (error) {
        setError("Failed to fetch data");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleShowList = () => setShowList(!showList);
  const handleItemAction = (itemId) => navigate(`/Data/${itemId}`);
  const handleAddAction = () => navigate("/");
  const handleShowHistory = () => setShowHistory(!showHistory);

  // Bootstrap classes are used for styling and responsiveness
  return (
    <Container
      fluid
      className="p-0 min-vh-100 d-flex flex-column bg-light"
      style={{ overflow: "hidden" }}
    >
      <Row className="flex-grow-1">
        <Col xs={12} lg={2} className="px-0">
          {/* Sidebar Component Placeholder */}
        </Col>
        <Col xs={12} lg={10} className="mt-3">
          <h2 className="ps-3 text-center">Tool-Dashboard</h2>
          <Container className="px-lg-5">
  <Row className="mb-4 g-4 pt-4">
    {/* First Box */}
    <Col lg={4}>
      <Link to="/Listing" className="text-decoration-none">
        <Card
          className="shadow-sm "
          style={{
            cursor: "pointer",
            borderRadius: "0.75rem", // Applies border radius to the card
            backgroundImage:
              'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("../assets/images/1.webp")',
            backgroundSize: "cover", // Ensure the image covers the card
            backgroundPosition: "center", // Center the background image
            color: "white", // Change text color for better readability against a potentially dark background
            height: "180px",
            opacity: 0.9, // Adjust the opacity of the background gradient
          }}
        >
          <Card.Body className="d-flex flex-column ">
            <Card.Title style={{ color: "white" }}>Preisbot</Card.Title>
            <Card.Text>
              Pricebot automatisiert die Preisverfolgung
            </Card.Text>
            <Card.Text className="mt-auto text-end">
              {/* Additional text or links */}
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>

    {/* Second Box */}
    <Col lg={4}>
      <Link to="#" className="text-decoration-none">
        <Card
          className="shadow-sm "
          style={{
            cursor: "pointer",
            borderRadius: "0.75rem", // Applies border radius to the card
            backgroundImage:
              'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("../assets/images/2.webp")',
            backgroundSize: "cover", // Ensure the image covers the card
            backgroundPosition: "center", // Center the background image
            color: "white", // Change text color for better readability against a potentially dark background
            height: "180px",
            opacity: 0.9, // Adjust the opacity of the background gradient
          }}
        >
          <Card.Body className="d-flex flex-column ">
            <Card.Title style={{ color: "white" }}>Protokoll</Card.Title>
            <Card.Text>Erstelle automatisch Protokolle aus Memos</Card.Text>
            <Card.Text className="mt-auto text-end">
              {/* Additional text or links */}
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>

    {/* Third Box */}
    <Col lg={4}>
      <Link to="#" className="text-decoration-none">
        <Card
          className="shadow-sm "
          style={{
            cursor: "pointer",
            borderRadius: "0.75rem", // Applies border radius to the card
            backgroundImage:
              'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("../assets/images/4.webp")',
            backgroundSize: "cover", // Ensure the image covers the card
            backgroundPosition: "center", // Center the background image
            color: "white", // Change text color for better readability against a potentially dark background
            height: "180px",
            opacity: 0.9, // Adjust the opacity of the background gradient
          }}
        >
          <Card.Body className="d-flex flex-column ">
            <Card.Title style={{ color: "white" }}>Preishistorie</Card.Title>
            <Card.Text>Suche nach Preisen in vergangen Daten</Card.Text>
            <Card.Text className="mt-auto text-end">
              {/* Additional text or links */}
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  </Row>
</Container>

        </Col>
      </Row>
    </Container>
  );
};

export default FileUpload;
