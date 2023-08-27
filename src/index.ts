import { config } from "dotenv";
config();

import { Client} from "revkit";
import { Command } from "./types";
import { readdirSync } from "fs"
import { join } from "path"

const bot = new Client();

bot.commands = new Map<string, Command>();
bot.cooldowns = new Map<string, number>();

const handlersDir = join(__dirname, "./handlers")
readdirSync(handlersDir).forEach(handler => {
    require(`${handlersDir}/${handler}`)(bot)
})

bot.login(process.env.TOKEN, "bot");