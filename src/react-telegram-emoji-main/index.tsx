import { emoji_data } from './emoji_data'

type ReactTelegramEmojiProps = {
	src?: string
	alt?: string
	width?: number
}

export const ReactTelegramEmoji = (props: ReactTelegramEmojiProps) => {
	const src =
		props.src ||
		Object.keys(emoji_data)[
			Math.floor(Math.random() * Object.keys(emoji_data).length)
		]

	return (
		<img
			src={emoji_data[src]}
			alt={props.alt || 'input'}
			width={props.width || '10px'}
		/>
	)
}

export default ReactTelegramEmoji
