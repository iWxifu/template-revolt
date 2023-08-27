import { Client} from "revkit";
import { readdirSync } from "fs";
import { join} from "path"
import { Command } from "../types";
import { logger } from "../utils";

module.exports = (client : Client) => {
    const comms: Command[] = [];

    let commandsDir = join(__dirname,"../commands");

    // -- Load Text Commands <3
    readdirSync(commandsDir).forEach(file => {
        if(!file.endsWith("js")) return;
        let command: Command = require(`${commandsDir}/${file}`).default
        comms.push(command);
        client.commands.set(command.name, command)
    });

    logger.info(`Successfully loaded ${comms.length} command(s) <3`)
}