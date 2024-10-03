import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createTheme, CssBaseline} from "@mui/material";
import {ThemeProvider} from "@emotion/react";

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
})

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <App/>
    </ThemeProvider>
);

reportWebVitals();
