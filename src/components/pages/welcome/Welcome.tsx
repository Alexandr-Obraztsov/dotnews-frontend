import { Grid2 } from '@mui/material'
import Lottie from 'lottie-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../../api/api'
import { PATHS } from '../../../app/PATHS'
import hello_emoji from '../../../assets/emoji/Waving Hand.json'
import { useAppDispatch } from '../../../store/hooks'
import { setUserAC } from '../../../store/userReducer'
import { tg } from '../../../utils/tg'
import { Body1 } from '../../styled/Body1'
import { Header } from '../../styled/Header'
import { StyledButton } from '../../styled/StyledButton'
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
				navigate(PATHS.profile)
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

					<Header marginBlockStart={'10px'}>Привет!</Header>

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
