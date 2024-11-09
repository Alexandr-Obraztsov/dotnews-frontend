import {createBrowserRouter} from "react-router-dom";
import React from "react";
import {Autorization} from "../components/pages/autorization/Autorization";
import {ErrorPage} from "../components/pages/errorPage/ErrorPage";
import {Welcome} from "../components/pages/welcome/Welcome";
import {FinishSetup} from "../components/pages/finishSetup/FinishSetup";
import {Profile} from "../components/pages/profile/Profile";
import {AddChannel} from "../components/pages/addChannel/AddChannel";
import {DigestPage} from "../components/pages/digestPage/DigestPage";
import {DigestTimeEditPage} from "../components/pages/digestTimeEditPage/DigestTimeEditPage";

export const PATHS = {
    autorization: "/",
    welcome: "/welcome",
    finishSetup: "/finishSetup",
    profile: "/profile",
    addChannel: "/addChannel/:digestId",
    settings: "/settings",
    addDigestTime: "/addDigestTime",
    digestPage: "/digestPage/:digestId",
    digestTimeEditPage: "/digestTimeEditPage/:digestId",
    error: "/*"
}

export const appRouter = createBrowserRouter([
    {
        path: PATHS.autorization,
        element: <Autorization/>,
    },
    {
        path: PATHS.welcome,
        element: <Welcome/>
    },
    {
        path: PATHS.finishSetup,
        element: <FinishSetup/>
    },
    {
        path: PATHS.profile,
        element: <Profile/>
    },
    {
        path: PATHS.addChannel,
        element: <AddChannel/>
    },
    {
        path: PATHS.digestPage,
        element: <DigestPage/>
    },
    {
        path: PATHS.digestTimeEditPage,
        element: <DigestTimeEditPage/>
    },
    {
        path: PATHS.error,
        element: <ErrorPage error={Error("Страница не найдена")}/>
    }
]);