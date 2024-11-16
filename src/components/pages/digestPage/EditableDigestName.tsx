import EditIcon from '@mui/icons-material/Edit'
import { TextField, Typography } from '@mui/material'
import * as React from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../../../api/api'
import { updateDigestAC } from '../../../store/digestsReducer'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { tg } from '../../../utils/tg'

const MAX_NAME_LENGTH = 25

export const EditableDigestName: React.FC = () => {
	const { digestId = '' } = useParams()

	const digests = useAppSelector(state => state.digests)

	const digest = digests.find(dg => dg.id === digestId)!

	const [isEdit, setIsEdit] = React.useState(false)
	const [name, setName] = React.useState(digest.name)
	const [error, setError] = React.useState('')

	const dispatch = useAppDispatch()

	const checkName = (name: string) => {
		if (digests.find(digest => digest.name === name.trim())) {
			setError('Такое имя уже существует')
		} else if (name.length > MAX_NAME_LENGTH) {
			setError('Название слишком длинное')
		} else if (name.trim().length < 3) {
			setError('Название слишком короткое')
		} else {
			setError('')
		}
	}

	const handleSave = () => {
		if (error) return
		const newName = name.trim()
		setIsEdit(false)
		const newDigest = { ...digest, name: newName }
		dispatch(updateDigestAC(newDigest))
		api.updateDigest(tg.initDataUnsafe.user!.id, newDigest)
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		if (value.length > MAX_NAME_LENGTH + 1) return
		checkName(value)
		setName(value)
	}

	const onKeyUpHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter') handleSave()
	}

	if (isEdit) {
		return (
			<TextField
				value={name}
				error={!!error}
				helperText={
					error ? error : 'Нажмите Enter или кликните, чтобы сохранить'
				}
				autoFocus={true}
				onKeyUp={onKeyUpHandler}
				onBlur={handleSave}
				onChange={handleChange}
				fullWidth={true}
				slotProps={{
					formHelperText: {
						sx: {
							textAlign: 'center',
						},
					},
				}}
				sx={{
					'& input': {
						width: '100%',
						height: 'min-content',
						textAlign: 'center',
						border: 'none',
						fontWeight: 450,
						lineHeight: 'normal',
						fontSize: '20px',
						padding: '0 20px',
					},
					'& fieldset': {
						margin: '0 40px',
						border: 'none',
						borderBottom: '1px solid black',
						borderRadius: 0,
						padding: 0,
					},
				}}
			/>
		)
	}
	return (
		<Typography
			fontWeight={450}
			lineHeight={'normal'}
			fontSize={'20px'}
			onClick={() => setIsEdit(true)}
			sx={{
				display: 'flex',
				alignItems: 'center',
				position: 'relative',
			}}
		>
			{digest.name}
			<EditIcon
				sx={{
					fontSize: '15px',
					color: tg.themeParams.subtitle_text_color,
					position: 'absolute',
					right: '-20px',
				}}
			/>
		</Typography>
	)
}
