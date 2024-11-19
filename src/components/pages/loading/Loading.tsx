import { CircularProgress, Grid2, Typography } from '@mui/material'
import * as React from 'react'

type LoadingPropsType = {
	description?: string
}

export const Loading: React.FC<LoadingPropsType> = ({ description }) => {
	return (
		<Grid2
			container
			direction={'column'}
			height={'30vh'}
			justifyContent={'center'}
			alignItems={'center'}
			gap={'20px'}
		>
			<CircularProgress color='primary' />
			{description && (
				<Typography width={'50%'} textAlign={'center'} fontStyle={'italic'}>
					{description}
				</Typography>
			)}
		</Grid2>
	)
}
