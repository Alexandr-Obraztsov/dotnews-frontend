import { CircularProgress, Grid2, Typography } from '@mui/material'

export const Loading = ({ description }: { description?: string }) => {
	return (
		<Grid2
			container
			direction={'column'}
			height={'100vh'}
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
