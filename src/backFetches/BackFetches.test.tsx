import {
    checkUser,
    getAllTopics,
    registerUser,
    subscribeToTopics,
    unsubscribeFromTopics
} from "./BackFetches";

const telegramId = 123
const uuid = "123"

test("check register", async () => {
    const res = await registerUser(telegramId)

    console.log(res)
})

test("check checkUser", async () => {
    const res = await checkUser(telegramId)
    console.log(res)
})

test("check getAllTopics", async () => {
    const res = await getAllTopics()

    console.log(res)
})


test("check unsubscribeFromTopics", async () => {

    const topics = await getAllTopics()

    const res = await unsubscribeFromTopics(uuid, [topics[0]])

    console.log(res)
})

test("check subscribeFromTopics", async () => {

    const topics = await getAllTopics()

    const res = await subscribeToTopics(uuid, [topics[0]])

    console.log(res)
})