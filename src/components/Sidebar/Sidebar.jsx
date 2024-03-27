import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "/assets/logo.jpeg";
import { Link, useParams } from "react-router-dom";
import { FaSignOutAlt, FaAngleLeft, FaAngleRight } from "react-icons/fa"; // Importing the necessary icons

const Sidebar = () => {
  const [selectedModel, setSelectedModel] = useState("AI Model");
  const [latestPdfData, setLatestPdfData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true); // State variable to track sidebar visibility
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/fetchData`
        );
        setLatestPdfData(response.data.message);
      } catch (error) {
        console.error("Error fetching latest PDF data:", error);
      }
    };

    const fetchDataById = async (id) => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/fetchDataById/${id}`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching data by ID:", error);
        return null;
      }
    };

    fetchData();

    const storedModel = localStorage.getItem("selectedModel");
    if (storedModel) {
      setSelectedModel(storedModel);
    }
  }, []);

  function logout() {
    localStorage.clear();
    window.location.reload();
  }

  async function handleHistoryItemClick(id, title) {
    try {
      const data = await fetchDataById(id);
      console.log("Clicked on:", title);
    } catch (error) {
      console.error("Error fetching data by ID:", error);
    }
  }

  // Function to toggle sidebar visibility
  function toggleSidebar() {
    setSidebarOpen(!sidebarOpen);
  }

  return (
    <div>
      {/* Arrow button to toggle sidebar visibility */}

      {/* Sidebar */}
      <nav
        className={`pc-sidebar ${sidebarOpen ? "open" : "closed"}`}
        style={{
          width: "270px",
          backgroundColor: "#f8f9fa",
          position: "fixed",
          top: "0",
          bottom: "0",
          left: sidebarOpen ? "0" : "-270px",
          transition: "left 0.3s ease-in-out",
        }}
      >
        {/* Toggle button for sidebar */}
        <button
          style={{
            position: "fixed",
            top: "50%",
            transform: "translateY(-50%)",
            left: sidebarOpen ? "240px" : "10px", // Adjusted position
            backgroundColor: "transparent",
            border: "none", 
            outline: "none",
            cursor: "pointer",
            fontSize: "25px",
            zIndex: 9999,
          }}
          onClick={toggleSidebar}
        >
          {sidebarOpen ? (
            <FaAngleLeft style={{ fontSize: "24px" }} />
          ) : (
            <FaAngleRight style={{ fontSize: "24px" }} />
          )}
        </button>

        <div className="navbar-wrapper">
          <div className="m-header">
            <a href="/" className="b-brand text-primary">
              <img
                style={{ height: "50px", width: "50px" }}
                src={logo}
                className="img-fluid logo-lg"
                alt="logo"
              />
            </a>
          </div>
          <div className="navbar-content">
            <div className="card pc-user-card">
              <div
                style={{
                  backgroundColor: "rgba(1,150,69,0.4)",
                  borderRadius: "10px",
                }}
                className="card-body"
              >
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <img
                      src="../assets/images/user/avatar-1.jpg"
                      alt="user-image"
                      className="user-avtar wid-45 rounded-circle"
                    />
                  </div>
                  <div className="flex-grow-1 ms-3 me-2">
                    <h6 className="mb-0">Jonh Smith</h6>
                    <small>Administrator</small>
                  </div>
                  <a
                    className="btn btn-icon btn-link-secondary avtar"
                    data-bs-toggle="collapse"
                    href="#pc_sidebar_userlink"
                  >
                    <svg className="pc-icon">
                      <use xlinkHref="#custom-sort-outline"></use>
                    </svg>
                  </a>
                </div>
                <div
                  className="collapse pc-user-links"
                  id="pc_sidebar_userlink"
                ></div>
              </div>
            </div>
            <ul className="pc-navbar">
              <li className="pc-item pc-caption"></li>
              <li className="pc-item pc-hasmenu">
                <Link to="/List" className="pc-link">
                  <span className="pc-micon">
                    <svg className="pc-icon">
                      <use xlinkHref="#custom-status-up"></use>
                    </svg>
                  </span>
                  <span className="pc-mtext">Werkzeuge</span>
                  <span className="pc-arrow">
                    <i data-feather="chevron-right"></i>
                  </span>
                </Link>
              </li>
              {/* Dropdown Tab for History */}
              <li className="pc-item pc-hasmenu">
                <div
                  className="card"
                  style={{
                    maxHeight: "230px",
                    overflowY: "auto",
                    backgroundColor: "transparent",
                  }}
                >
                  {/* <div className="card-header">
              <h5 className="card-title">History</h5>
            </div>
            <ul
              className="list-group list-group-flush"
              style={{ backgroundColor: "transparent" }}
            >
              {Array.isArray(latestPdfData) &&
                latestPdfData.map((data, index) => (
                  <li key={index} className="list-group-item">
                    <div className="d-flex justify-content-between align-items-center">
                      <h6
                        className="mb-0"
                        onClick={() =>
                          handleHistoryItemClick(data.id, data.title)
                        }
                      >
                        <Link
                          to={`/History/${data.id}`}
                          className="text-decoration-none"
                          style={{ color: "#333" }}
                        >
                          {data.title}
                        </Link>
                      </h6>
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() =>
                          handleHistoryItemClick(data.id, data.title)
                        }
                      >
                        <Link
                          to={`/History/${data.id}`}
                          className="text-decoration-none"
                          style={{ color: "#333" }}
                        >
                          View
                        </Link>
                      </button>
                    </div>
                  </li>
                ))}
            </ul> */}
                </div>
              </li>
            </ul>
            <div style={{ paddingLeft: "60px", paddingTop: "17rem" }}>
              <a
                href="/registration"
                onClick={logout}
                style={{
                  textDecoration: "none",
                  color: "#333",
                  fontSize: "16px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  paddingTop: "60px",
                }}
              >
                <FaSignOutAlt /> {/* Logout icon */}
                <span className="">Ausloggen</span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
