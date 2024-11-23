import { AddChannelPage } from 'features/addChannelPage/AddChannelPage'
import { Authorization } from 'features/authorization/Authorization'
import { DigestPage } from 'features/digestPage/DigestPage'
import { DigestSettingsPage } from 'features/digestSettingsPage/DigestSettingsPage'
import { ErrorPage } from 'features/errorPage/ErrorPage'
import { Profile } from 'features/profile/Profile'
import { Welcome } from 'features/welcome/Welcome'
import { createBrowserRouter } from 'react-router-dom'
import { PATHS } from './PATHS'

export const router = createBrowserRouter([
	{
		path: PATHS.authorizationPage,
		element: <Authorization />,
	},
	{
		path: PATHS.welcomePage,
		element: <Welcome />,
	},
	{
		path: PATHS.profilePage,
		element: <Profile />,
	},
	{
		path: PATHS.addChannel,
		element: <AddChannelPage />,
	},
	{
		path: PATHS.digestPage,
		element: <DigestPage />,
	},
	{
		path: PATHS.digestSettingsPage,
		element: <DigestSettingsPage />,
	},
	{
		path: PATHS.errorPage,
		element: <ErrorPage error={Error('Страница не найдена')} />,
	},
])
