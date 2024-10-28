import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {CssBaseline} from "@mui/material";
import {ThemeProvider} from "@emotion/react";
import {globalTheme} from "./globalTheme";
import {Provider} from "react-redux";
import {store} from "./store/store";
import {RouterProvider} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import {appRouter} from "./appRouter";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);


root.render(
    <ThemeProvider theme={globalTheme}>
        <CssBaseline>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <RouterProvider router={appRouter} />
                    </LocalizationProvider>
                </QueryClientProvider>
            </Provider>
        </CssBaseline>
    </ThemeProvider>
);

reportWebVitals();
