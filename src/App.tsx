import {Welcome} from "./pages/welcome/Welcome";
import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Topics} from "./pages/topics/Topics";
import {FinishSetup} from "./pages/finishSetup/FinishSetup";
import {Profile} from "./pages/profile/Profile";
import {TopicsEditor} from "./pages/topicsEditor/TopicsEditor";
import {Autorization} from "./pages/autorization/Autorization";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Autorization/>
    },
    {
        path: "welcome",
        element: <Welcome/>
    },
    {
        path: "topics",
        element: <Topics/>
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
