import {db} from "..";
import {feeds} from "../schema";
import {users} from "../schema.js";
import {feedFollows} from "../schema.js";
import {eq} from "drizzle-orm";

export async function createFeedFollow(userId: string, feedId: string) {
    const [feedFollow] = await db
        .insert(feedFollows)
        .values({userId: userId, feedId: feedId})
        .returning();

    const [result] = await db
        .select({
            id: feedFollows.id,
            createdAt: feedFollows.createdAt,
            updatedAt: feedFollows.updatedAt,
            userId: feedFollows.userId,
            feedId: feedFollows.feedId,
            userName: users.name,
            feedName: feeds.name,
        })
        .from(feedFollows)
        .innerJoin(feeds, eq(feeds.id, feedFollows.feedId))
        .innerJoin(users, eq(users.id, feedFollows.userId))
        .where(eq(feedFollows.id, feedFollow.id))
        .orderBy(users.name);
    return result;
}

export async function getFeedFollowsForUser(userId: string) {
    const result = await db
        .select({
            id: feedFollows.id,
            createdAt: feedFollows.createdAt,
            updatedAt: feedFollows.updatedAt,
            userId: feedFollows.userId,
            feedId: feedFollows.feedId,
            userName: users.name,
            feedName: feeds.name,
        })
        .from(feedFollows)
        .innerJoin(users, eq(users.id, feedFollows.userId))
        .innerJoin(feeds, eq(feeds.id, feedFollows.feedId))
        .where(eq(users.id, userId));

    return result;
}

export async function deleteAllFeedFollows() {
    const [result] = await db.delete(feedFollows);
    return result;
}
