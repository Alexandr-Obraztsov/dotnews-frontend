import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {CssBaseline} from "@mui/material";
import {ThemeProvider} from "@emotion/react";
import {globalTheme} from "./globalTheme";
import {Provider} from "react-redux";
import {store} from "./state/store";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Autorization} from "./components/pages/autorization/Autorization";
import {ErrorPage} from "./components/pages/errorPage/ErrorPage";
import {Welcome} from "./components/pages/welcome/Welcome";
import {FinishSetup} from "./components/pages/finishSetup/FinishSetup";
import {Profile} from "./components/pages/profile/Profile";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

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


root.render(
    <ThemeProvider theme={globalTheme}>
        <CssBaseline>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </CssBaseline>
    </ThemeProvider>
);

reportWebVitals();
