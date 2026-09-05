import {Config, readConfig} from "./config.js";
import {CommandRegistry, runCommand} from "./commands/commands.js";
import {commandRegister} from "./commands/command_register.js";
import {commandLogin} from "./commands/command_login.js";

async function main() {
    let cfg: Config | undefined = readConfig();
    if (cfg === undefined) {
        console.log("~/.gatorconfig.json is missing or corrupt");
        process.exit(1);
    }

    let commands: CommandRegistry = {
        login: commandLogin,
        register: commandRegister,
    };

    const argv = process.argv;
    if (argv.length < 4) {
        console.log("Too few arguments.");
        process.exit(1);
    }

    // Argv has node binary and index.ts as first two arguments.
    const args = argv.slice(2, 4);
    const cmdName = args[0];
    const cmdArgs = args.slice(1);

    if (!cmdName || !cmdArgs) {
        console.log("Bad Args");
        process.exit(1);
    }

    try {
        await runCommand(commands, cmdName, ...cmdArgs);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }

    process.exit(0);
}

main();
