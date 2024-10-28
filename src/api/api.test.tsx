import {
    addChannelAPI,
    getAllUsersAPI, getChannelAPI, getUserAPI,
    setUserAPI,
} from "./api";

const telegramId = 123
const uuid = "123"

test("check getAllUsers", async () => {
    const res = await getAllUsersAPI()
    console.log(res)
})

test("check register", async () => {
    const res = await setUserAPI(telegramId, "09:00:00")

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

test("check checkUser", async () => {
    const res = await getUserAPI(telegramId)
    console.log(res)
})
