import AddIcon from '@mui/icons-material/Add'
import { Grid2, IconButton } from '@mui/material'
import { addDigestTC } from 'app/store/digestsReducer'
import { useAppDispatch, useAppSelector } from 'app/store/hooks'
import { Header } from 'common/components'
import * as React from 'react'
import { ChangeEvent, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { theme } from 'utils/tg'
import { DigestList } from './DigestList'
import { StyledInput } from './StyledInput'

export const Profile: React.FC = () => {
	const digests = useAppSelector(state => state.digests)

	const dispatch = useAppDispatch()

	const navigate = useNavigate()

	const [inputText, setInputText] = useState<string>('')

	const handleInputChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			setInputText(event.target.value)
		},
		[setInputText]
	)

	const handleClickAdd = useCallback(() => {
		dispatch(addDigestTC(navigate))
	}, [dispatch, navigate])

	const renderedDigests = digests.filter(digest =>
		digest.name.toLowerCase().includes(inputText.toLowerCase())
	)

	return (
		<>
			<Grid2
				container
				direction={'column'}
				wrap={'nowrap'}
				paddingBottom={'10px'}
				minHeight={'100vh'}
				bgcolor={theme.secondary_bg_color}
			>
				<Header
					title={
						<StyledInput
							autoComplete='off'
							placeholder='Поиск'
							value={inputText}
							onChange={handleInputChange}
						/>
					}
					endSlot={
						<IconButton size='small' color='inherit' onClick={handleClickAdd}>
							<AddIcon color='inherit' />
						</IconButton>
					}
				/>

				<DigestList digests={renderedDigests} />
			</Grid2>
		</>
	)
}
