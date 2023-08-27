import { Client } from "revkit";
import { readdirSync } from "fs";
import { join } from "path";
import { BotEvent } from "../types";

module.exports = (client: Client) => {
    let eventsDir = join(__dirname, "../events");

    readdirSync(eventsDir).forEach(file => {
        if(!file.endsWith(".js")) return;

        let event: BotEvent = require(`${eventsDir}/${file}`).default

        //@ts-ignore
        client.on(event.name, (...args) => event.execute(...args, client));
    })
}