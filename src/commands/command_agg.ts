import {fetchFeed} from "../fetchfeed.js";

export async function commandAgg(
    cmdName: string,
    ...args: string[]
): Promise<void> {
    //if (args.length < 1) {
    //    throw new Error("Missing url argument");
    //}

    //let feedURL = args[0];
    let feedURL = "https://www.wagslane.dev/index.xml";
    let feed = await fetchFeed(feedURL);

    for (const entry of Object.entries(feed)) {
        console.log(`RSSFeed[${entry[0]}]=${entry[1]}`);
    }

    Promise.resolve();
}
