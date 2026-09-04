import {setUser, readConfig} from "./config.js";

export function commandLogin(cmdName: string, ...args: string[]): void {
    if (args.length === 0) {
        throw new Error("No arguments provided to login command.");
    }

    let user = args[0];
    if (!user) {
        throw new Error("User is empty or missing.");
    }

    setUser(user);

    console.log(`${user} has logged in.`);
}
