import styled from '@emotion/styled'
import { TextField } from '@mui/material'
import { hexToRgba } from 'utils/hexToRgba'
import { theme } from 'utils/tg'

export const StyledInput = styled(TextField)({
	[`&.MuiTextField-root`]: {
		flexGrow: 1,
		width: '100%',
		background: hexToRgba(theme.hint_color!, 0.2),
		border: 'none',
		outline: 'none',
		borderRadius: '50px',
		letterSpacing: '0.4px',
		color: theme.text_color,
		fontFamily: 'Roboto, sans-serif',
	},

	'& input': {
		fontWeight: 300,
		fontSize: '14px',
		lineHeight: '14px',
		padding: '8px 16px',
	},

	'& fieldset': {
		display: 'none',
	},

	'&::placeholder': {
		color: theme.hint_color,
	},
})
