import {Welcome} from "./pages/welcome/Welcome";
import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Topics} from "./pages/topics/Topics";
import {Channels} from "./pages/channels/Channels";
import {FinishSetup} from "./pages/finishSetup/FinishSetup";
import {Profile} from "./pages/profile/Profile";
import {TopicsEditor} from "./pages/topicsEditor/TopicsEditor";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Welcome/>
    },
    {
        path: "topics",
        element: <Topics/>
    },
    {
        path: "channels",
        element: <Channels/>
    },
    {
        path: "finishSetup",
        element: <FinishSetup/>
    },
    {
        path: "profile",
        element: <Profile/>
    },
    {
        path: "topicsEditor",
        element: <TopicsEditor/>
    }
]);

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;
