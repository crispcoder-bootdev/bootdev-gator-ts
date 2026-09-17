import {db} from "..";
import {feeds} from "../schema";
import {users} from "../schema.js";
import {eq} from "drizzle-orm";
import {Feed} from "../schema.js";

export async function createFeed(name: string, url: string, userId: string) {
    const [result] = await db
        .insert(feeds)
        .values({name: name, url: url, userId: userId})
        .returning();
    return result;
}

export async function getFeeds(userId: string) {
    const result = await db
        .select()
        .from(feeds)
        .where(eq(feeds.userId, userId));
    return result;
}

export async function deleteAllFeeds() {
    const [result] = await db.delete(feeds);
    return result;
}

export async function getAllFeeds() {
    const result = await db.select().from(feeds).orderBy(feeds.name);
    return result;
}

export async function getFeedByURL(url: string): Promise<Feed> {
    const [result] = await db.select().from(feeds).where(eq(feeds.url, url));
    return result;
}

export async function getAllFeedsAndUserName() {
    const result = await db
        .select({
            name: feeds.name,
            url: feeds.url,
            username: users.name,
        })
        .from(feeds)
        .innerJoin(users, eq(users.id, feeds.userId))
        .orderBy(feeds.name);
    return result;
}
