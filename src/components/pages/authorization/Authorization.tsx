import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../../api/api'
import { PATHS } from '../../../app/PATHS'
import { tg } from '../../../globalTheme'
import { setChannelsAC } from '../../../store/channelsReducer'
import { setDigestsAC } from '../../../store/digestsReducer'
import { useAppDispatch } from '../../../store/hooks'
import { setUserAC } from '../../../store/userReducer'
import { Loading } from '../loading/Loading'

export const Authorization = () => {
	const navigate = useNavigate()

	const [loadingDescription, setLoadingDescription] = useState<string>('')

	const dispatch = useAppDispatch()

	const loadUser = useCallback(() => {
		try {
			const tgId = tg.initDataUnsafe.user!.id
			setLoadingDescription('Распознаем Вас...')
			api
				.getUser(tgId)
				.then(data => {
					dispatch(setUserAC(data))
					console.log(data)
					setLoadingDescription('Получаем Ваши дайджесты...')
					api.getDigests(tgId).then(digests => {
						dispatch(setDigestsAC(digests))
						const promises = digests.map(digest =>
							api.getDigestChannels(tgId, digest.id).then(channels => {
								dispatch(setChannelsAC({ digestId: digest.id, channels }))
							})
						)
						Promise.all(promises).then(res => {
							navigate(PATHS.profile)
						})
					})
				})
				.catch(e => navigate(PATHS.welcome))
		} catch (e: any) {
			navigate(PATHS.welcome)
		}
	}, [dispatch, navigate])

	useEffect(() => {
		const urlId = window.Telegram.WebApp.initDataUnsafe.start_param
		if (urlId) {
		} else loadUser()
	}, [loadUser])

	return <Loading description={loadingDescription} />
}
