import {createFeedFollow} from "../lib/db/queries/feed_follows.js";
import {getFeedByURL} from "../lib/db/queries/feeds.js";
import {getUser} from "../lib/db/queries/users.js";
import {readConfig} from "../config.js";
import {Feed, User} from "../lib/db/schema.js";

export async function commandFollow(
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

    let url = args[0];
    if (!url) {
        throw new Error("Url argument not provided.");
    }

    let dbUser = (await getUser(user)) as User;
    if (!dbUser) {
        throw new Error(`User ${user} doesn't exist.`);
    }

    let dbFeed = (await getFeedByURL(url)) as Feed;
    if (!dbFeed) {
        throw new Error(`Feed for ${url} doesn't exist.`);
    }

    let feedFollow = await createFeedFollow(dbUser.id, dbFeed.id);
    if (!feedFollow) {
        throw new Error("Follow failed");
    }

    printFeed(dbFeed, dbUser);

    return Promise.resolve();
}

function printFeed(feed: Feed, user: User) {
    console.log(user);
    console.log(feed);
}
