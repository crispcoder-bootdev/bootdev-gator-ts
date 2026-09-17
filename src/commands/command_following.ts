import {getFeedFollowsForUser} from "../lib/db/queries/feed_follows.js";
import {getUser} from "../lib/db/queries/users.js";
import {readConfig} from "../config.js";
import {User} from "../lib/db/schema.js";

type FeedFollowWithNames = Awaited<ReturnType<typeof getFeedFollowsForUser>>;

export async function commandFollowing(
    cmdName: string,
    ...args: string[]
): Promise<void> {
    let config = readConfig();
    let user = config.currentUserName;
    if (!user) {
        throw new Error(`User: ${user} is empty or missing.`);
    }

    let dbUser = (await getUser(user)) as User;
    if (!dbUser) {
        throw new Error(`User ${user} doesn't exist.`);
    }

    let dbFeedFollows = (await getFeedFollowsForUser(
        dbUser.id
    )) as FeedFollowWithNames;

    printFeedFollows(dbFeedFollows);

    return Promise.resolve();
}

function printFeedFollows(follows: FeedFollowWithNames) {
    for (const f of follows) {
        console.log(f.feedName);
    }
}
