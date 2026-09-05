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

export async function runCommand(
    registry: CommandRegistry,
    cmdName: string,
    ...args: string[]
): Promise<void> {
    console.log(`Attempting to run ${cmdName} with args ${args}`);
    if (cmdName in registry) {
        await registry[cmdName](cmdName, ...args);
    } else {
        console.log(`${cmdName} not found`);
    }

    return Promise.resolve();
}
