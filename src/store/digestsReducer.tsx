export type DigestType = {
	id: string
	name: string
	emoji: string
	createdAt: string
	channelsUpdatedAt: string
	timeInterval: string
	nextAt: string
	receptionTime: string
	userId: string
}

export const digestsReducer = (
	state: DigestType[] = [],
	action: DigestsAT
): DigestType[] => {
	switch (action.type) {
		case 'SET-DIGESTS':
			return [...action.payload.digests]
		case 'ADD-DIGEST':
			return [...state, action.payload.digest]
		case 'UPDATE-DIGEST':
			return [
				...state.map(item =>
					item.id === action.payload.digest.id
						? {
								...action.payload.digest,
						  }
						: item
				),
			]
		case 'DELETE-DIGEST':
			return [...state.filter(item => item.id !== action.payload.id)]
		default:
			return state
	}
}

export const setDigestsAC = (digests: DigestType[]) => {
	return { type: 'SET-DIGESTS', payload: { digests } } as const
}

export const addDigestAC = (digest: DigestType) => {
	return { type: 'ADD-DIGEST', payload: { digest } } as const
}

export const updateDigestAC = (digest: DigestType) => {
	return { type: 'UPDATE-DIGEST', payload: { digest } } as const
}

export const deleteDigestAC = (id: string) => {
	return { type: 'DELETE-DIGEST', payload: { id } } as const
}

export type SetDigestsAT = ReturnType<typeof setDigestsAC>

export type AddDigestAT = ReturnType<typeof addDigestAC>

export type UpdateDigestAT = ReturnType<typeof updateDigestAC>

export type DeleteDigestAT = ReturnType<typeof deleteDigestAC>

type DigestsAT = AddDigestAT | SetDigestsAT | UpdateDigestAT | DeleteDigestAT
