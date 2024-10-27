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
            telegramId,
            digestReceptionTime: "09:00:00"
        })
    }).then(res => res.json())
}

export const getUserAPI = async (telegramId: number) => {
    console.log(`Send request for check user ${telegramId}`);
    return fetch(`${server_url}/users/${telegramId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
}


// subscribtions
export const getUserSubscribtionsAPI = async (userId: string) => {
    console.log(`Send request for subscribe to channels by ${userId}`);
    return fetch(`${server_url}/subscribtions?userId=${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(res => res.json())
}

export const subscribeToChannelAPI = async (userId: string, channelId: string) => {
    console.log("Send request for subscribe to channels");
    return fetch(`${server_url}/subscribtions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, channelId })
    })
}

export const unsubscribeFromChannelAPI = async (userId: string, channelId: string) => {
    console.log("Send request for subscribe to channels");
    return fetch(`${server_url}/subscribtions`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, channelId })
    })
}