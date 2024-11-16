import axios from 'axios'
import { server_url } from '../config'
import { UserType } from '../store/userReducer'

export const userAPI = {
	getAllUsers: () => {
		return axios.get(`${server_url}/users`).then(res => res.data)
	},

	setUser: (payload: {
		telegramId: number
		telegramName: string
	}): Promise<UserType> => {
		return axios
			.post(`${server_url}/users`, {
				...payload,
				timeZoneId: Intl.DateTimeFormat().resolvedOptions().timeZone,
			})
			.then(res => res.data)
	},

	getUser: (telegramId: number): Promise<UserType> => {
		return axios.get(`${server_url}/users/${telegramId}`).then(res => res.data)
	},
}
