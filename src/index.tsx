import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {CssBaseline} from "@mui/material";
import {ThemeProvider} from "@emotion/react";
import {globalTheme} from "./globalTheme";
import {Provider} from "react-redux";
import {store} from "./state/store";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <ThemeProvider theme={globalTheme}>
        <CssBaseline>
            <Provider store={store}>
                <App/>
            </Provider>
        </CssBaseline>
    </ThemeProvider>
);

reportWebVitals();
