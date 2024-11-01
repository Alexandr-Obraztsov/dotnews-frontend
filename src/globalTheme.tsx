import {createTheme} from "@mui/material";


export const tg = window.Telegram.WebApp.initDataUnsafe.user ?
    window.Telegram.WebApp :
    {
        initDataUnsafe: {
            user: {
                id: 1234,
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
            section_separator_color: "#111921",
            secondary_bg_color: "#232e3c",
            subtitle_text_color: "#6f8398",
            text_color: "#f3f3f3",
            accent_text_color: "#5287c0",
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
            default: tg.themeParams.secondary_bg_color,
            paper: tg.themeParams.bg_color,
        },

        text: {
            primary: tg.themeParams.text_color,
            secondary: tg.themeParams.subtitle_text_color,
        },


        primary: {
            main: tg.themeParams.button_color!,
            contrastText: tg.themeParams.accent_text_color!,
        },
    },

    typography: {
        fontFamily: 'Roboto, sans-serif',
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

        MuiChip: {
            styleOverrides: {
                root: {
                    color: tg.themeParams.button_text_color
                }
            }
        },

        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: tg.themeParams.section_separator_color,
                }
            }
        },

        MuiCssBaseline: {
            styleOverrides: {
                a: {
                    color: tg.themeParams.link_color
                }
            }
        },

        MuiDialogContent: {
            styleOverrides: {
                root: {
                    backgroundColor: tg.themeParams.bg_color,
                    ".MuiClock-clock": {
                        backgroundColor: tg.themeParams.secondary_bg_color
                    },
                    ".MuiTimePickerToolbar-hourMinuteLabel button": {
                        backgroundColor: tg.themeParams.secondary_bg_color,
                        padding: "5px"
                    },
                    ".MuiPickersArrowSwitcher-root": {
                        display: "none"
                    },
                    ".MuiTypography-root": {
                        content: "'Выберите время'"
                    }
                }
            }
        }
    }
})
