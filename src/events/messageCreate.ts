import { BotEvent } from "../types";
import { Message, Client, ChannelType } from "revkit"
import { checkPerms } from "../utils";


const event: BotEvent = {
    name: "message",
    execute: async (message: Message, client: Client) => {
        if(!message.content || message.isSystem() === true || !message.server || !message.channel || message.author.bot) return;

        let prefix = process.env.PREFIX;

        if(!message.content.startsWith(prefix)) return;
        if(message.channel.type !== ChannelType.Text) return;

        let args = message.content.substring(prefix.length).split(" ");
        let command = message.client.commands.get(args[0]);

        if(!command) return;

        let cooldown = message.client.cooldowns.get(`msg-${command.name}-${message.member.user.username}`);
        let neededPerms = checkPerms(message.member, command.Permissions);
        if(neededPerms !== null) return message.channel.send({
            content: "You don't have the required perms :("
        });

        if(command.cooldown && cooldown) {
            if(Date.now() < cooldown) {
                return message.channel.send({
                    content: `You have to wait ${Math.floor(Math.abs(Date.now() - cooldown) / 1000)} second(s) to use this command again`
                });
            }

            message.client.cooldowns.set(`msg-${command.name}-${message.member.user.username}`, Date.now() + command.cooldown * 1000)
            setTimeout(() => {
                if(!command || !command.name) console.log("no command? cant delete cooldown :(");
                message.client.cooldowns.delete(`msg-${command?.name}-${message.member.user.username}`)
            }, command.cooldown * 1000)
        } else if (command.cooldown && !cooldown) {
            message.client.cooldowns.set(`msg-${command.name}-${message.member.user.username}`, Date.now() + command.cooldown * 1000)
        }

        command.execute(message, args, client);
    }
}

export default event;