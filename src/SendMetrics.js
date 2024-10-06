import {configs} from "./configs";

export const sendMetrics = (action) => {
    fetch(`${configs.url}/metrics/signal`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            action,
            userTelegramId: window.Telegram.WebApp.initDataUnsafe.user.id
        })
    })
}