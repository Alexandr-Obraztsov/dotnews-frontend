import { CssBaseline, ThemeProvider } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import * as React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { store } from '../store/store'
import { globalTheme } from '../utils/theme'
import { router } from './router'

const queryClient = new QueryClient()

export const App: React.FC = () => {
	return (
		<ThemeProvider theme={globalTheme}>
			<CssBaseline>
				<Provider store={store}>
					<QueryClientProvider client={queryClient}>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<RouterProvider router={router} />
						</LocalizationProvider>
					</QueryClientProvider>
				</Provider>
			</CssBaseline>
		</ThemeProvider>
	)
}
