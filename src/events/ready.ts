import { BotEvent } from "../types";
import { Client } from "revkit";

const event: BotEvent = {
    name: "ready",
    execute: (client: Client) => {
        console.log(`Logged in as ${client.user.username}`);
    }
}

export default event;