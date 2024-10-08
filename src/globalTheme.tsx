import {createTheme} from "@mui/material";

const randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const tg = window.Telegram.WebApp.initDataUnsafe.user ?
    window.Telegram.WebApp :
    {
        initDataUnsafe: {
            user: {
                id: randomInt(100000, 999999),
                first_name: "Test",
                last_name: "Test",
                username: "test",
                photo_url: ""
            }
        },
        colorScheme: "light" as const,
        themeParams: {
            bg_color: "#17212b",
            button_color: "#5287c0",
            button_text_color: "#ffffff",
            link_color: "#699dc5",
            section_separator_color: "#E6E6E6",
            secondary_bg_color: "#232e3c",
            subtitle_text_color: "#6f8398",
            text_color: "#f3f3f3",
        },
        BackButton: {
            show: () => {
            },
            hide: () => {
            },
            onClick: (param: any) => {
            },
            setParams: (param: any) => {

            }
        },
        MainButton: {
            show: () => {
            },
            hide: () => {
            },
            onClick: (param: any) => {
            },
            setParams: (param: any) => {

            }
        }
    }

export const globalTheme = createTheme({
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
