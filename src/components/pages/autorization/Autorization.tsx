import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { api } from '../../../api/api'
import { PATHS } from '../../../app/appRouter'
import { tg } from '../../../globalTheme'
import { setDigestChannelsAC } from '../../../store/channelsReducer'
import { useAppDispatch } from '../../../store/hooks'
import { setUserAC, setUserDigestsAC } from '../../../store/userReducer'
import { Loading } from '../loading/Loading'

export const Autorization = () => {
	const navigate = useNavigate()

	const [loadingDescription, setLoadingDescription] = useState<string>('')

	const [urlId, setUrlId] = useSearchParams('')

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
						dispatch(setUserDigestsAC(digests))
						const promises = digests.map(digest =>
							api.getDigestChannels(tgId, digest.id).then(channels => {
								dispatch(setDigestChannelsAC({ digestId: digest.id, channels }))
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
		loadUser()
	}, [loadUser])

	return (
		<>
			{urlId.get('urlId')}
			<Loading description={loadingDescription} />
		</>
	)
}
