import {deleteAllUsers} from "../lib/db/queries/users.js";

export async function commandReset(
    cmdName: string,
    ...args: string[]
): Promise<void> {
    await deleteAllUsers();
    console.log("Deleted all users from database.");
    return Promise.resolve();
}
