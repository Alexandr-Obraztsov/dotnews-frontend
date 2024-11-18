import axios from 'axios'
import { ChannelType } from '../store/channelsReducer'
import { DigestType } from '../store/digestsReducer'
import { UserType } from '../store/userReducer'

const server_url = 'https://dotnewsbot.ru/back_api/api'

export const api = {
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

	getAllChannels: (): Promise<ChannelType[]> => {
		return axios.get(`${server_url}/channels`).then(res => res.data)
	},

	getChannel: (telegramName: string): Promise<ChannelType> => {
		return axios
			.get(`${server_url}/channels/${telegramName}`)
			.then(res => res.data)
	},

	addChannel: (telegramName: string) => {
		return axios
			.post(`${server_url}/channels`, {
				telegramName,
			})
			.then(res => res.data)
	},

	getDigests: (telegramId: number): Promise<DigestType[]> => {
		return axios
			.get(`${server_url}/users/${telegramId}/digests`)
			.then(res => res.data)
	},

	createDigest: async (
		telegramId: number,
		payload: {
			name: string
			timeInterval: string
			receptionTime: string
			emoji: string
		}
	) => {
		return axios
			.post(`${server_url}/users/${telegramId}/digests`, payload)
			.then(res => res.data)
	},

	getDigestChannels: (telegramId: number, digestId: string) => {
		return axios
			.get(`${server_url}/users/${telegramId}/digests/${digestId}/channels`)
			.then(res => res.data)
	},

	addDigestChannel: (payload: {
		telegramId: number
		digestId: string
		name: string
	}) => {
		return axios
			.post(
				`${server_url}/users/${payload.telegramId}/digests/${payload.digestId}/channels`,
				{
					name: payload.name,
				}
			)
			.then(res => res.data)
	},

	deleteUserDigest: (payload: { userTelegramId: number; digestId: string }) => {
		return axios
			.delete(
				`${server_url}/users/${payload.userTelegramId}/digests/${payload.digestId}`
			)
			.then(res => res.data)
	},

	deleteDigestChannel: (payload: {
		telegramId: number
		digestId: string
		channelId: string
	}) => {
		return axios
			.delete(
				`${server_url}/users/${payload.telegramId}/digests/${payload.digestId}/channels/${payload.channelId}`
			)
			.then(res => res.data)
	},

	updateDigest: (telegramId: number, digest: DigestType) => {
		return axios.put(`${server_url}/users/${telegramId}/digests/${digest.id}`, {
			name: digest.name,
			timeInterval: digest.timeInterval,
			receptionTime: digest.receptionTime,
			emoji: digest.emoji,
		})
	},

	getUrl: (urlId: string, usertelegramId: number) => {
		return axios
			.get(`${server_url}/urls/${urlId}?usertelegramId=${usertelegramId}`)
			.then(res => res.data)
	},
}
