const server_url = "http://62.169.28.6:8080"

export const registerUser = async (userId: number) => {
    console.log(`Send request for register user ${userId}`);
    return fetch(`${server_url}/api/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            telegramId: userId
        })
    })
}

export const checkUser = async (userId: number) => {
    console.log(`Send request for check user ${userId}`);
    return fetch(`${server_url}/api/users/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
}

export const subscribeToTopics = async (userId: number, topicIds: string[]) => {
    console.log("Send request for subscribe to topics");
    return fetch(`${server_url}/api/subscribtions/subscribe`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userTelegramId: userId,
            topicIds: topicIds
        })
    })
}

export const unsubscribeFromTopics = async (userId: number, topicIds: string[]) => {
    console.log("Send request for unsubscribe from topics");
    return fetch(`${server_url}/api/subscribtions/unsubscribe`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userTelegramId: userId,
            topicIds: topicIds
        })
    })
}

export const getUserTopics = async (userId: number) => {
    console.log("Send request for get user topics");
    return fetch(`${server_url}/api/topics?userId=${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
}

export const getAllTopics = async () => {
    console.log("Send request for get all topics");
    return fetch(`${server_url}/api/topics`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
}

type MetricsActionType = "NewUserEnteredBot" | "InterestsSetupFinished";

export const sendMetrics = async (userId: number, action: MetricsActionType) => {
    console.log("Send request for send metrics");
    return fetch(`${server_url}/metrics/signal`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            action,
            userTelegramId: userId
        })
    })
}