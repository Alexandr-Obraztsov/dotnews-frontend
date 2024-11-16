import { Grid2 } from '@mui/material'
import * as React from 'react'
import { useEffect } from 'react'
import { tg } from '../../../utils/tg'
import { DigestList } from './DigestList'
import { Main } from './Main'

export const Profile: React.FC = () => {
	useEffect(() => {
		tg.BackButton.hide()
		tg.MainButton.hide()
	}, [])

	return (
		<>
			<Grid2
				container
				direction={'column'}
				wrap={'nowrap'}
				paddingBottom={'10px'}
				gap={'10px'}
			>
				<Main />

				<DigestList />
			</Grid2>
		</>
	)
}
