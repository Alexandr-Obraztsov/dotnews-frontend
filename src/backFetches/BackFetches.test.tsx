import {
    checkUser,
    getAllTopics,
    getUserTopics,
    registerUser,
    sendMetrics,
    subscribeToTopics,
    unsubscribeFromTopics
} from "./BackFetches";

const userId = 123456

test("check register", async () => {
    const res = await registerUser(userId)

    console.log(res.status === 200)
})

test("check checkUser", async () => {
    const res = await checkUser(userId)

    console.log(res)
})

test("check getAllTopics", async () => {
    const res = await getAllTopics()

    console.log(res)
})

test("check getUserTopics", async () => {
    const res = await getUserTopics(userId)

    console.log(res)
})

test("check sendMetrics", async () => {
    const userEntered = await sendMetrics(userId, "NewUserEnteredBot")
    const interestsSetup = await sendMetrics(userId, "InterestsSetupFinished")

    console.log(userEntered)
    console.log(interestsSetup)
})

test("check unsubscribeFromTopics", async () => {

    const topics = await getAllTopics()

    const res = await unsubscribeFromTopics(userId, [topics[0]])

    console.log(res)
})

test("check subscribeFromTopics", async () => {

    const topics = await getAllTopics()

    const res = await subscribeToTopics(userId, [topics[0]])

    console.log(res)
})