import {Config, setUser, readConfig} from "./config.js";
import {CommandRegistry, registerCommand, runCommand} from "./commands.js";

import {commandLogin} from "./command_login.js";

function main() {
    let cfg: Config | undefined = readConfig();
    if (cfg === undefined) {
        console.log("~/.gatorconfig.json is missing or corrupt");
        process.exit(1);
    }

    let commands: CommandRegistry = {
        login: commandLogin,
    };

    const argv = process.argv;
    if (argv.length < 4) {
        console.log("Too few arguments.");
        process.exit(1);
    }

    console.log(argv);

    // Skip first two args since it is node binary and index.js
    const temp = argv.slice(2, 4);
    const cmdName = temp[0];
    const args = temp.slice(1);

    console.log(cmdName);
    console.log(args);
    if (!cmdName || !args) {
        console.log("Bad Args");
        process.exit(1);
    }

    runCommand(commands, cmdName, ...args);
}

main();
