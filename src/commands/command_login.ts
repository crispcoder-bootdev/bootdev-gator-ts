import {setUser} from "../config.js";
import {getUser} from "../lib/db/queries/users.js";

export async function commandLogin(
    cmdName: string,
    ...args: string[]
): Promise<void> {
    if (args.length === 0) {
        throw new Error("No arguments provided to login command.");
    }

    let user = args[0];
    if (!user) {
        throw new Error("User is empty or missing.");
    }

    let dbUser = await getUser(user);
    if (!dbUser) {
        throw new Error(`User: ${user} does not exist.`);
    }

    setUser(user);
    console.log(`${user} has logged in.`);
    return Promise.resolve();
}
