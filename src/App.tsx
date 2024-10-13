import {Welcome} from "./components/pages/welcome/Welcome";
import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Topics} from "./components/pages/topics/Topics";
import {FinishSetup} from "./components/pages/finishSetup/FinishSetup";
import {Profile} from "./components/pages/profile/Profile";
import {Autorization} from "./components/pages/autorization/Autorization";
import {ErrorPage} from "./components/pages/errorPage/ErrorPage";


const router = createBrowserRouter([

    {
        path: "/",
        element: <Autorization/>,
        errorElement: <ErrorPage error={new Error("Page not found")}/>
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
        path: "/*",
        element: <ErrorPage error={new Error("Page not found")}/>
    }
]);


function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;
