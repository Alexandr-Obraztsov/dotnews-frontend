import {
    addChannelAPI, createDigestAPI,
    getAllUsersAPI, getChannelAPI, getDigestsAPI, getUserAPI,
    setUserAPI,
} from "./api";

const telegramId = 123
const uuid = "123"

test("check getAllUsers", async () => {
    const res = await getAllUsersAPI()
    console.log(res)
})

test("check register", async () => {
    const res = await setUserAPI(telegramId)

    console.log(res)
})


test("add channel", async () => {
    await getChannelAPI("react_tg")
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(async (er) => {
            console.log(er)
            addChannelAPI("react_tg")
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(() => {
                    console.log("Error add channel")
                })
            }
        )
})

test("check getUser", async () => {
    await getUserAPI(telegramId)
        .then(res => res.json())
        .then(res => console.log(res))
})


test("create digest", async () => {
    await createDigestAPI(telegramId, {name: "react_tgs", firstReceptionTime: "2024-11-04T20:00:00.000Z", timeInterval: "2.00:00:01"})
        .then(res => console.log(res))
})

test("get digests", async () => {
    await getDigestsAPI(telegramId)
        .then(res => res.json())
        .then(data => console.log(data))
})