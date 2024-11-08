import * as React from 'react';
import {QueryClient, QueryClientProvider} from "react-query";
import {useEffect} from "react";
import {RouterProvider} from "react-router-dom";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {globalTheme} from "../globalTheme";
import {Provider} from "react-redux";
import {store} from "../store/store";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {appRouter, ROUTES} from "../appRouter";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

const queryClient = new QueryClient()

export const App : React.FC = () => {

    return (<ThemeProvider theme={globalTheme}>
        <CssBaseline>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <RouterProvider router={appRouter}/>
                    </LocalizationProvider>
                </QueryClientProvider>
            </Provider>
        </CssBaseline>
    </ThemeProvider>)
};