import {createFeed} from "../lib/db/queries/feeds.js";
import {getUser} from "../lib/db/queries/users.js";
import {readConfig} from "../config.js";
import {Feed, User} from "../lib/db/schema.js";

export async function commandAddFeed(
    cmdName: string,
    ...args: string[]
): Promise<void> {
    if (args.length === 0) {
        throw new Error("No arguments provided to addFeed command.");
    }

    let config = readConfig();
    let user = config.currentUserName;
    if (!user) {
        throw new Error(`User: ${user} is empty or missing.`);
    }

    let name = args[0];
    if (!name) {
        throw new Error("Name argument not provided.");
    }

    let url = args[1];
    if (!url) {
        throw new Error("Url argument not provided.");
    }

    let dbUser = await getUser(user);
    if (!dbUser) {
        throw new Error(`User ${user} doesn't exist.`);
    }

    let dbFeed = await createFeed(name, url, dbUser.id);
    printFeed(dbFeed, dbUser);

    return Promise.resolve();
}

function printFeed(feed: Feed, user: User) {
    console.log(user);
    console.log(feed);
}
