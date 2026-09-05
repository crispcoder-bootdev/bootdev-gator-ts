import {createUser, getUser} from "../lib/db/queries/users.js";
import {setUser} from "../config.js";

export async function commandRegister(
    cmdName: string,
    ...args: string[]
): Promise<void> {
    if (args.length === 0) {
        throw new Error("No arguments provided to register command.");
    }

    let user = args[0];
    if (!user) {
        throw new Error("User is empty or missing.");
    }

    let dbUser = await getUser(user);
    if (dbUser) {
        throw new Error(`User: ${user} already exists.`);
    }

    dbUser = await createUser(user);
    setUser(dbUser.name);
    console.log(dbUser);

    return Promise.resolve();
}
