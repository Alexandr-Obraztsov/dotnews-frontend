import { Grid2, Typography } from '@mui/material'
import { api } from 'app/api'
import { PATHS } from 'app/PATHS'
import { useAppDispatch } from 'app/store/hooks'
import { setUserAC } from 'app/store/userReducer'
import hello_emoji from 'assets/emoji/Waving Hand.json'
import { Body1 } from 'common/components/styled/Body1'
import { StyledButton } from 'common/components/styled/StyledButton'
import Lottie from 'lottie-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { tg } from 'utils/tg'
import { ErrorPage } from '../errorPage/ErrorPage'

export const Welcome = () => {
	const [error, setError] = useState<Error | null>(null)

	const navigate = useNavigate()

	const user = tg.initDataUnsafe.user!
	const dispatch = useAppDispatch()

	tg.BackButton.hide()

	const onSubmit = () => {
		api
			.setUser({ telegramId: user.id, telegramName: user.username! })
			.then(data => {
				dispatch(setUserAC(data))
				navigate(PATHS.profilePage)
			})
			.catch(e => setError(e))
	}

	if (error) return <ErrorPage error={error} />
	else
		return (
			<>
				<Grid2
					container
					height={'100vh'}
					direction={'column'}
					justifyContent={'center'}
					alignItems={'center'}
				>
					<Lottie
						animationData={hello_emoji}
						loop={true}
						style={{ width: 100, height: 100, backgroundColor: 'transparent' }}
					/>

					<Typography marginBlockStart={'10px'}>Привет!</Typography>

					<Body1
						marginBlockStart={'10px'}
						paddingX={'70px'}
						color={'text.secondary'}
					>
						Это твой персональный новостной агрегатор. Приступим!
					</Body1>
				</Grid2>

				<StyledButton onClick={onSubmit}>Давай начнем!</StyledButton>
			</>
		)
}
