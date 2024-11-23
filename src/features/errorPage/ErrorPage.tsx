import { Grid2, Typography } from '@mui/material'
import Comp1 from 'assets/emoji/Comp 1.json'
import { Body1 } from 'common/components/styled/Body1'
import Lottie from 'lottie-react'
import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { tg } from 'utils/tg'

type ErrorPagePropsType = {
	error: Error
}

export const ErrorPage: React.FC<ErrorPagePropsType> = ({ error }) => {
	const navigate = useNavigate()

	tg.BackButton.show()
	tg.BackButton.onClick(() => {
		navigate(-1)
	})

	return (
		<Grid2
			container
			direction={'column'}
			justifyContent={'space-between'}
			alignItems={'center'}
			height={'100vh'}
			marginX={'20px'}
		>
			<Grid2
				container
				direction={'column'}
				justifyContent={'center'}
				alignItems={'center'}
				flexGrow={1}
			>
				<Lottie
					animationData={Comp1}
					loop={true}
					style={{ width: 100, height: 100, backgroundColor: 'transparent' }}
				/>

				<Typography
					marginBlockStart={'10px'}
					marginInline={'20px'}
					textAlign={'center'}
				>
					Что-то пошло не так!
				</Typography>

				<Body1
					marginBlockStart={'10px'}
					paddingX={'40px'}
					color={'text.secondary'}
				>
					{error.message}
					<br />
					Пожалуйста, попробуйте еще раз...
				</Body1>
			</Grid2>
		</Grid2>
	)
}
