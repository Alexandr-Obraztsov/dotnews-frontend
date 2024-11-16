import { Grid2 } from '@mui/material'
import Lottie from 'lottie-react'
import { useNavigate } from 'react-router-dom'
import emoji from '../../../assets/emoji/Floating Hearts.json'
import { tg } from '../../../utils/tg'
import { Body1 } from '../../styled/Body1'
import { Header } from '../../styled/Header'
import { StyledButton } from '../../styled/StyledButton'

export const FinishSetup = () => {
	const navigate = useNavigate()

	tg.BackButton.show()
	tg.BackButton.onClick(() => {
		navigate('/topics')
	})

	tg.MainButton.hide()

	const onSubmit = () => {
		navigate('/profile')
	}

	return (
		<>
			<Grid2
				container
				direction={'column'}
				justifyContent={'center'}
				alignItems={'center'}
				height={'100vh'}
			>
				<Lottie
					animationData={emoji}
					loop={true}
					style={{ width: 110, height: 110, backgroundColor: 'transparent' }}
				/>

				<Header marginBlockEnd={'0'}>Поздравляем!</Header>

				<Body1
					marginBlockStart={'5px'}
					paddingX={'70px'}
					color={'text.secondary'}
				>
					Теперь вы получаете новости.
				</Body1>
			</Grid2>

			<StyledButton
				variant={'contained'}
				size={'large'}
				sx={{
					position: 'absolute',
					bottom: '50px',
					left: '50%',
					transform: 'translateX(-50%)',
					zIndex: 2,
				}}
				onClick={onSubmit}
			>
				Давай начнем!
			</StyledButton>
		</>
	)
}
