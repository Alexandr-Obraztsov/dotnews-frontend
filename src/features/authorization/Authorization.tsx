import { api } from 'app/api'
import { useAppDispatch } from 'app/store/hooks'
import { getUserTC } from 'app/store/userReducer'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { tg } from 'utils/tg'
import { Loading } from '../loading/Loading'

export const Authorization = () => {
	const navigate = useNavigate()

	const dispatch = useAppDispatch()

	useEffect(() => {
		const urlId = window.Telegram.WebApp.initDataUnsafe.start_param
		if (urlId) {
			api.getUrl(urlId, tg.initDataUnsafe.user!.id).then(data => {
				window.Telegram.WebApp.openTelegramLink(data.url)
				window.Telegram.WebApp.close()
			})
		} else dispatch(getUserTC(navigate))
	}, [dispatch, navigate])

	return <Loading />
}
