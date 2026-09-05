import { CommandHandler } from "./command_handler.js";
import { commandLogin } from "./command_login.js";
import { commandRegister } from "./command_register.js";
import { commandReset } from "./command_reset.js";
import { commandUsers } from "./command_users.js";
import { commandAgg } from "./command_agg.js";

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

export function getCommands(): CommandRegistry {
    return {
        login: commandLogin,
        register: commandRegister,
        reset: commandReset,
        users: commandUsers,
        agg: commandAgg,
    };
}
