import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "/assets/logo.jpeg";
import { Link, useParams } from "react-router-dom";
import { FaSignOutAlt, FaAngleLeft, FaAngleRight , FaUser , FaCog , FaKey , FaNetworkWired} from "react-icons/fa"; // Importing the necessary icons

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
    {/* Sidebar */}
    <nav
      className={`pc-sidebar ${sidebarOpen ? "open" : "closed"}`}
      style={{
        width: "270px",
        backgroundColor: "#f8f9fa",
        position: "fixed",
      
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
          left: sidebarOpen ? "240px" : "10px",
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
          <FaAngleLeft style={{ fontSize: "28px" }} />
        ) : (
          <FaAngleRight  />
        )}
      </button>

      <div className="navbar-wrapper mt-5">
        {/* <div className="m-header">
          <a href="/" className="b-brand text-primary">
       
          </a>
        </div> */}
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
                    alt="user"
                    className="user-avtar wid-45 rounded-circle"
                  />
                </div>
                <div className="flex-grow-1 ms-3 me-2">
                  <h6 className="mb-0">John Smith</h6>
                  <small>Administrator</small>
                </div>
                <a
                  className="btn btn-icon btn-link-secondary avtar"
                  data-bs-toggle="collapse"
                  href="#pc_sidebar_userlink"
                 
                >
                  <FaAngleRight />
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
              <Link to="/Admin" className="pc-link">
                <span className="pc-micon">
                  <FaUser   style={{ fontSize: "2px" }}/>
                </span>
                <span className="pc-mtext">Liste der Benutzer</span>
                <span className="pc-arrow">
                  <FaAngleRight />
                </span>
              </Link>
            </li>

            <li className="pc-item pc-hasmenu">
              <Link to="/admin-settings" className="pc-link">
                <span className="pc-micon">
                  <FaCog />
                </span>
                <span className="pc-mtext">Einstellungen</span>
                <span className="pc-arrow">
                  <FaAngleRight />
                </span>
              </Link>
            </li>

            <li className="pc-item pc-hasmenu">
              <Link to="/Key-Settings" className="pc-link">
                <span className="pc-micon">
                  <FaKey />
                </span>
                <span className="pc-mtext">API-Schlüssel öffnen AI</span>
                <span className="pc-arrow">
                  <FaAngleRight />
                </span>
              </Link>
            </li>

            <li className="pc-item pc-hasmenu">
              <Link to="/Other-Api-Settings" className="pc-link">
                <span className="pc-micon">
                  <FaNetworkWired />
                </span>
                <span className="pc-mtext">Andere APIs</span>
                <span className="pc-arrow">
                  <FaAngleRight />
                </span>
              </Link>
            </li>
          </ul>
          <div style={{ paddingLeft: "60px", paddingTop: "15rem" }}>
            <a
              href="/Admin-login"
              onClick={logout}
              style={{
                textDecoration: "none",
                color: "#333",
                fontSize: "16px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                paddingTop: "40px",
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
