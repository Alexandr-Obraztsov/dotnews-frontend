const server_url = "https://dotnewsbot.ru/back_api/api"

// channels
export const getAllChannelsAPI = async () => {
    console.log("Send request for get all channels");
    return fetch(`${server_url}/channels`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
}

export const getChannelAPI = async (telegramName: string) => {
    console.log(`Send request for get channel ${telegramName}`);
    return fetch(`${server_url}/channels/${telegramName}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const addChannelAPI = async (telegramName: string) => {
    console.log(`Send request for add channel ${telegramName}`);
    return fetch(`${server_url}/channels`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            telegramName
        })
    })
}


//users
export const getAllUsersAPI = async () => {
    console.log("Send request for get all users");
    return fetch(`${server_url}/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
}

export const setUserAPI = async (telegramId: number) => {
    console.log(`Send request for register user ${telegramId}`);
    return fetch(`${server_url}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            telegramId
        })
    }).then(res => res.json())
}

export const updateUserDigestReceptionTimeAPI = async (telegramId: number, digestReceptionTime: string) => {
    return fetch(`${server_url}/users/${telegramId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            digestReceptionTime
        })
    })
}


export const getUserAPI = async (telegramId: number) => {
    console.log(`Send request for check user ${telegramId}`);
    return fetch(`${server_url}/users/${telegramId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

// digests
export const getDigestsAPI = async (telegramId: number) => {
    return fetch(`${server_url}/users/${telegramId}/digests`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const createDigestAPI = async (telegramId: number, payload: {
    name: string,
    timeInterval: string,
    firstReceptionTime: string
}) => {
    return fetch(`${server_url}/users/${telegramId}/digests`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
}


// subscribtions
export const getDigestChannelsAPI = async (telegramId: number, digestId: string) => {
    return fetch(`${server_url}/users/${telegramId}/digests/${digestId}/channels`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

export const addDigestChannelsAPI = async (payload: {telegramId: number, digestId: string, name: string}) => {
    return fetch(`${server_url}/users/${payload.telegramId}/digests/${payload.digestId}/channels`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: payload.name})
    })
}

export const deleteDigestChannelsAPI = async (payload: {telegramId: number, digestId: string, channelId: string}) => {
    return fetch(`${server_url}/users/${payload.telegramId}/digests/${payload.digestId}/channels/${payload.channelId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const updateDigestAPI = async (payload: {telegramId: number, digestId: string, name: string, timeInterval: string}) => {
    return fetch(`${server_url}/users/${payload.telegramId}/digests/${payload.digestId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: payload.name,
            timeInterval: payload.timeInterval
        })
    })
}