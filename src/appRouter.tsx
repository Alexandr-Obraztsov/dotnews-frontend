import {createBrowserRouter} from "react-router-dom";
import React from "react";
import {Autorization} from "./components/pages/autorization/Autorization";
import {ErrorPage} from "./components/pages/errorPage/ErrorPage";
import {Welcome} from "./components/pages/welcome/Welcome";
import {FinishSetup} from "./components/pages/finishSetup/FinishSetup";
import {Profile} from "./components/pages/profile/Profile";
import {AddChannel} from "./components/pages/addChannel/AddChannel";
import {Settings} from "./components/pages/settings/Settings";
import {AddDigestTime} from "./components/pages/addDigestTime/AddDigestTime";

export const ROUTES = {
    autorization: "/",
    welcome: "/welcome",
    finishSetup: "/finishSetup",
    profile: "/profile",
    addChannel: "/addChannel",
    settings: "/settings",
    addDigestTime: "/addDigestTime",
    error: "/*"
}

export const appRouter = createBrowserRouter([
    {
        path: ROUTES.autorization,
        element: <Autorization/>,
        errorElement: <ErrorPage error={new Error("Page not found")}/>
    },
    {
        path: ROUTES.welcome,
        element: <Welcome/>
    },
    {
        path: ROUTES.finishSetup,
        element: <FinishSetup/>
    },
    {
        path: ROUTES.profile,
        element: <Profile/>
    },
    {
        path: ROUTES.addChannel,
        element: <AddChannel/>
    },
    {
        path: ROUTES.settings,
        element: <Settings/>
    },
    {
        path: ROUTES.addDigestTime,
        element: <AddDigestTime/>
    },
    {
        path: ROUTES.error,
        element: <ErrorPage error={new Error("Page not found")}/>
    }
]);