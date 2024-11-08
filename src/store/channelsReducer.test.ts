import {addDigestChannelAC, channelsReducer, deleteDigestChannelAC, setDigestChannelsAC} from "./channelsReducer";
import {ChannelType} from "../components/common/channel/Channel";

let channels: ChannelType[]

beforeEach(()=>{
    channels = [
        {
            id: "1",
            telegramName: "@channel1",
            title: "channel1",
            telegramId: 123456,
            createdAt: "2022-01-01",
            lastMessageId: "1",
            imageUrl: "https://avatars.githubusercontent.com/u/13384294?v=4",
        },
        {
            id: "2",
            telegramName: "@channel2",
            title: "channel2",
            telegramId: 123456,
            createdAt: "2022-01-01",
            lastMessageId: "2",
            imageUrl: "https://avatars.githubusercontent.com/u/13384294?v=4",
        },
    ]
})

describe("channelsReducer", () => {
    it("should return initial state", () => {
        expect(channelsReducer(undefined, {} as any)).toEqual({})
    })

    it("should set digest channels", () => {
        const digestId = "digestId"

        expect(channelsReducer(undefined, setDigestChannelsAC({digestId, channels}))[digestId]).toEqual(channels)
    })

    it("should add digest scrollableItem", () => {
        const digestId = "digestId"
        const channel: ChannelType = {
                id: "3",
                telegramName: "@channel3",
                title: "channel3",
                telegramId: 123456,
                createdAt: "2022-01-01",
                lastMessageId: "3",
                imageUrl: "https://avatars.githubusercontent.com/u/13384294?v=4",
            }

        expect(channelsReducer({[digestId]: []}, addDigestChannelAC({digestId, channel}))[digestId]).toEqual([channel])
    })

    it("should delete digest scrollableItem", () => {
        const digestId = "digestId"

        expect(channelsReducer({[digestId]: channels}, deleteDigestChannelAC({digestId, channel: channels[0]}))[digestId]).toEqual([channels[1]])
    })
})