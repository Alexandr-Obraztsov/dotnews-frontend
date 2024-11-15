import AddIcon from '@mui/icons-material/Add'
import { Box, Grid2, Typography } from '@mui/material'
import * as React from 'react'
import { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../../api/api'
import { PATHS } from '../../../app/appRouter'
import { tg } from '../../../globalTheme'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { addUserDigestAC } from '../../../store/userReducer'
import { ErrorPage } from '../errorPage/ErrorPage'

export const Main: React.FC = memo(() => {
	const [error, setError] = useState(null)

	const user = useAppSelector(state => state.user.user)

	const userTg = tg.initDataUnsafe.user!

	const navigate = useNavigate()

	const digests = useAppSelector(state => state.user).digests

	const dispatch = useAppDispatch()

	const onDigestAddClick = () => {
		let digest_num = 1
		while (digests.map(dg => dg.name).includes(`Новый Дайджест ${digest_num}`))
			digest_num++
		api
			.createDigest(user.telegramId, {
				name: `Новый Дайджест ${digest_num}`,
				timeInterval: '1.00:00:00',
				receptionTime: '09:00:00',
				emoji: 'hourglass',
			})
			.then(digest => {
				navigate(PATHS.digestPage.replace(':digestId', digest.id))
				dispatch(addUserDigestAC(digest))
			})
			.catch(er => setError(er))
	}

	if (error) return <ErrorPage error={error} />

	return (
		<Box bgcolor={'background.paper'}>
			<Grid2 container direction={'column'} alignItems={'center'}>
				{user.imageUrl ? (
					<Box
						width={'100px'}
						height={'100px'}
						borderRadius={'50%'}
						marginTop={'15px'}
						sx={{
							background: 'linear-gradient(180deg, #D9D9D9 0%, #737373 100%)',
						}}
					></Box>
				) : (
					<img
						src={user.imageUrl}
						alt='avatar'
						style={{
							width: 100,
							height: 100,
							borderRadius: 50,
							position: 'absolute',
							top: 15,
							left: 15,
						}}
					/>
				)}

				<Typography
					fontSize={'20px'}
					fontWeight={400}
					marginTop={'10px'}
					lineHeight={'normal'}
				>
					{userTg.first_name} {userTg.last_name}
				</Typography>

				<Typography
					color={'text.secondary'}
					fontSize={'13px'}
					fontWeight={400}
					marginTop={'4px'}
					lineHeight={'normal'}
				>
					@{userTg.username || 'unknown'}
				</Typography>

				<Grid2
					container
					width={'100%'}
					justifyContent={'end'}
					padding={'17.5px 20px 12.5px'}
					color={tg.themeParams.link_color}
				>
					<Grid2
						container
						onClick={onDigestAddClick}
						alignItems={'center'}
						sx={{
							cursor: 'pointer',
						}}
					>
						<Typography
							fontSize={'13px'}
							fontWeight={400}
							lineHeight={'normal'}
						>
							Создать дайджест
						</Typography>
						<AddIcon fontSize={'small'} color={'inherit'} />
					</Grid2>
				</Grid2>
			</Grid2>
		</Box>
	)
})
