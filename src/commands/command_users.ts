import {getAllUsers} from "../lib/db/queries/users";
import {readConfig} from "../config";

export async function commandUsers(
    cmdName: string,
    ...arg: string[]
): Promise<void> {
    const users = await getAllUsers();
    let config = readConfig();

    for (const user of users) {
        if (user.name === config.currentUserName) {
            console.log(`* ${user.name} (current)`);
        } else {
            console.log(`* ${user.name}`);
        }
    }

    return Promise.resolve();
}
