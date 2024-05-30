import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Index from "./pages/Index";
import Registration from "./pages/Registration";

import { Toaster } from "react-hot-toast";
import Next from "./components/Next";
// import List from './components/List';
import List from "./components/List";
import Id from "./components/Id";
import Sidebar2 from "./components/Sidebar/Sidebae2";
// import indexx from './components/Dasboard/index';
import First from "./components/Dasboard/First";
import First2 from "./pages/First2";
import List2 from "./pages/List2";
import Id2 from "./pages/Id2";
// import History from './components/Dasboard/History';

import Show from "./components/Dasboard/Show";

import Show2 from "./pages/Show2";
import Voice from "./components/Voice-assistant/Voice";
import Voice2 from "./pages/Voice/Voice2";
import Deepgram from "../src/components/Voice-assistant/Deepgram";
import Transcription from "./components/Voice-assistant/Transcription";
import Index2 from "./pages/Admin2/Index2";
import AddUser2 from "./pages/Admin2/AddUser2";
import AdminLogin from "./components/Auth/Login/AdminLogin";
import Role2 from './pages/Admin2/Role2';
import Edit2 from './pages/Admin2/Edit2';
import Settings2 from './pages/Settings2';
import Listmail2 from './pages/Listmail2';
import Resend2 from './pages/Resend2';
import Invoice2 from './pages/Invoice/Invoice2';
import GetData2 from './pages/Invoice/GetData2';
import Pastinvoices2 from './pages/Invoice/Pastinvoice2';
import History2 from './pages/Invoice/History2';
import Recordedtextmail2 from './pages/Recordedtextmail2'; 
import Getdatawithdate2 from './pages/Invoice/Getdatawithdate2';
import Exceltool from './pages/Exceltool2';

import Edittool2 from './pages/Edit/Edittool2';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Index />,
    },
    {
      path: "/registration",
      element: <Registration />,
    },

    {
      path: "/Admin-login",
      element: <AdminLogin />,
    },
    {
      path: "/show-data",
      element: <Next />,
    }, // Add a new route for displaying compared data
    {
      path: "/List-data",
      element: <List />,
    }, // Add a new route for displaying compared data

    {
      path: "/History/:id",
      element: <Id />,
    }, // Add a new route for displaying compared data

    {
      path: "/Data/:id",
      element: <Id2 />,
    },

    {
      path: "SideBar",
      element: <Sidebar2 />,
    }, // Add a new route for displaying compared data
    {
      path: "/Home",
      element: <First />,
    }, // Add a new route for displaying compared data
    {
      path: "/List",
      element: <First2 />,
    }, // Add a new route for displaying compared data
    {
      path: "/Data",
      element: <List2 />,
    }, // Add a new route for displaying compared data
    {
      path: "/Show",
      element: <Show />,
    }, // Add a new route for displaying compared data
    {
      path: "/Listing",
      element: <Show2 />,
    }, // Add a new route for displaying compared data

    {
      path: "/Voice-Assistant",
      element: <Voice2 />,
    },

    {
      path: "/transcription",
      element: <Transcription />,
    },

    {
      path: "/Admin",
      element: <Index2 />,
    },
    {
      path: "/AddUser",
      element: <AddUser2 />,
    }, 
    {
      path: "admin-settings",
      element: < Role2 />,
    },

    {
      path: "/Edit/:roleId",
      element: < Edit2 />,
    },
    {
      path: "/Settings",
      element: < Settings2 />,
    },

    {
      path: "Record-mail",
      element: < Listmail2 />,
    },

    {
      path: "Resend-Email/:userId",
      element: < Resend2 />,
    },

    {
      path: "Delivery-Bills",
      element: < Invoice2 />,
    },


    {
      path: "invoice-details",
      element: < GetData2 />,
    },

    {
      path: "Past-invoices",
      element: < Pastinvoices2 />,
    },
    {
      path: "Records",
      element: <History2/>,
    },

    {
      path: "Recorded-text-mail",
      element: <Recordedtextmail2/>,
    },
    {
      path: "Details-with-date/:uploadDate",
      element: <Getdatawithdate2/>,
    },

    // routes Edit tool
    {
      path: "Edit-tool",
      element: <Edittool2/>,
    },

    {
      path: "Excel-tool",
      element: <Exceltool/>,
    },
  ]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={router} />
    </>
  );
}

//create auth route
// make authentication

export default App;
