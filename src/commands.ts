import {CommandHandler} from "./command_handler.js";

export type CommandRegistry = {
    [key: string]: CommandHandler;
};

export function registerCommand(
    registry: CommandRegistry,
    cmdName: string,
    handler: CommandHandler
) {
    registry[cmdName] = handler;
}

export function runCommand(
    registry: CommandRegistry,
    cmdName: string,
    ...args: string[]
) {
    if (cmdName in registry) {
        registry[cmdName](cmdName, ...args);
    } else {
        console.log(`${cmdName} not found`);
    }
}
