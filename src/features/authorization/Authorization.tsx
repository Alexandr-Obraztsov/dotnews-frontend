import { api } from 'app/api'
import { useAppDispatch } from 'app/store/hooks'
import { getUserTC } from 'app/store/userReducer'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { tg } from 'utils/tg'
import { Loading } from '../loading/Loading'

export const Authorization = () => {
	const navigate = useNavigate()

	const dispatch = useAppDispatch()

	const [description, setDescription] = useState<string>('')

	useEffect(() => {
		const urlId = window.Telegram.WebApp.initDataUnsafe.start_param
		window.Telegram.WebApp.setHeaderColor('secondary_bg_color')
		if (urlId) {
			api.getUrl(urlId, tg.initDataUnsafe.user!.id).then(data => {
				setDescription(data.url)
				setTimeout(() => {
					window.Telegram.WebApp.openLink(data.url)
					setDescription('Переходим по ссылке...')
				}, 1000)
			})
		} else dispatch(getUserTC(navigate))
	}, [dispatch, navigate])

	return <Loading description={description} />
}
