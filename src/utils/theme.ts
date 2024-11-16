import { createTheme } from '@mui/material'
import { tg, theme } from './tg'

export const globalTheme = createTheme({
	palette: {
		mode: tg.colorScheme,

		background: {
			default: theme.secondary_bg_color,
			paper: theme.bg_color,
		},

		text: {
			primary: theme.text_color,
			secondary: theme.subtitle_text_color,
		},

		primary: {
			main: theme.button_color!,
			contrastText: theme.accent_text_color!,
		},
	},

	typography: {
		fontFamily: 'Roboto, sans-serif',
	},

	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					backgroundColor: theme.button_color,
					color: theme.button_text_color,
				},
			},
		},

		MuiChip: {
			styleOverrides: {
				root: {
					color: theme.button_text_color,
				},
			},
		},

		MuiDivider: {
			styleOverrides: {
				root: {
					borderColor: theme.section_separator_color,
				},
			},
		},

		MuiCssBaseline: {
			styleOverrides: {
				a: {
					color: theme.link_color,
				},
			},
		},

		MuiDialogContent: {
			styleOverrides: {
				root: {
					backgroundColor: theme.bg_color,
					'.MuiClock-clock': {
						backgroundColor: theme.secondary_bg_color,
					},
					'.MuiTimePickerToolbar-hourMinuteLabel button': {
						backgroundColor: theme.secondary_bg_color,
						padding: '5px',
					},
					'.MuiPickersArrowSwitcher-root': {
						display: 'none',
					},
					'.MuiTypography-root': {
						content: "'Выберите время'",
					},
				},
			},
		},
	},
})
