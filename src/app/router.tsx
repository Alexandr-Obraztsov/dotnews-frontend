import { createBrowserRouter } from 'react-router-dom'
import { AddChannel } from '../components/pages/addChannel/AddChannel'
import { Authorization } from '../components/pages/authorization/Authorization'
import { DigestPage } from '../components/pages/digestPage/DigestPage'
import { DigestSettingsPage } from '../components/pages/digestSettingsPage/DigestSettingsPage'
import { ErrorPage } from '../components/pages/errorPage/ErrorPage'
import { FinishSetup } from '../components/pages/finishSetup/FinishSetup'
import { Profile } from '../components/pages/profile/Profile'
import { Welcome } from '../components/pages/welcome/Welcome'
import { PATHS } from './PATHS'

export const router = createBrowserRouter([
	{
		path: PATHS.authorization,
		element: <Authorization />,
	},
	{
		path: PATHS.welcome,
		element: <Welcome />,
	},
	{
		path: PATHS.finishSetup,
		element: <FinishSetup />,
	},
	{
		path: PATHS.profile,
		element: <Profile />,
	},
	{
		path: PATHS.addChannel,
		element: <AddChannel />,
	},
	{
		path: PATHS.digestPage,
		element: <DigestPage />,
	},
	{
		path: PATHS.digestTimeEditPage,
		element: <DigestSettingsPage />,
	},
	{
		path: PATHS.error,
		element: <ErrorPage error={Error('Страница не найдена')} />,
	},
])
