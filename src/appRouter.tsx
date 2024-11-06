import {createBrowserRouter} from "react-router-dom";
import React from "react";
import {Autorization} from "./components/pages/autorization/Autorization";
import {ErrorPage} from "./components/pages/errorPage/ErrorPage";
import {Welcome} from "./components/pages/welcome/Welcome";
import {FinishSetup} from "./components/pages/finishSetup/FinishSetup";
import {Profile} from "./components/pages/profile/Profile";
import {AddChannel} from "./components/pages/addChannel/AddChannel";
import {DigestPage} from "./components/pages/digestPage/DigestPage";

export const ROUTES = {
    autorization: "/",
    welcome: "/welcome",
    finishSetup: "/finishSetup",
    profile: "/profile",
    addChannel: "/addChannel/:digestId",
    settings: "/settings",
    addDigestTime: "/addDigestTime",
    digestPage: "/digestPage/:digestId",
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
        path: ROUTES.digestPage,
        element: <DigestPage/>
    },
    {
        path: ROUTES.error,
        element: <ErrorPage error={Error("Страница не найдена")}/>
    }
]);