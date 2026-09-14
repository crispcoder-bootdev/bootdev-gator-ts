import {getUser} from "../lib/db/queries/users.js";
import {getAllFeedsAndUserName} from "../lib/db/queries/feeds.js";
import {readConfig} from "../config.js";

export async function commandFeeds(
    cmdName: string,
    ...args: string[]
): Promise<void> {
    let config = readConfig();
    let user = config.currentUserName;
    if (!user) {
        throw new Error(`User: ${user} is empty or missing.`);
    }

    let dbUser = await getUser(user);
    if (!dbUser) {
        throw new Error(`User ${user} doesn't exist.`);
    }

    let dbFeeds = await getAllFeedsAndUserName();
    for (const f of dbFeeds) {
        console.log(`${f.name}, ${f.url}, ${f.username}`);
    }

    return Promise.resolve();
}
