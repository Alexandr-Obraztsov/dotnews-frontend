import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createTheme, CssBaseline} from "@mui/material";
import {ThemeProvider} from "@emotion/react";

const tg = window.Telegram.WebApp;

export const theme = createTheme({
    palette: {
        mode: tg.colorScheme,

        background: {
            default: tg.themeParams.bg_color,
            paper: tg.themeParams.secondary_bg_color,
        },

        text: {
            primary: tg.themeParams.text_color,
            secondary: tg.themeParams.subtitle_text_color,
        },

        primary: {
            main: tg.themeParams.button_color!,

        },
    },

    typography: {
        fontFamily: 'Rubik, Roboto, sans-serif',
    },


    components: {

        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: tg.themeParams.button_color,
                    color: tg.themeParams.button_text_color
                }
            }
        },

        MuiDivider: {
          styleOverrides: {
            root: {
              backgroundColor: tg.themeParams.section_separator_color
            }
          }
        },

        MuiCssBaseline: {
            styleOverrides: {
                a: {
                    color: tg.themeParams.link_color
                }
            }
        }
    }
})

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <ThemeProvider theme={theme}>
        <CssBaseline>
            <App/>
        </CssBaseline>
    </ThemeProvider>
);

reportWebVitals();
