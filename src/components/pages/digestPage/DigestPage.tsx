import { Grid2 } from '@mui/material'
import * as React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PATHS } from '../../../app/PATHS'
import { tg } from '../../../utils/tg'
import { ChannelList } from './ChannelList'
import { Main } from './Main'

export const DigestPage: React.FC = () => {
	const navigate = useNavigate()

	useEffect(() => {
		tg.BackButton.onClick(() => navigate(PATHS.profile))
		tg.BackButton.show()

		tg.MainButton.hide()
	}, [navigate])

	return (
		<Grid2
			container
			direction={'column'}
			wrap={'nowrap'}
			paddingBottom={'10px'}
			gap={'10px'}
		>
			<Main />

			<ChannelList />
		</Grid2>
	)
}
