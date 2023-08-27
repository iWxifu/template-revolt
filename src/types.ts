import { Message, Client, ClientEvents, Permissions } from "revkit";

export interface Command {
    name: string,
    execute: (message: Message, args: Array<string>, client: Client) => void,
    cooldown?: number,
    Permissions: Array<Permissions>,
}

export interface BotEvent {
    name: ClientEvents,
    //@ts-ignore
    execute: (...args?) => void,
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TOKEN: string,
            PREFIX: string,
        }
    }
}

declare module "revkit" {
    export interface Client {
        commands: Map<string, Command>,
        cooldowns: Map<string, number>,
    }
}