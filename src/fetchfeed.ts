import {XMLParser} from "fast-xml-parser";

export type RSSFeed = {
    channel: {
        title: string;
        link: string;
        description: string;
        item: RSSItem[];
    };
};

export type RSSItem = {
    title: string;
    link: string;
    description: string;
    pubDate: string;
};

export async function fetchFeed(feedURL: string): Promise<RSSFeed> {
    if (!isValidURL(feedURL)) {
        throw new Error(`Invalid feedURL: ${feedURL}`);
    }

    let res = await fetch(feedURL, {
        method: "GET",
        headers: {
            "Content-Type": "text",
            "User-Agent": "gator",
        },
    });

    let parser = new XMLParser({processEntities: false});
    let feedJson: unknown = parser.parse(await res.text());
    console.log(feedJson);

    if (typeof feedJson !== "object" || feedJson === null) {
        throw new Error("Bad XML response");
    }

    if (!("rss" in feedJson)) {
        throw new Error("rss missing from response");
    }

    let rss = feedJson.rss;

    if (typeof rss !== "object" || rss === null) {
        throw new Error("rss is malformed in response");
    }

    if (!("channel" in rss)) {
        throw new Error("channel missing from response");
    }

    let channel = rss.channel;
    console.log(channel);

    if (typeof channel !== "object" || channel === null) {
        throw new Error("channel malformed in response");
    }

    if (!("title" in channel)) {
        throw new Error("title is missing from channel");
    }

    if (!("link" in channel)) {
        throw new Error("link is missing from channel");
    }

    if (!("description" in channel)) {
        throw new Error("description is missing from channel");
    }

    let items: RSSItem[] = [];
    if ("item" in channel) {
        if (typeof channel.item === "object" && channel.item != null) {
            let item = channel.item;
            if (Array.isArray(item)) {
                for (const x of item) {
                    if (isValidRSSItem(x)) {
                        items.push(x as RSSItem);
                    }
                }
            } else if (isValidRSSItem(item)) {
                items.push(item as RSSItem);
            }
        }
    }

    return {
        channel: {
            title: channel.title,
            link: channel.link,
            description: channel.description,
            item: items, // Yes, the field is named item and is an array of items
        },
    } as RSSFeed;
}

function isValidRSSItem(item: any) {
    return (
        typeof item === "object" &&
        item !== null &&
        "title" in item &&
        typeof item.title === "string" &&
        item.title != null &&
        "link" in item &&
        typeof item.link === "string" &&
        item.link != null &&
        "description" in item &&
        typeof item.description === "string" &&
        item.description != null &&
        "pubDate" in item &&
        typeof item.pubDate === "string" &&
        item.pubDate != null
    );
}

function isValidURL(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}
