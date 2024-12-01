import AddIcon from '@mui/icons-material/Add'
import { Box, Grid2, Typography } from '@mui/material'
import { api } from 'app/api'
import { PATHS } from 'app/PATHS'
import { addDigestAC } from 'app/store/digestsReducer'
import { useAppDispatch, useAppSelector } from 'app/store/hooks'
import * as React from 'react'
import { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { tg } from 'utils/tg'
import { ErrorPage } from '../errorPage/ErrorPage'
import { Loading } from '../loading/Loading'

export const Main: React.FC = memo(() => {
	const [error, setError] = useState(null)

	const [isLoading, setIsLoading] = useState(false)

	const user = useAppSelector(state => state.user)

	const userTg = tg.initDataUnsafe.user!

	const navigate = useNavigate()

	const digests = useAppSelector(state => state.digests)

	const dispatch = useAppDispatch()

	const onDigestAddClick = () => {
		setIsLoading(true)
		let digest_num = 1
		while (digests.map(dg => dg.name).includes(`Новый Дайджест ${digest_num}`))
			digest_num++
		api
			.createDigest(user.telegramId, {
				name: `Новый Дайджест ${digest_num}`,
				timeInterval: '1.00:00:00',
				receptionTime: '09:00:00',
				emoji: 'f09f928c',
			})
			.then(digest => {
				navigate(PATHS.digestPage.replace(':digestId', digest.id))
				dispatch(addDigestAC(digest))
				setIsLoading(false)
			})
			.catch(er => setError(er))
	}

	if (error) return <ErrorPage error={error} />

	if (isLoading) return <Loading />

	return (
		<Box bgcolor={'background.paper'}>
			<Grid2 container direction={'column'} alignItems={'center'}>
				{userTg.photo_url ? (
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
