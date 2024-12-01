export const tg = window.Telegram.WebApp.initDataUnsafe.user
	? window.Telegram.WebApp
	: {
			initDataUnsafe: {
				user: {
					id: 1989065177,
					first_name: 'Test',
					last_name: 'Test',
					username: 'obraztsov_alexandr',
					photo_url: '',
				},
			},
			colorScheme: 'light' as const,
			themeParams: {
				bg_color: '#17212b',
				button_color: '#5287c0',
				button_text_color: '#ffffff',
				link_color: '#699dc5',
				section_separator_color: '#111921',
				secondary_bg_color: '#232e3c',
				subtitle_text_color: '#6f8398',
				text_color: '#f3f3f3',
				accent_text_color: '#5287c0',
				destructive_text_color: '#ff0000',
				hint_color: '#cccccc',
				header_bg_color: '#ffffff',
				bottom_bar_bg_color: '#111111',
				section_bg_color: '#333333',
				section_header_text_color: '#444444',
			},
			BackButton: {
				show: () => {},
				hide: () => {},
				onClick: (param: any) => {},
				setParams: (param: any) => {},
			},
			MainButton: {
				show: () => {},
				hide: () => {},
				onClick: (param: any) => {},
				setParams: (param: any) => {},
			},

			close: () => {},
			ready: () => {},
	  }

export const theme = tg.themeParams

export const userTG = tg.initDataUnsafe.user
