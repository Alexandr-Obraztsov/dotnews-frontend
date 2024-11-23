import { DigestType } from 'app/store/digestsReducer'
import dayjs from 'dayjs'
import { daysOptions } from 'features/digestSettingsPage/DigestSettingsPage'

export const getDigestTime = (digest: DigestType) => {
	return `${
		daysOptions[
			+dayjs(digest.timeInterval, 'D.HH:mm:ss').format(
				'D'
			) as keyof typeof daysOptions
		]
	} в ${dayjs(digest.receptionTime, 'HH:mm:ss').format('HH:mm')}`
}
