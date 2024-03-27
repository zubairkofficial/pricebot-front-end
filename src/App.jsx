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
import First from './components/Dasboard/First';
import First2 from './pages/First2';
import List2 from './pages/List2';
import Id2 from './pages/Id2';
// import History from './components/Dasboard/History';

import Show from './components/Dasboard/Show';

import Show2 from './pages/Show2';
import Voice from './components/Voice-assistant/Voice';
import Voice2 from './pages/Voice/Voice2'
import Deepgram from '../src/components/Voice-assistant/Deepgram';
import Transcription from './components/Voice-assistant/Transcription';

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
      path: "/show-data",
      element: <Next />
    }, // Add a new route for displaying compared data
    {
      path: "/List-data",
      element: <List />
    }, // Add a new route for displaying compared data

    {
      path: "/History/:id",
      element: <Id />
    }, // Add a new route for displaying compared data

    {
      path: "/Data/:id",
      element: <Id2 />
    },

    {
      path: "SideBar",
      element: <Sidebar2 />
    }, // Add a new route for displaying compared data
    {
      path: "/Home",
      element: <First />
    }, // Add a new route for displaying compared data
    {
      path: "/List",
      element: <First2 />
    }, // Add a new route for displaying compared data
    {
      path: "/Data",
      element: <List2 />
    }, // Add a new route for displaying compared data
    {
      path: "/Show",
      element: <Show />
     }, // Add a new route for displaying compared data
     {
      path: "/Listing",
      element: <Show2 />
     }, // Add a new route for displaying compared data

     {
      path: "/Voice-Assistant", 
      element: <Voice2 />
     },

     {
      path: "/transcription", 
      element: < Transcription />
     },





  

    
  ]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
