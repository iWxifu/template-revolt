import {Permissions, Message} from "revkit"
import { Command } from "../types"

const command : Command = {
    name: "greet",
    execute: (message: Message, args) => {
        message.channel.send({
            content: "Hewwo"
        });
    },
    cooldown: 5,
    Permissions: [Permissions.SendMessage]
}

export default command;